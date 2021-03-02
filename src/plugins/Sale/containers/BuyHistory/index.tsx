import * as React from 'react';
import { Table } from 'antd';
import api from '../../../api';
import format from 'date-fns/format';

interface BuyHistoryProps {
    uid: string;
    ieoID: number;
}

interface BuyHistoryModel {
    id: number;
    uid: string;
    quantity: string;
    base_currency: string;
    total: string;
    quote_currency: string;
    created_at: string;
}

export const BuyHistory: React.FC<BuyHistoryProps> = (props: BuyHistoryProps) => {
    const columns = [
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Currency',
            dataIndex: 'base_currency',
            key: 'base_currency',
        },
        {
            title: 'Total Purchase',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Purchase Currency',
            dataIndex: 'quote_currency',
            key: 'quote_currency',
        },
        {
            title: 'Buy Date',
            dataIndex: 'created_at',
            key: 'created_at',
        },
    ];

    const [tableState, setTableState] = React.useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        loading: false,
    });

    const fetch = (params: any) => {
        setTableState({ ...tableState, loading: true });
        api.get(`/ieo/fetch/buy/uid=${props.uid}/ieo_id=${props.ieoID}&page=${params.pagination.current - 1}&size=${params.pagination.pageSize}`)
            .then(response => {
                const data: any = [...response.data.payload];
                const newData = data.map((buy: BuyHistoryModel) => {
                    const newdata = {
                        ...buy,
                        key: buy.id,
                        base_currency: buy.base_currency.toUpperCase(),
                        quote_currency: buy.quote_currency.toUpperCase(),
                        quantity: Number(buy.quantity).toFixed(4),
                        total: Number(buy.total).toFixed(4),
                        created_at: format(new Date(buy.created_at), 'HH:mm:ss dd/MM/yyyy'),
                    };

                    return newdata;
                });

                setTableState({
                    loading: false,
                    data: newData,
                    pagination: {
                        ...params.pagination,
                        pageSize: params.pagination.pageSize,
                        total: response.data.total,
                    },
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleTableChange = pagination => {
        fetch({
            pagination,
          });
    };

    React.useEffect(() => {
        const { pagination } = tableState;
        fetch({ pagination });
    }, []);

    const { data, pagination, loading } = tableState;

    return (
        <React.Fragment>
            <h2 className="text-center text-info">Your Purchase</h2>
            <Table size="small" pagination={pagination} dataSource={data} loading={loading} columns={columns} onChange={handleTableChange} />
        </React.Fragment>
    );
}
