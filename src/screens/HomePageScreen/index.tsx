import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMarketsFetch, useMarketsTickersFetch, useRangerConnectFetch } from '../../hooks';
import { selectCurrencies, selectMarkets, selectMarketTickers } from '../../modules';
// import CoinBubblesSvg from './assets/Coin_Bubbles.svg';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

import SupportPNG from './assets/support.png';
import BlogPNG from './assets/blog.png';
import CommunityPNG from './assets/community.png';
import CareersPNG from './assets/careers.png';

import AppStore from './assets/app_store_download.png';
import GooglePlay from './assets/google_play_download.png';
import AndroidAPK from './assets/android_apk_download.png';
import Scan from './assets/scan_download.png';

import Exchange from './assets/exchange.png';

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

    const market_ids = [
        'btcusd', 'ethbtc', 'btcusd', 'ethbtc', 'btcusd', 'ethbtc', 'btcusd'
    ]

    const [KlineState1, setKline1State] = React.useState<{ pv: string }>();
    const [KlineState2, setKline2State] = React.useState<{ pv: string }>();
    const [KlineState3, setKline3State] = React.useState<{ pv: string }>();
    const [KlineState4, setKline4State] = React.useState<{ pv: string }>();
    const [KlineState5, setKline5State] = React.useState<{ pv: string }>();
    const [KlineState6, setKline6State] = React.useState<{ pv: string }>();
    const [KlineState7, setKline7State] = React.useState<{ pv: string }>();

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
            try {
                const klines1 = await fetchMarketsKlines(market_ids[0], from, to);
                const klines2 = await fetchMarketsKlines(market_ids[1], from, to);
                const klines3 = await fetchMarketsKlines(market_ids[2], from, to);
                const klines4 = await fetchMarketsKlines(market_ids[3], from, to);
                const klines5 = await fetchMarketsKlines(market_ids[4], from, to);
                const klines6 = await fetchMarketsKlines(market_ids[5], from, to);
                const klines7 = await fetchMarketsKlines(market_ids[6], from, to);
                setKline1State(klines1);
                setKline2State(klines2);
                setKline3State(klines3);
                setKline4State(klines4);
                setKline5State(klines5);
                setKline6State(klines6);
                setKline7State(klines7);
            } catch (error) {
                console.log(JSON.stringify(error));

            }
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
                        <Title>CircleEx Exchange</Title>
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

    // const renderInverstIn = () => {
    //     return (
    //         <Section>
    //             <div className="container">
    //                 <div className="row">
    //                     <div className="col-6">
    //                         <div className="row" style={{ marginTop: '80px' }}>
    //                             <div className="col-12">
    //                                 <Title>Invest in the hottest coins</Title>
    //                                 <SubTitle>
    //                                     We have all of the most popular cryptos <br /> available to buy so you never have to suffer from <br /> investment FOMO ever again.
    //                                 </SubTitle>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="col-6">
    //                         <img className="img-fluid" src={CoinBubblesSvg} alt="coin_bubble_svg" />
    //                     </div>
    //                 </div>
    //             </div>
    //         </Section>

    //     );
    // }

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
                        {MarketChart(KlineState1, market_ids[0])}
                    </div>

                    <div className="col-3">
                        {MarketChart(KlineState2, market_ids[1])}
                    </div>
                    <div className="col-3">
                        {MarketChart(KlineState3, market_ids[2])}
                    </div>

                    <div className="col-3">
                        {MarketChart(KlineState4, market_ids[3])}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-3">
                        {MarketChart(KlineState5, market_ids[4])}
                    </div>

                    <div className="col-3">
                        {MarketChart(KlineState6, market_ids[5])}
                    </div>
                    <div className="col-3">
                        {MarketChart(KlineState7, market_ids[6])}
                    </div>
                    <div className="col-3 d-flex justify-content-center align-items-center">
                        <button className="btn" style={{ color: '#fff', backgroundColor: '#259DA8', padding: '0.5rem 1rem' }}>View All</button>
                    </div>
                </div>
            </div>
        );
    }

    const renderSupport = () => (
        <div className="container text-white" style={{ padding: '100px 0' }}>
            <div className="row">
                <div className="col-3 text-center">
                    <img className="img-fluid w-50" src={SupportPNG} alt="support" />
                    <h3 className="mt-3">24/7 Support</h3>
                    <span>Got a problem? Just get in touch. Our support team is available 24/7.</span>
                </div>
                <div className="col-3 text-center">
                    <img className="img-fluid w-50" src={BlogPNG} alt="support" />
                    <h3 className="mt-3">Circle Blog</h3>
                    <span>News and updates from the world’s leading cryptocurrency exchange.</span>
                </div>
                <div className="col-3 text-center">
                    <img className="img-fluid w-50" src={CommunityPNG} alt="support" />
                    <h3 className="mt-3">Community</h3>
                    <span>Circle Exchange is global. Join the discussion in our worldwide communities.</span>
                </div>
                <div className="col-3 text-center">
                    <img className="img-fluid w-50" src={CareersPNG} alt="support" />
                    <h3 className="mt-3">Careers</h3>
                    <span>Help build the future of technology. Start your new career at Circle Exchange.</span>
                </div>
            </div>
        </div>
    );

    const renderPoster = () => {
        return (
            <div style={{ padding: '150px 0', backgroundColor: '#292D3F' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <h1>Trade anytime and anywhere</h1>
                                    <h4 className="mt-5">
                                        Download CircleEx APP, you will be able to easily at any time, anywhere trading global mainstream, popular digital assets.
                                    </h4>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-6">
                                    <img className="img-fluid" src={AppStore} alt="apple+store" />
                                </div>
                                <div className="col-6">
                                    <img className="img-fluid" src={GooglePlay} alt="google+play" />
                                </div>
                                <div className="col-6 mt-3">
                                    <img className="img-fluid" src={AndroidAPK} alt="android+apk" />
                                </div>
                                <div className="col-6 mt-3">
                                    <img width="255px" src={Scan} alt="scan+qrcode" />
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <img className="img-fluid" src={Exchange} alt="exchange" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {renderTitle()}
            {renderMarket()}
            {/* {renderInverstIn()} */}
            {renderSupport()}
            {renderPoster()}
        </div>
    )
}
