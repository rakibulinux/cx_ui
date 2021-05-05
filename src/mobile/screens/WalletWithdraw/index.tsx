import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useWalletsFetch } from '../../../hooks';
import { selectChildCurrencies, selectWallets, walletsChildCurrenciesFetch } from '../../../modules/user/wallets';
import { Subheader, WalletHeader, WalletWithdrawBody, WalletBanner } from '../../components';
import styled from 'styled-components';
import Tabs, { TabPane } from 'rc-tabs';
import { selectCurrencies } from '../../../modules';
import { LockIcon } from '../../../assets/images/LockIcon';
import { getTabName } from '../../../helpers';

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
    background: var(--body-background-color-level-6);
    display: flex;
    height: 100%;
    justify-content: center;
    z-index: 10;
    flex-direction: column;
`;

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

const defaultWallet = { name: '', currency: '', balance: '', type: '', address: '', fee: '' };

const WalletWithdraw: React.FC = () => {

  const { currency = '' } = useParams<{currency: string}>();
  const [currencyState, setCurrencyState] = React.useState(currency);

  const intl = useIntl();
  const history = useHistory();
  const wallets = useSelector(selectWallets) || [];
  const wallet = wallets.find(item => item.currency === currency) || defaultWallet;
  const parent_currencies = useSelector(selectCurrencies);
  const parent_currency = parent_currencies.find(par_cur => par_cur.id.toLowerCase() === String(currency).toLowerCase()) || { blockchain_key: '', withdrawal_enabled: false };
  const child_currencies = useSelector(selectChildCurrencies);
  const dispatch = useDispatch();
  const dispatchFetchChildCurrencies = () => dispatch(walletsChildCurrenciesFetch({ currency: currency }));
  // side effects
  React.useEffect(() => {
    dispatchFetchChildCurrencies();
    setCurrencyState(currency);
  }, [currency]);
  useWalletsFetch();

  const child_wallets = child_currencies.map(network => {
    return {
      ...network,
      wallet: wallets.find(item => item.currency === network.id) || { name: '', currency: '', balance: '', type: '', address: '' }
    }
  })

  return (
    <div className="cr-mobile-wallet-withdraw">
      <Subheader
        title={intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw' })}
        backTitle={intl.formatMessage({ id: 'page.body.wallets.balance' })}
        onGoBack={() => history.push(`/wallets/${currency}/history`)}
      />
      <WalletHeader currency={wallet.currency} name={wallet.name} />
      <WalletBanner wallet={wallet} />

      <TabsStyle>
        <Tabs defaultActiveKey={currency} onTabClick={(key) => setCurrencyState(key)} >
          {
            wallet ?
              <TabPane tab={getTabName(parent_currency.blockchain_key || '')} key={currency}>
                {parent_currency && parent_currency.withdrawal_enabled ?
                  <WalletWithdrawBody parent_currency={currency} currency={currencyState} wallet={wallet} />
                  :
                  (
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                      <BlurDisable >
                        <LockIcon className="pg-blur__content__icon" />
                        {intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.disabled.message' })}
                      </BlurDisable>
                    </div>
                  )
                }
              </TabPane>
              : ''
          }
          {
            child_wallets ?
              child_wallets.map(child_wallet => (
                <TabPane tab={getTabName(child_wallet.blockchain_key)} key={child_wallet.id}>
                  {child_wallet.wallet && child_wallet.withdrawal_enabled ?
                    <WalletWithdrawBody parent_currency={currency} currency={currencyState} wallet={child_wallet.wallet} />

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

    </div>
  );
};

export {
  WalletWithdraw,
};
