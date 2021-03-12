import * as React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';
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
    // setCurrentMarket,
} from '../../modules';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

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
    // const history = useHistory();
    // const dispatch = useDispatch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    // const [currentBidUnit, setCurrentBidUnit] = React.useState('');

    // const handleRedirectToTrading = (id: string) => {
    //     const currentMarket: Market | undefined = markets.find(item => item.id === id);

    //     if (currentMarket) {
    //         // props.handleChangeCurrentMarket && props.handleChangeCurrentMarket(currentMarket);
    //         dispatch(setCurrentMarket(currentMarket));
    //         history.push(`/trading/${currentMarket.id}`);
    //     }
    // };

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

    // let currentBidUnitMarkets = props.markets || markets;

    // if (currentBidUnit) {
    //     currentBidUnitMarkets = currentBidUnitMarkets.length ? currentBidUnitMarkets.filter(market => market.quote_unit === currentBidUnit) : [];
    // }

    const formattedMarkets = markets.length > 0 ? markets.map(market =>
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
        }),
    ) : [];

    const columns = React.useMemo(
        () => [
            {
                Header: '',
                accessor: 'id'
            },
            {
                Header: 'Market',
                accessor: 'market'
            },
            {
                Header: 'Last Price',
                accessor: 'last_price'
            },
            {
                Header: '24 Change',
                accessor: 'change'
            },
            {
                Header: '24 High',
                accessor: 'high'
            },
            {
                Header: '24 Low',
                accessor: 'low'
            },
            {
                Header: '24 Volume',
                accessor: 'volume'
            },
            {
                Header: 'Trade',
                accessor: 'trade'
            },
        ],
        []
    )

    const data = React.useMemo(() => formattedMarkets, [])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}
