import * as React from 'react';
import { useTable, usePagination } from 'react-table';
import styled from 'styled-components';
import EmptySVG from './empty.svg';

const TableStyles = styled.div`
    padding-bottom: 200px;
    table {
        position: relative;
        width: 100%;
        height: 30px;
        border-spacing: 0;
        th,td {
            margin: 0;
            cursor: pointer;
            font-size: 14px;
            color: #fff;
            text-align: justify;
            padding-top: 7px;
            padding-bottom: 7px;
            padding-right: 10px; 
            padding-left: 10px;
            transition: all 0.2s;
            background-color: #313445;
        }
        tr {
            border-top: 1px solid #A7A8AF;
        }
        th {
            color: #fff;
            background-color: #848E9C;
        }
        th:not(:first-child) {
            text-align: center
        }
        tr td:not(:first-child) {
            text-align: center
        }

        tr:hover td{
            background-color: #41455c;
            color: #fff;
        }
    }

    .pagination {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        font-size: 1.3rem;

        .pagination-page_number, .pagination-page_select {
            color: #fff;
            select, input {
                width: 200px;
                font-size: 1.3rem;
                border: 1px solid #5D76B5;
                outline: none;
                padding: 0.3rem 0.5rem 0.3rem 0.5rem;
                color: #fff;
                padding: 0.5rem;
                background-color: #313445;
                border-radius: 2px;
                -webkit-transition: width 0.4s ease-in-out;
                transition: all 0.2s ease-in-out;
                font-size: 1rem;
                /* When the input field gets focus, change its width to 100% */
                :focus {
                    width: 200px;
                    border: 1px solid #9AA9D1;
                }
            }
        }

        .pagination-button-box {
            button {
            outline: none;
            margin-right: 5px;
            border: none;
            border-radius: 5px;
            width: 40px;
            height: 40px;
            cursor: pointer;
            color: #fff;
            background-color: #2D2E3D;
            transition: ease-in-out 0.3s;
            :disabled {
                background-color: #313445;
                cursor: not-allowed;
                color: #49619E;
            }

        }
        }
    }

    .empty {
        position: absolute;
        top: 35px;
        left: 0;
        width: 100%;
        height: 200px;
        background-color: #313445;
        padding: 50px 0;
    }
`;

interface ReacTableProps {
    columns: any;
    data: any;
    headColor: string;
}

export const ReactTable: React.FC<ReacTableProps> = (props: ReacTableProps) => {
    const { columns, data, headColor } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    // Render the UI for your table
    return (
        <TableStyles>
            <table {...getTableProps()} style={{ position: 'relative' }}>
                <thead style={{ backgroundColor: headColor }}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th width="25%" {...column.getHeaderProps()}>
                                    <span style={{ fontWeight: 'normal' }}>
                                        {column.render('Header')}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {
                    [...page].length === 0
                        ? <div className="text-center empty">
                            <img className="text-center" width="100px" src={EmptySVG} />
                            <br />
                            <p>No Data</p>
                        </div>
                        :
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return <td width="25%" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                }

            </table>
            <div className="pagination">
                <div className="pagination-page_number">
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </span>
                    <span>
                        | Go to page:{' '}
                        <input
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>{' '}
                </div>
                <div className="pagination-button-box">
                    <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </button>{' '}
                    <button style={{ backgroundColor: '#8093C4' }}>
                        {pageIndex + 1}
                    </button>{' '}
                    <button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </button>{' '}
                    <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </button>{' '}
                </div>
                <div className="pagination-page_select">
                    <select
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </TableStyles>

    )
}
