import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ChildCurrency, selectCurrencies, selectWallets, walletsAddressFetch, walletsFetch } from '../../../../modules';
import { DepositBody } from '../../components/DepositBody';
import Tabs, { TabPane } from 'rc-tabs';
import styled from 'styled-components';

import { LockIcon } from '../../../../assets/images/LockIcon';
import { useIntl } from 'react-intl';
import { getTabName } from '../../../../helpers';

const TabsStyle = styled.div`
    .rc-tabs-nav-list {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .rc-tabs-tab {
            width: 100%;
            padding: 5px 0;
            transition: ease-in-out 0.2s;
            border-bottom: 4px solid transparent;
            .rc-tabs-tab-btn {
                text-align: center;
                outline: none;
                border: none;
                cursor: pointer;
            }

            :hover {
                font-weight: bold;
                color: #fff;
            }
        }
        
        .rc-tabs-tab-active {
            font-weight: bold;
            color: #fff;
            border-bottom: 4px solid #2FB67E;
        }

        .rc-tabs-ink-bar {
            display: none;
        }
    }
`;

const BlurDisable = styled.div`
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    align-items: center;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background: #4E5463;
    display: flex;
    height: 100%;
    justify-content: center;
    z-index: 10;
    flex-direction: column;
`;
interface DepositAddressProps {
    currency_id: string;
    currency_icon: string;
    child_currencies: ChildCurrency[];
}



export const DepositAddress: React.FC<DepositAddressProps> = (props: DepositAddressProps) => {
    const { currency_id, child_currencies } = props;
    const intl = useIntl();
    const [generateAddressTriggered, setGenerateAddressTriggered] = React.useState(false);
    const [selectedCurrencyID, setSelectedCurrencyID] = React.useState(currency_id);
    const dispatch = useDispatch();
    const wallets = useSelector(selectWallets) || [];
    const currencies = useSelector(selectCurrencies) || [];
    const currency = currencies.find(cur => cur.id.toLowerCase() === currency_id.toLowerCase()) || { blockchain_key: '' };
    const main_wallet = wallets.find(item => item.currency === currency_id) || { name: '', currency: '', balance: '', type: '', address: '' };
    const child_wallets = child_currencies.map(network => {
        return {
            ...network,
            wallet: wallets.find(item => item.currency === network.id) || { name: '', currency: '', balance: '', type: '', address: '' }
        }
    });
    const isAccountActivated = main_wallet.type === 'fiat' || main_wallet.balance;


    const handleGenerateAddress = (wallet: { address: string, type: string, currency: string }) => {
        if (!wallet.address && wallets.length && wallet.type !== 'fiat') {
            dispatch(walletsAddressFetch({ currency: wallet.currency }));
            dispatch(walletsFetch());
            setGenerateAddressTriggered(true);
        }
    };

    React.useEffect(() => {
        dispatch(walletsAddressFetch({ currency: selectedCurrencyID }));
    }, [selectedCurrencyID]);

    React.useEffect(() => {
        dispatch(walletsAddressFetch({ currency: currency_id }));
    }, [dispatch, currency_id]);

    return (
        <div className="container d-flex flex-column justify-content-between" style={{ backgroundColor: '#2D2E3D', padding: '30px', borderRadius: '5px', height: '100%', fontSize: '1.3rem' }}>
            <div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                        <h4>Deposit Nework</h4>
                        <span>Average arrival time：1 minutes</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <TabsStyle>
                            <Tabs defaultActiveKey={currency_id} onChange={(key) => setSelectedCurrencyID(key)}>
                                {
                                    main_wallet
                                        ? <TabPane tab={getTabName(currency.blockchain_key || '')} key={currency_id}>
                                            <DepositBody
                                                wallet_index={0}
                                                wallet={main_wallet}
                                                isAccountActivated={isAccountActivated}
                                                handleGenerateAddress={() => handleGenerateAddress({
                                                    address: main_wallet.address || '',
                                                    type: main_wallet.type || '',
                                                    currency: main_wallet.currency || ''
                                                })}
                                                generateAddressTriggered={generateAddressTriggered}
                                            />
                                        </TabPane>
                                        : ""
                                }
                                {
                                    child_wallets ?
                                        child_wallets.map((child_wallet, index) => (
                                            <TabPane tab={getTabName(child_wallet.blockchain_key || '')} key={child_wallet.id || ''}>
                                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                    {
                                                        child_wallet.wallet && child_wallet.deposit_enabled ?
                                                            <DepositBody
                                                                wallet_index={index + 1}
                                                                wallet={child_wallet.wallet}
                                                                isAccountActivated={isAccountActivated}
                                                                handleGenerateAddress={() => handleGenerateAddress({
                                                                    address: child_wallet.wallet.address || '',
                                                                    type: child_wallet.wallet.type || '',
                                                                    currency: child_wallet.wallet.currency || ''
                                                                })}
                                                                generateAddressTriggered={generateAddressTriggered}
                                                            />
                                                            :
                                                            <BlurDisable>
                                                                <LockIcon className="pg-blur__content__icon" />
                                                                {intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.disabled.message' })}
                                                            </BlurDisable>
                                                    }
                                                </div>
                                            </TabPane>
                                        ))
                                        :
                                        ""
                                }

                            </Tabs>
                        </TabsStyle>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12 d-flex justify-content-between">
                    <p className="pr-5">
                        <strong>Send only {selectedCurrencyID.toUpperCase()}  to this deposit address.</strong>
                        <br />
                    Sending coin or token other than {selectedCurrencyID.toUpperCase()} to this address may result in the loss of your deposit.
                   </p>
                </div>
            </div>
        </div>
    )
}
