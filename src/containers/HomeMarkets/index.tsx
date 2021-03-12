import * as React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { Decimal } from '../../components';
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
    // setCurrentMarket,
} from '../../modules';
import { useHistory } from 'react-router';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export const HomeMarkets = () => {
    useMarketsFetch();
    useMarketsTickersFetch();
    useRangerConnectFetch();
    const history = useHistory();
    const dispatch = useDispatch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const [currentBidUnit, setCurrentBidUnit] = React.useState('');

    const handleRedirectToTrading = (id: string) => {
        setCurrentBidUnit(id); // remove
        const currentMarket: Market | undefined = markets.find(item => item.id === id);

        if (currentMarket) {
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

    let currentBidUnitMarkets = markets;

    if (currentBidUnit) {
        currentBidUnitMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.filter(market => market.quote_unit === currentBidUnit) : [];
    }

    const formattedMarkets = markets.length > 0 ? markets.map((market, index) => {
        // value
        const last = Number((marketTickers[market.id] || defaultTicker).last);
        const open = Number((marketTickers[market.id] || defaultTicker).open);
        const price_change_percent = (marketTickers[market.id] || defaultTicker).price_change_percent;
        const high = Number((marketTickers[market.id] || defaultTicker).high);
        const low = Number((marketTickers[market.id] || defaultTicker).low);
        const volume = Number((marketTickers[market.id] || defaultTicker).volume);
        const change = (+last - +open);

        // color
        const marketChangeColor = +(change || 0) < 0 ? "#e63946" : "#2ec4b6";

        const newMarket = {
            ...market,
            name: <span onClick={() => handleRedirectToTrading(market.id)}>{market.name}</span>,
            last: <span style={{ color: marketChangeColor, fontWeight: 'bold' }} onClick={() => handleRedirectToTrading(market.id)}>{Decimal.format(last, 6)}</span>,
            open: Decimal.format(open, 6),
            price_change_percent: <span style={{ color: marketChangeColor, fontWeight: 'bold' }} onClick={() => handleRedirectToTrading(market.id)}>{String(price_change_percent)}</span>,
            high: <span onClick={() => handleRedirectToTrading(market.id)}>{Decimal.format(high, 6)}</span>,
            low: <span onClick={() => handleRedirectToTrading(market.id)}>{Decimal.format(low, 6)}</span>,
            volume: <span style={{ color: marketChangeColor, fontWeight: 'bold' }} onClick={() => handleRedirectToTrading(market.id)}>{Decimal.format(volume, market.amount_precision)}</span>,
            number: <span onClick={() => handleRedirectToTrading(market.id)}>{(index + 1)}</span>,
            change: Decimal.format(change.toFixed(market.price_precision), market.price_precision),
            trade: <button type="button" className="btn" style={{
                padding: '0.5rem 1.5rem', color: '#fff', background: 'linear-gradient(145deg, #4625b8, #3b209b)', fontWeight: 'bold'
            }}>TRADE</button>
        }
        return newMarket;
    }
    ) : [];

    const columns = React.useMemo(
        () => [
            { Header: '', accessor: 'number' }, { Header: 'Market', accessor: 'name' }, { Header: 'Last Price', accessor: 'last' }, { Header: '24 Change', accessor: 'price_change_percent' }, { Header: '24 High', accessor: 'high' }, { Header: '24 Low', accessor: 'low' }, { Header: '24 Volume', accessor: 'volume' }, { Header: 'Trade', accessor: 'trade' },
        ],
        []
    )

    const data = formattedMarkets;

    const renderHeader = () => {

        return (
            currentBidUnitsList.map((item, i) => {
                const isActive = item == currentBidUnit ? '145deg, #5321a4, #461c8a' : '145deg, #3d21a3, #331c89';
                return (
                    <button
                        className="btn"
                        style={{
                            padding: '0.5rem 3rem', marginLeft: '1rem', color: '#fff', background: `linear-gradient(${isActive})`, fontWeight: 'bold'
                        }}
                        key={i}
                        onClick={() => setCurrentBidUnit(item)}
                    >
                        <span >
                            {item ? item.toUpperCase() : 'All'}
                        </span>
                    </button>
                )
            })

        );

    }

    const renderTable = () => {
        const Styles = styled.div`
            padding: 1rem;
            table {
                width: 100%;
                border-spacing: 0;
                border: 1px solid black;
                tr {
                    background-color: #2A166D;

                :last-child {
                    td {
                    border-bottom: 0;
                    }
                }
                }
                th,
                td {
                margin: 0;
                cursor: pointer;
                font-size: 1.2rem;
                padding: 1rem 0.5rem;
                color: #fff;
                text-align: center;
                border-bottom: 1px solid black;
                border-right: 1px solid black;
                :last-child {
                    border-right: 0;
                }
                }
                th {
                    background-color: #23135B;
                }
            }
        `
        return (
            <Styles>
                <Table columns={columns} data={data} />
            </Styles>
        );
    }

    return (
        <React.Fragment>
            {renderHeader()}
            {renderTable()}
        </React.Fragment>
    )
}
