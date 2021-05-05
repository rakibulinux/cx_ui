import * as React from 'react';
import { Spinner } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { Route, RouterProps, Switch } from 'react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { minutesUntilAutoLogout, sessionCheckInterval, /* showLanding */ } from '../../api';
import { ExpiredSessionModal } from '../../components';
import { WalletsFetch } from '../../containers';
import { toggleColorTheme } from '../../helpers';
import { IntlProps } from '../../index';
/* import { isMobile } from "react-device-detect"; */
import {
    ChangeForgottenPasswordMobileScreen,
    ConfirmMobileScreen,
    EmailVerificationMobileScreen,
    ForgotPasswordMobileScreen,
    LandingScreenMobile,
    OrdersMobileScreen,
    ProfileAccountActivityMobileScreen,
    ProfileApiKeysMobileScreen,
    ProfileAuthMobileScreen,
    ProfileChangePasswordMobileScreen,
    ProfileLanguageMobileScreen,
    ProfileMobileScreen,
    ProfileThemeMobileScreen,
    ProfileVerificationMobileScreen,
    SelectedWalletMobileScreen,
    SignInMobileScreen,
    SignUpMobileScreen,
    TradingScreenMobile,
    WalletDeposit,
    WalletsMobileScreen,
    WalletWithdraw,
} from '../../mobile/screens';

import {
    TradingCompetionListMobileScreen,
    TradingCompetitionDetailMobileScreen
} from '../../mobile/plugins/TradingCompetion';

import {
    configsFetch,
    logoutFetch,
    Market,
    RootState,
    selectConfigsLoading,
    selectConfigsSuccess,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectMobileDeviceState,
    selectPlatformAccessStatus,
    selectUserFetching,
    selectUserInfo,
    selectUserLoggedIn,
    toggleChartRebuild,
    User,
    userFetch,
    walletsReset,
} from '../../modules';
import {
    CustomizationDataInterface,
    customizationFetch,
    selectCustomizationData,
} from '../../modules/public/customization';
import {
    ChangeForgottenPasswordScreen,
    ConfirmScreen,
    EmailVerificationScreen,
    ForgotPasswordScreen,
    HistoryScreen,
    /* LandingScreen, */
    MagicLink,
    MaintenanceScreen,
    OrdersTabScreen,
    ProfileScreen,
    ProfileTwoFactorAuthScreen,
    RestrictedScreen,
    TradingScreen,
    VerificationScreen,
    FeeScreen,
    // SignUpScreen,
    LogInScreen,
    RegisterScreen,
    HomePageScreen,
    /* HomeScreen, */
} from '../../screens';
import { AirdropList, AirdropDetail } from '../../plugins/Airdrop';
import { SaleListScreen } from '../../plugins/Sale';
import { SaleDetailScreen } from '../../plugins/Sale/screens/SaleDetailScreen';
import { IEODetailMobileScreen, IEOListMobileScreen } from '../../mobile/plugins/IEO';
import { TradingCompetionListScreen, TradingCompetitionDetailScreen } from '../../plugins/TradingCompetion';
import { DepositScreen, WalletListScreen } from '../../plugins/Wallets';
import { WithdrawScreen } from '../../plugins/Wallets/screens/WithdrawScreen';

interface ReduxProps {
    colorTheme: string;
    currentMarket?: Market;
    customization?: CustomizationDataInterface;
    user: User;
    isLoggedIn: boolean;
    isMobileDevice: boolean;
    userLoading?: boolean;
    platformAccessStatus: string;
    configsLoading: boolean;
    configsSuccess: boolean;
}

interface DispatchProps {
    fetchConfigs: typeof configsFetch;
    fetchCustomization: typeof customizationFetch;
    logout: typeof logoutFetch;
    userFetch: typeof userFetch;
    walletsReset: typeof walletsReset;
}

interface LocationProps extends RouterProps {
    location: {
        pathname: string;
    };
}

interface LayoutState {
    isShownExpSessionModal: boolean;
}

interface OwnProps {
    toggleChartRebuild: typeof toggleChartRebuild;
}

export type LayoutProps = ReduxProps & DispatchProps & LocationProps & IntlProps & OwnProps;

const renderLoader = () => (
    <div className="pg-loader-container">
        <Spinner animation="border" variant="primary" />
    </div>
);

const STORE_KEY = 'lastAction';

//tslint:disable-next-line no-any
const PrivateRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }
    const renderCustomerComponent = props => <CustomComponent {...props} />;

    if (isLogged) {
        return <Route {...rest} render={renderCustomerComponent} />;
    }

    return (
        <Route {...rest}>
            <Redirect to={'/signin'} />
        </Route>
    );
};

//tslint:disable-next-line no-any
const PublicRoute: React.FunctionComponent<any> = ({ component: CustomComponent, loading, isLogged, ...rest }) => {
    if (loading) {
        return renderLoader();
    }

    if (isLogged) {
        return <Route {...rest}><Redirect to={'/wallets'} /></Route>;
    }

    const renderCustomerComponent = props => <CustomComponent {...props} />;

    return <Route {...rest} render={renderCustomerComponent} />;
};

class LayoutComponent extends React.Component<LayoutProps, LayoutState> {
    public static eventsListen = [
        'click',
        'keydown',
        'scroll',
        'resize',
        'mousemove',
        'TabSelect',
        'TabHide',
    ];

    public timer;
    public walletsFetchInterval;

    constructor(props: LayoutProps) {
        super(props);
        this.initListener();

        this.state = {
            isShownExpSessionModal: false,
        };
    }

    public componentDidMount() {
        this.props.fetchConfigs();
        this.props.userFetch();
        this.initInterval();
        this.check();
    }


    public componentDidUpdate(prevProps: LayoutProps) {

        const { customization, isLoggedIn, history, userLoading } = this.props;

        if (!isLoggedIn && prevProps.isLoggedIn && !userLoading) {
            this.props.walletsReset();
            if (!history.location.pathname.includes('/trading')) {
                history.push('/trading/');
            }
        }

        if (customization && customization !== prevProps.customization) {
            this.handleApplyCustomization(customization);
        }
    }

    public componentWillUnmount() {
        for (const type of LayoutComponent.eventsListen) {
            document.body.removeEventListener(type, this.reset);
        }
        clearInterval(this.timer);
        clearInterval(this.walletsFetchInterval);
    }

    public translate = (key: string) => this.props.intl.formatMessage({ id: key });

    public render() {
        const {
            colorTheme,
            isLoggedIn,
            isMobileDevice,
            userLoading,
            location,
            configsLoading,
            platformAccessStatus,
        } = this.props;
        const { isShownExpSessionModal } = this.state;
        const tradingCls = location.pathname.includes('/trading') ? 'trading-layout' : '';
        toggleColorTheme(colorTheme);

        if (configsLoading && !platformAccessStatus.length) {
            return renderLoader();
        }

        if (isMobileDevice /* && isMobile */) {
            return (
                <div className={'container-fluid pg-layout pg-layout--mobile'}>
                    <Switch>
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signin" component={SignInMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signup" component={SignUpMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/forgot_password" component={ForgotPasswordMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/password_reset" component={ChangeForgottenPasswordMobileScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/confirmation" component={VerificationScreen} />
                        <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/email-verification" component={EmailVerificationMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:currency/history" component={SelectedWalletMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:currency/deposit" component={WalletDeposit} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/:currency/withdraw" component={WalletWithdraw} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/confirm" component={ConfirmMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets" component={WalletsMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/account-activity" component={ProfileAccountActivityMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/api-keys" component={ProfileApiKeysMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/language" component={ProfileLanguageMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/2fa" component={ProfileAuthMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/change-password" component={ProfileChangePasswordMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/verification" component={ProfileVerificationMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile/theme" component={ProfileThemeMobileScreen} />
                        <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile" component={ProfileMobileScreen} />
                        <Route exact={false} path="/trading/:market?" component={TradingScreenMobile} />
                        <Route exact={true} path="/" component={LandingScreenMobile} />
                        <Route path="/ieo" exact component={IEOListMobileScreen} />
                        <Route path="/ieo/detail/:ieoID" exact component={IEODetailMobileScreen} />
                        <Route path="/trading-competition" exact component={TradingCompetionListMobileScreen} />
                        <Route path="/trading-competition/:competition_id" exact component={TradingCompetitionDetailMobileScreen} />
                        <Route path="**"><Redirect to="/trading/" /></Route>
                    </Switch>
                    {isLoggedIn && <WalletsFetch />}
                    {isShownExpSessionModal && this.handleRenderExpiredSessionModal()}
                </div>
            );
        }

        return (
            <div className={`container-fluid pg-layout ${tradingCls}`}>
                <Switch>
                    <Route exact={true} path="/magic-link" component={MagicLink} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/login" component={LogInScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/register" component={RegisterScreen} />
                    {/* <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signin" component={SignInScreen} /> */}
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/confirmation" component={VerificationScreen} />
                    {/* <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/signup" component={SignUpScreen} /> */}
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/forgot_password" component={ForgotPasswordScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/accounts/password_reset" component={ChangeForgottenPasswordScreen} />
                    <PublicRoute loading={userLoading} isLogged={isLoggedIn} path="/email-verification" component={EmailVerificationScreen} />
                    <Route path="/404" component={RestrictedScreen} />
                    <Route path="/500" component={MaintenanceScreen} />
                    <Route exact={false} path="/trading/:market?" component={TradingScreen} />
                    {/* <Route exact={false} path="/test-home" component={HomePageScreen} /> */}
                    <Route exact={true} path="/" component={HomePageScreen} />
                    <Route exact={false} path="/fee" component={FeeScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/orders" component={OrdersTabScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/history" component={HistoryScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/confirm" component={ConfirmScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/profile" component={ProfileScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/security/2fa" component={ProfileTwoFactorAuthScreen} />
                    <Route path="/airdrop" exact component={AirdropList} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/airdrop/detail/:airdropID" component={AirdropDetail} />
                    <Route path="/ieo" exact component={SaleListScreen} />
                    <Route path="/ieo/detail/:ieoID" exact component={SaleDetailScreen} />
                    <Route path="/trading-competition" exact component={TradingCompetionListScreen} />
                    <Route path="/trading-competition/:competition_id" exact component={TradingCompetitionDetailScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets" exact component={WalletListScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/deposit/:currency_id" exact component={DepositScreen} />
                    <PrivateRoute loading={userLoading} isLogged={isLoggedIn} path="/wallets/withdraw/:currency_id" exact component={WithdrawScreen} />
                    <Route path="**"><Redirect to="/trading/" /></Route>
                </Switch>
                {isLoggedIn && <WalletsFetch />}
                {isShownExpSessionModal && this.handleRenderExpiredSessionModal()}
            </div>
        );
    }

    private getLastAction = () => {
        if (localStorage.getItem(STORE_KEY) !== null) {
            return parseInt(localStorage.getItem(STORE_KEY) || '0', 10);
        }

        return 0;
    };

    private setLastAction = (lastAction: number) => {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    };

    private initListener = () => {
        this.reset();
        for (const type of LayoutComponent.eventsListen) {
            document.body.addEventListener(type, this.reset);
        }
    };

    private reset = () => {
        this.setLastAction(Date.now());
    };

    private initInterval = () => {
        this.timer = setInterval(() => {
            this.check();
        }, parseFloat(sessionCheckInterval()));
    };

    private check = () => {
        const { user } = this.props;
        const now = Date.now();
        const timeleft = this.getLastAction() + parseFloat(minutesUntilAutoLogout()) * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout && user.email) {
            if (user.state === 'active') {
                this.handleChangeExpSessionModalState();
            }

            this.props.logout();
        }
    };

    private handleSubmitExpSessionModal = () => {
        const { history } = this.props;
        this.handleChangeExpSessionModalState();
        history.push('/signin');
    };

    private handleRenderExpiredSessionModal = () => (
        <ExpiredSessionModal
            title={this.translate('page.modal.expired.title')}
            buttonLabel={this.translate('page.modal.expired.submit')}
            handleChangeExpSessionModalState={this.handleChangeExpSessionModalState}
            handleSubmitExpSessionModal={this.handleSubmitExpSessionModal}
        />
    );

    private handleChangeExpSessionModalState = () => {
        this.setState({
            isShownExpSessionModal: !this.state.isShownExpSessionModal,
        });
    };

    private handleApplyCustomization = (customization: CustomizationDataInterface) => {
        const rootElement = document.documentElement;
        const parsedSettings = customization && customization.settings ? JSON.parse(customization.settings) : null;

        if (rootElement && parsedSettings && parsedSettings.theme_colors) {
            parsedSettings.theme_colors.reduce((result, item) => {
                const newItemColor = item.value;

                if (newItemColor) {
                    rootElement.style.setProperty(item.key, item.value);
                }

                return result;
            }, {});

            this.props.toggleChartRebuild();
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    configsLoading: selectConfigsLoading(state),
    configsSuccess: selectConfigsSuccess(state),
    colorTheme: selectCurrentColorTheme(state),
    currentMarket: selectCurrentMarket(state),
    customization: selectCustomizationData(state),
    user: selectUserInfo(state),
    isLoggedIn: selectUserLoggedIn(state),
    isMobileDevice: selectMobileDeviceState(state),
    userLoading: selectUserFetching(state),
    platformAccessStatus: selectPlatformAccessStatus(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchConfigs: () => dispatch(configsFetch()),
    fetchCustomization: () => dispatch(customizationFetch()),
    logout: () => dispatch(logoutFetch()),
    toggleChartRebuild: () => dispatch(toggleChartRebuild()),
    userFetch: () => dispatch(userFetch()),
    walletsReset: () => dispatch(walletsReset()),
});

export const Layout = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(LayoutComponent) as any;
