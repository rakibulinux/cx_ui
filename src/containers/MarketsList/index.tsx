import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Decimal, MarketTable } from '../../components';
import styled from 'styled-components';

import {
    useMarketsFetch,
    useMarketsTickersFetch,
    useRangerConnectFetch,
} from '../../hooks';
import {
    Market,
    selectMarkets,
    selectMarketTickers,
    setCurrentMarket,
} from '../../modules';

import StarSVG from './star.svg';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const TradeButtonStyles = styled.button`
    width: 62px;
    height: 32px;
    background: #313445;
    border: 0.5px solid #848E9C;
    box-sizing: border-box;
    border-radius: 4px;
    color: #2FB67E;
    outline: none;
`;

const MarketsTableComponent = props => {
    useMarketsFetch();
    useMarketsTickersFetch();
    useRangerConnectFetch();
    const history = useHistory();
    const dispatch = useDispatch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    // const [currentBidUnit, setCurrentBidUnit] = React.useState('');

    const handleRedirectToTrading = (id: string) => {
        const currentMarket: Market | undefined = markets.find(item => item.id === id);
        console.log(currentMarket);
        
        if (currentMarket) {
            props.handleChangeCurrentMarket && props.handleChangeCurrentMarket(currentMarket);
            dispatch(setCurrentMarket(currentMarket));
            history.push(`/trading/${currentMarket.id}`);
        }
    };

    const formatFilteredMarkets = (list: string[], market: Market) => {
        if (!list.includes(market.quote_unit)) {
            list.push(market.quote_unit);
        }

        return list;
    };

    let currentBidUnitsList: string[] = [''];

    if (markets.length > 0) {
        currentBidUnitsList = markets.reduce(formatFilteredMarkets, currentBidUnitsList);
    }

    let currentBidUnitMarkets = props.markets || markets;

    // if (currentBidUnit) {
    //     currentBidUnitMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.filter(market => market.quote_unit === currentBidUnit) : [];
    // }

    const formattedMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.map(market =>
    ({
        ...market,
        last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), 6),
        open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), 6),
        price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
        high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), 6),
        low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), 6),
        volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.amount_precision),
    }),
    ).map(market =>
    ({
        ...market,
        change: Decimal.format((+market.last - +market.open)
            .toFixed(market.price_precision), market.price_precision),
    })
    ).map(market => {
        const marketChangeColor = +(market.change || 0) < 0 ? '#E01E5A' : '#2FB67E';
        const market_name = market.name.split('/');
        return {
            ...market,
            pair: <div className="d-flex flex-row align-items-center">
                <img src={StarSVG} alt="star" />
                <span style={{ color: '#fff' }}>{market_name[0]}</span>/<span>{market_name[1]}</span>
            </div>,
            last: <span style={{ color: marketChangeColor }}>{market.last}</span>,
            open: <span style={{ color: marketChangeColor }}>{market.open}</span>,
            change: <span style={{ color: marketChangeColor }}>{market.change}</span>,
            volume: <span style={{ color: marketChangeColor }}>{market.volume}</span>,
            price_change_percent: <span style={{ color: marketChangeColor }}>{market.price_change_percent}</span>,
            trade: <TradeButtonStyles onClick={() => handleRedirectToTrading(market.id)}>Trade</TradeButtonStyles>
        }
    })
        : [];

    const columns = React.useMemo(
        () => {
            return [
                {
                    Header: 'Pair',
                    accessor: 'pair'
                },
                {
                    Header: 'Last Price',
                    accessor: 'last'
                },
                {
                    Header: '24h Change',
                    accessor: 'price_change_percent'
                },
                {
                    Header: '24h High',
                    accessor: 'high'
                },
                {
                    Header: '24h Low',
                    accessor: 'low'
                },
                {
                    Header: '24h Volume',
                    accessor: 'volume'
                },
                {
                    Header: '',
                    accessor: 'trade'
                },
            ]
        },
        []
    );

    return (

        <div className="container" style={{ backgroundColor: '#313445', padding: '50px 20px' }}>
            <div className="row">
                <div className="col-12">
                    <MarketTable columns={columns} data={formattedMarkets} />
                </div>
            </div>
        </div>

        // <TickerTableScreen
        //     currentBidUnit={currentBidUnit}
        //     currentBidUnitsList={currentBidUnitsList}
        //     markets={formattedMarkets}
        //     redirectToTrading={handleRedirectToTrading}
        //     setCurrentBidUnit={setCurrentBidUnit}
        // />
    );
};

export const MarketsTableScreen = React.memo(MarketsTableComponent);
