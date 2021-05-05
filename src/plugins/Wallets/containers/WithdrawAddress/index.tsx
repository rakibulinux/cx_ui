import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Currency, Wallet, walletsAddressFetch, Beneficiary, User, selectETHFee, ETHFee, ChildCurrency, walletsWithdrawCcyFetch } from '../../../../modules';
import Tabs, { TabPane } from 'rc-tabs';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import { WalletItemProps } from '../../../../components';
import { ModalWithdrawConfirmation, ModalWithdrawSubmit, Withdraw, WithdrawProps } from '../../../../containers';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { message } from 'antd';
import { LockIcon } from '../../../../assets/images/LockIcon';
import { useEthFeeFetch } from '../../../../hooks';
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

interface WithdrawAddressProps {
    currency_id: string;
    wallets: Wallet[];
    currencies: Currency[];
    user: User;
    eth_fee: ETHFee[];
    child_currencies: ChildCurrency[];
}

const defaultBeneficiary: Beneficiary = {
    id: 0,
    currency: '',
    name: '',
    state: '',
    data: {
        address: '',
    },
};

interface WalletsState {
    otpCode: string;
    amount: string;
    beneficiary: Beneficiary;
    withdrawSubmitModal: boolean;
    withdrawConfirmModal: boolean;
    bchAddress?: string;
    filteredWallets?: WalletItemProps[] | null;
    tab: string;
    withdrawDone: boolean;
    total: string;
    currentTabIndex: number;
    generateAddressTriggered: boolean;
}

export const WithdrawAddress: React.FC<WithdrawAddressProps> = (props: WithdrawAddressProps) => {
    const { currency_id, wallets, currencies, child_currencies } = props;

    const [currencyState, setCurrencyState] = React.useState(currency_id);

    React.useEffect(() => {
        setCurrencyState(currency_id);
    }, [currency_id])

    useEthFeeFetch();

    const intl = useIntl();
    const dispatch = useDispatch();
    const history = useHistory();

    // selectors
    const eth_fee = useSelector(selectETHFee);

    // state
    const [withdrawState, setState] = React.useState<WalletsState>({
        withdrawSubmitModal: false,
        withdrawConfirmModal: false,
        otpCode: '',
        amount: '',
        beneficiary: defaultBeneficiary,
        tab: intl.formatMessage({ id: 'page.body.wallets.tabs.deposit' }),
        withdrawDone: false,
        total: '',
        currentTabIndex: 0,
        generateAddressTriggered: false,
    });

    // side effects
    React.useEffect(() => {
        dispatch(walletsAddressFetch({ currency: currency_id }));
    }, [dispatch, currency_id]);

    const child_wallets = child_currencies.map(network => {
        return {
            ...network,
            wallet: wallets.find(item => item.currency === network.id) || { name: '', currency: '', balance: '', type: 'coin', address: '', fee: 0, explorerTransaction: '', explorerAddress: '', fixed: 0 }
        }
    })

    // const walletsError = useSelector(selectWalletsAddressError);

    const wallet = wallets.find(item => item.currency === currency_id.toLowerCase()) || { name: '', currency: '', balance: '', type: 'coin', address: '', fee: 0, explorerTransaction: '', explorerAddress: '', fixed: 0 };
    const currencyItem = currencies.find(currency => currency.id.toLowerCase() === currency_id.toLowerCase());
    const fee_currency = eth_fee.find(cur => cur.currency_id === currency_id);
    const ethFee = fee_currency ? fee_currency.fee : undefined;
    const selectedWalletFee = wallet ? wallet.fee : undefined;
    const eth_wallet = wallets.find(wallet => wallet.currency.toLowerCase() === 'eth');
    const eth_balance = eth_wallet ? eth_wallet.balance : undefined;
    let confirmationAddress = '';
    if (wallet) {
        confirmationAddress = wallet.type === 'fiat' ? (
            withdrawState.beneficiary.name
        ) : (
            withdrawState.beneficiary.data ? (withdrawState.beneficiary.data.address as string) : ''
        );
    }

    const redirectToEnable2fa = () => history.push('/security/2fa', { enable2fa: true });

    const toggleConfirmModal = (amount?: string, total?: string, beneficiary?: Beneficiary, otpCode?: string) => {
        setState({
            ...withdrawState,
            amount: amount || '',
            beneficiary: beneficiary ? beneficiary : defaultBeneficiary,
            otpCode: otpCode ? otpCode : '',
            withdrawConfirmModal: !withdrawState.withdrawConfirmModal,
            total: total || '',
            withdrawDone: false,
        });
    };

    const isOtpDisabled = () => {
        return (
            <React.Fragment>
                <p className="pg-wallet__enable-2fa-message">
                    {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.enable2fa' })}
                </p>
                <Button
                    block={true}
                    onClick={redirectToEnable2fa}
                    size="lg"
                    variant="primary"
                >
                    {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.enable2faButton' })}
                </Button>
            </React.Fragment>
        );
    };

    const isTwoFactorAuthRequired = (level: number, is2faEnabled: boolean) => {
        return level > 1 || (level === 1 && is2faEnabled);
    }

    const renderWithdrawContent = (wallet: Wallet) => {

        const { user: { level, otp }, currencies } = props;

        const { currency, type, fee } = wallet;
        const fixed = (wallet || { fixed: 0 }).fixed;


        const selectedCurrency = currencies.find(cur => cur.id == currency);
        const minWithdrawAmount = (selectedCurrency && selectedCurrency.min_withdraw_amount) ? selectedCurrency.min_withdraw_amount : undefined;
        const limitWitdraw24h = (selectedCurrency && selectedCurrency.withdraw_limit_24h) ? selectedCurrency.withdraw_limit_24h : undefined;
        
        
        const withdrawProps: WithdrawProps = {
            withdrawDone: withdrawState.withdrawDone,
            currency: currencyState,
            fee: fee,
            onClick: toggleConfirmModal,
            twoFactorAuthRequired: isTwoFactorAuthRequired(level, otp),
            fixed,
            type,
            withdrawAmountLabel: intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.amount' }),
            withdraw2faLabel: intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' }),
            withdrawFeeLabel: intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.fee' }),
            withdrawTotalLabel: intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.total' }),
            withdrawButtonLabel: intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.button' }),
            ethFee,
            ethBallance: eth_balance,
            minWithdrawAmount,
            limitWitdraw24h,
        };

        return otp ? <Withdraw {...withdrawProps} /> : isOtpDisabled();
    };

    const toggleSubmitModal = () => {
        setState({
            ...withdrawState,
            withdrawSubmitModal: !withdrawState.withdrawSubmitModal,
            withdrawDone: true,
        });
    };

    const handleWithdraw = () => {
        const { otpCode, amount, beneficiary } = withdrawState;
        if (!wallet) {
            return;
        }

        let { currency, fee } = wallet;

        // Withdraw by eth fee
        const { user, eth_fee, wallets } = props;
        const ethWallet = wallets.find(wallet => wallet.currency.toLowerCase() === 'eth');
        const ethBallance = ethWallet ? ethWallet.balance : undefined;
        const fee_currency = eth_fee.find(cur => cur.currency_id === currency);

        if (fee == 0) {
            if (!(fee_currency && fee_currency.fee)) {
                message.error('Something wrong with ETH fee.');
                return;
            }
            if (!(ethBallance && Number(ethBallance) >= Number(fee_currency.fee))) {
                message.error('ETH balance isn\'t enough to pay.');
                return;
            }
        }


        const withdrawRequest = {
            uid: user.uid,
            fee: fee.toString(),
            amount,
            currency: currencyState,
            otp: otpCode,
            beneficiary_id: String(beneficiary.id),
        };

        dispatch(walletsWithdrawCcyFetch(withdrawRequest));
        toggleConfirmModal();
    };

    return (
        <React.Fragment>
            <div className="container d-flex flex-column justify-content-between" style={{ backgroundColor: '#2D2E3D', padding: '30px', borderRadius: '5px', height: '100%', fontSize: '1.3rem' }}>
                <div>
                    <div className="row">
                        <div className="col-12">
                            <h4>Withdrawal Nework</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {
                                <TabsStyle>
                                    <Tabs defaultActiveKey={currency_id} onTabClick={(key) => setCurrencyState(key)} >
                                        {
                                            wallet ?
                                                <TabPane tab={getTabName(currencyItem && currencyItem.blockchain_key ? currencyItem.blockchain_key : '')} key={currency_id}>
                                                    {currencyItem && !currencyItem.withdrawal_enabled ? (
                                                        <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                                                            <BlurDisable >
                                                                <LockIcon className="pg-blur__content__icon" />
                                                                {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.disabled.message' })}
                                                            </BlurDisable>
                                                        </div>
                                                    ) : renderWithdrawContent(wallet)}

                                                </TabPane>
                                                : ''
                                        }

                                        {
                                            child_wallets ?
                                                child_wallets.map(child_wallet => (
                                                    <TabPane tab={getTabName(child_wallet.blockchain_key)} key={child_wallet.id}>
                                                        {child_wallet.wallet && child_wallet.withdrawal_enabled ?
                                                            renderWithdrawContent(child_wallet.wallet)

                                                            : (
                                                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                                                    <BlurDisable >
                                                                        <LockIcon className="pg-blur__content__icon" />
                                                                        {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.disabled.message' })}
                                                                    </BlurDisable>
                                                                </div>

                                                            )
                                                        }
                                                    </TabPane>
                                                ))
                                                : ""
                                        }

                                    </Tabs>
                                </TabsStyle>

                            }

                        </div>
                    </div>
                </div>
            </div >
            <ModalWithdrawSubmit
                show={withdrawState.withdrawSubmitModal}
                currency={currency_id}
                onSubmit={toggleSubmitModal}
            />
            <ModalWithdrawConfirmation
                show={withdrawState.withdrawConfirmModal}
                amount={withdrawState.total}
                currency={currency_id}
                rid={confirmationAddress}
                onSubmit={handleWithdraw}
                onDismiss={toggleConfirmModal}
                ethFee={ethFee}
                ethBallance={eth_balance}
                selectedWalletFee={selectedWalletFee}
            />
        </React.Fragment>
    )
}
