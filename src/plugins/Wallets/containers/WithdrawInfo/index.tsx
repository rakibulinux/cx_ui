import * as React from 'react'
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Select from 'react-select';
import { selectAllChildCurrencies, selectCurrencies, Wallet } from '../../../../modules';
import { CurrencyInfo } from '../../components/CurrencyInfo';
import { TradeList } from '../../components/TradeList';
import styled from 'styled-components';

const SelectStyles = {
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#313F60' : '#313445'
    }),
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #4A505',
        color: '#fff',
        backgroundColor: "#313445",
    }),
    placeholder: (provided, state) => ({
        ...provided,
        color: '#fff',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        border: '1px solid #4A505',
        color: '#fff',
        backgroundColor: "#313445",
    }),
    menu: (provided, state) => ({
        ...provided,
        border: '1px solid #4A505',
        color: '#fff',
        backgroundColor: "#313445",
    }),
    input: (provided, state) => ({
        ...provided,
        color: '#fff',
    }),
}

const DepositButtonStyles = styled.h2`
    color: #fff;
    padding: 0.5rem 0;
    font-size: 2rem;
    outline: none;
    border: none;
    cursor: pointer;
`;

const WithdrawButtonStyles = styled.h2`
    color: #fff;
    padding: 0.5rem 0;
    font-size: 2rem;
    outline: none;
    border: none;
    cursor: pointer;
    margin-left: 1rem;
    border-bottom: 4px solid #2FB67E;
`;

interface WithdrawInfoProps {
    currency_id: string;
    currency_icon: string;
    wallets: Wallet[];
}

export const WithdrawInfo: React.FC<WithdrawInfoProps> = (props: WithdrawInfoProps) => {
    const intl = useIntl();

    const { currency_id, wallets } = props;
    // history
    const history = useHistory();

    // selector
    const currencies = useSelector(selectCurrencies);
    const wallet = wallets.find(wallet => wallet.currency.toLowerCase() === currency_id.toLowerCase()) || { currency: "", name: "", type: "fiat", fee: 0, fixed: 0 };
    const all_child_currencies = useSelector(selectAllChildCurrencies);

    // method
    const findIcon = (code: string): string => {
        const currency = currencies.find((currency: any) => currency.id === code);
        try {
            return require(`../../../../../node_modules/cryptocurrency-icons/128/color/${code.toLowerCase()}.png`);
        } catch (err) {
            if (currency) return currency.icon_url;
            return require('../../../../../node_modules/cryptocurrency-icons/svg/color/generic.svg');
        }
    };

    // Select
    const options = currencies.map(currency => {
        const newCurrency = {
            value: currency.id,
            label: <span><img style={{ width: '2rem' }} src={findIcon(currency.id)} alt={currency.id} /> {currency.name.toUpperCase()}</span>
        }
        return newCurrency;
    });

    const handleChange = (selectedOption: any) => {
        const currency_id = String(selectedOption.value);
        const location = {
            pathname: `/wallets/withdraw/${currency_id.toUpperCase()}`
        }
        history.push(location);
    };

    return (
        <div className="container" style={{ padding: '20px 0' }}>
            <div className="row">
                <div className="col-8 d-flex flex-row">
                    <DepositButtonStyles onClick={() => history.push({ pathname: `/wallets/deposit/${currency_id.toUpperCase()}` })}>Deposit</DepositButtonStyles>
                    <WithdrawButtonStyles>Withdraw</WithdrawButtonStyles>
                </div>
                <div className="col-4">
                    <Select
                        styles={SelectStyles}
                        value={options.filter(option => option.value == currency_id.toLowerCase())}
                        onChange={handleChange}
                        options={options.filter((option) => !all_child_currencies.map(cur => cur.id).includes(option.value))}
                    />
                </div>
            </div>
            <div className="row" style={{ marginTop: '50px' }}>
                <div className="col-12">
                    <CurrencyInfo wallet={wallet} />
                </div>
            </div>
            <div className="row mt-5" style={{ fontSize: '1.3rem', backgroundColor: '#4E5463', padding: '20px 10px', borderRadius: '10px', margin: '0 10px' }}>
                <div className="col-12">
                    <div className="d-flex align-items-center">
                        <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4.791a.723.723 0 00.716-.729V2.729c0-.402-.32-.729-.716-.729a.723.723 0 00-.716.73v1.332c0 .402.32.73.716.73zM6.884 6.51a.713.713 0 01-.716.72.733.733 0 01-.508-.2l-.936-.94a.713.713 0 01-.212-.515c0-.197.076-.385.212-.515a.734.734 0 011.016 0l.932.934c.136.13.212.319.212.516zm4.436 14.032h1.336c.396 0 .716.326.716.729 0 .402-.32.729-.716.729h-1.332a.723.723 0 01-.716-.73c0-.38.32-.707.712-.729zM2.716 10.268h1.332c.388 0 .716.335.716.73 0 .401-.32.728-.716.728H2.716A.723.723 0 012 10.998c0-.394.328-.73.716-.73zm16.776-4.694a.696.696 0 00-.212-.511.701.701 0 00-1.02 0l-.932.934a.713.713 0 00-.212.516c0 .197.076.386.212.515.14.135.324.202.508.202a.719.719 0 00.508-.206l.932-.934a.73.73 0 00.216-.516zm.46 4.694h1.332c.388 0 .716.335.716.73 0 .401-.32.728-.716.728h-1.332a.723.723 0 01-.716-.729c0-.402.32-.73.716-.73zm-5.964 8.294h-3.976a.723.723 0 00-.716.73c0 .402.32.729.716.729h3.976a.723.723 0 00.716-.73c0-.402-.32-.729-.716-.729zM12 5.981c1.612 0 3.124.625 4.26 1.76A5.984 5.984 0 0118.024 12c0 1.61-.628 3.122-1.764 4.258a5.982 5.982 0 01-4.26 1.76 5.982 5.982 0 01-4.26-1.76A5.984 5.984 0 015.976 12c0-1.61.628-3.123 1.764-4.258A5.982 5.982 0 0112 5.982z" fill="currentColor"></path>
                        </svg>
                        <span className="ml-2">{intl.formatMessage({ id: 'page.body.plugins.wallet.withdraw.info.tips' })}: </span>
                    </div>
                    <div className="ml-2 mt-2">
                        <p>{intl.formatMessage({ id: 'page.body.plugins.wallet.withdraw.info.tip1' })}</p>
                        <p>{intl.formatMessage({ id: 'page.body.plugins.wallet.withdraw.info.tip2' })}</p>
                        <p>{intl.formatMessage({ id: 'page.body.plugins.wallet.withdraw.info.tip3' })}</p>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <h5>Go To Trade:</h5>
                </div>
                <div className="col-12">
                    <TradeList currency_id={currency_id} />
                </div>
            </div>
        </div>
    )
}
