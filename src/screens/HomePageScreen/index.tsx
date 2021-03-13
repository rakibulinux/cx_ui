import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMarketsFetch, useMarketsTickersFetch, useRangerConnectFetch } from '../../hooks';
import { selectCurrencies, selectMarkets, selectMarketTickers } from '../../modules';
import CoinBubblesSvg from './assets/Coin_Bubbles.svg';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

import axios from 'axios';

const Title = styled.h1`
    color: #fff;
    font-size: 64px;
    font-weight: bold;
    text-align: center;
`;

const SubTitle = styled.h3`
    color: #989AA2;
    font-size: 20px;
    text-align: center;
`;

const Button = styled.button`
    color: #fff;
    font-size: 20px;
    background-color: #259DA8;
    border: none;
    border-radius: 1rem;
    padding: 10px 20px;
    margin-top: 48px;
    outline: none;
`;

const Section = styled.div`
    padding: 100px 0;
`;

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const BASE_MARKET_URL = "https://www.lukutex.com/api/v2/peatio/public/markets";

export const HomePageScreen = () => {

    const [BTCKlineState, setBTCKlineState] = React.useState<{ pv: string }>();
    const [ETHKlineState, setETHKlineState] = React.useState<{ pv: string }>();

    useMarketsFetch();
    useMarketsTickersFetch();
    useRangerConnectFetch();

    // selector
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const currencies = useSelector(selectCurrencies);

    const fetchMarketsKlines = async (marketId: string, from: number, to: number) => {
        try {
            const klines = await axios.get(`${BASE_MARKET_URL}/${marketId}/k-line?period=30&time_from=${from}&time_to=${to}`);
            return klines.data.map((kline, index) => { return { pv: kline[3] } });
        } catch (error) {
            return [];
        }
    }

    React.useEffect(() => {
        const from = Math.floor(Date.now() / 1000) - 30 * 60 * 1000;
        const to = Math.floor(Date.now() / 1000);
        const drawMarketLines = async () => {
            const btc = await fetchMarketsKlines('btcusdt', from, to);
            const eth = await fetchMarketsKlines('ethusdt', from, to);
            setBTCKlineState(btc);
            setETHKlineState(eth);
        }
        drawMarketLines();
        return () => {
        }
    }, []);

    const renderTitle = () => (
        <Section>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Title>Put your money to work</Title>
                        <SubTitle>Buy and sell cryptocurrencies commission-free on the world’s most secure investment platform.</SubTitle>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center">
                        <Button>Get Started</Button>
                    </div>
                </div>
            </div>
        </Section>
    );

    const renderInverstIn = () => {
        return (
            <Section>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row" style={{ marginTop: '80px' }}>
                                <div className="col-12">
                                    <Title>Invest in the hottest coins</Title>
                                    <SubTitle>
                                        We have all of the most popular cryptos <br /> available to buy so you never have to suffer from <br /> investment FOMO ever again.
                                    </SubTitle>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid" src={CoinBubblesSvg} alt="coin_bubble_svg" />
                        </div>
                    </div>
                </div>
            </Section>

        );
    }

    const findIcon = (code: string): string => {
        const currency = currencies.find((currency: any) => currency.id === code);
        try {
            return require(`../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
        } catch (err) {
            if (currency) return currency.icon_url;
            return require('../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };


    const renderMarket = () => {
        const MarketChart = (data: any, marketID: string) => {
            console.log(markets);

            const market = markets.find(market => market.id.toLowerCase() === marketID.toLowerCase());

            if (market) {
                const baseCurrency = market.name.split('/')[0];
                const quoteCurrency = market.name.split('/')[1];
                const last = Number((marketTickers[market.id] || defaultTicker).last);
                const open = Number((marketTickers[market.id] || defaultTicker).open);
                const price_change_percent = (marketTickers[market.id] || defaultTicker).price_change_percent;
                const change = (+last - +open);
                // color
                const marketChangeColor = +(change || 0) < 0 ? "#e63946" : "#2ec4b6";
                return (
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <img width="30px" height="30px" src={findIcon(baseCurrency)} alt="" /> <span style={{ fontSize: '1.2rem' }} className="text-white">{baseCurrency.toUpperCase()}</span> / <span style={{ fontSize: '1rem' }} className="text-secondary">{quoteCurrency.toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <span style={{ marginLeft: '5px', fontSize: '2rem', color: '#fff', fontWeight: 'bold' }}>${last.toFixed(4)}</span>
                            </div>
                            <div className="col-6 d-flex justify-content-end align-items-center">
                                <span style={{ marginRight: '5px', color: marketChangeColor, fontWeight: 'bold' }}>{price_change_percent}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12" >
                                <ResponsiveContainer width='100%' aspect={4.0 / 1.0}>
                                    <AreaChart data={data}>
                                        <Area type="monotone" dataKey="pv" stroke="#8884d8" fill="#8884d8" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );
            }
            return '';
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        {MarketChart(BTCKlineState, 'btcusd')}
                    </div>

                    <div className="col-3">
                        {MarketChart(ETHKlineState, 'ethbtc')}
                    </div>
                    <div className="col-3">
                        {MarketChart(BTCKlineState, 'btcusd')}
                    </div>

                    <div className="col-3">
                        {MarketChart(ETHKlineState, 'ethbtc')}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-3">
                        {MarketChart(BTCKlineState, 'btcusd')}
                    </div>

                    <div className="col-3">
                        {MarketChart(ETHKlineState, 'ethbtc')}
                    </div>
                    <div className="col-3">
                        {MarketChart(BTCKlineState, 'btcusd')}
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <button className="btn" style={{ color: '#fff', backgroundColor: '#259DA8', padding: '0.5rem 1rem' }}>View All</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>

            {renderTitle()}
            {renderMarket()}
            {renderInverstIn()}

        </div>
    )
}
