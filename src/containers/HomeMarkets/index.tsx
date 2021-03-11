import * as React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';

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

    const data = React.useMemo(() => [
        {
            id: 1,
            market: 'BTC/USDT',
            last_price: 0.0002,
            change: 0.002,
            high: 0,
            low: 0,
            volume: 0,
            trade: <button className="btn btn-primary">Trade</button>
        },
        {
            id: 2,
            market: 'ETH/USDT',
            last_price: 0.0022,
            change: 0.002,
            high: 0,
            low: 0,
            volume: 0,
            trade: <button className="btn btn-primary">Trade</button>
        },
        {
            id: 3,
            market: 'LKT/USDT',
            last_price: 0.0072,
            change: 0.002,
            high: 0,
            low: 0,
            volume: 0,
            trade: <button className="btn btn-primary">Trade</button>
        },
        {
            id: 4,
            market: 'UNI/USDT',
            last_price: 0.0053,
            change: 0.007,
            high: 0,
            low: 0,
            volume: 0,
            trade: <button className="btn btn-primary">Trade</button>
        }
    ], [])

    return (
        <Styles>
            <Table columns={columns} data={data} />
        </Styles>
    )
}
