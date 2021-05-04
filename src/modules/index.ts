import { combineReducers } from 'redux';
import { all, call } from 'redux-saga/effects';
import { AirdropState, rootAirdropSaga } from './airdrops/airdrop';
import { ClaimState, rootClaimSaga } from './airdrops/claim';
import { ETHFeeWithdrawState, rootETHFeeWithdrawSaga } from './eth-withdraw/withdraw';
import { airdropsReducer, ethFeesReducer, infoReducer, publicReducer, saleReducer, tradingCompetitionsReducer, userReducer, eventsReducer } from './app';
import { ETHFeeState, rootETHFeeSaga } from './eth-withdraw/fee';
import { AlertState, rootHandleAlertSaga } from './public/alert';
import { BlocklistAccessState, rootBlocklistAccessSaga } from './public/blocklistAccess';
import { ConfigsState, rootConfigsSaga } from './public/configs';
import { CurrenciesState, rootCurrenciesSaga } from './public/currencies';
import { CustomizationState, rootCustomizationSaga } from './public/customization';
import { ColorThemeState } from './public/globalSettings';
import { GridLayoutState } from './public/gridLayout';
import { LanguageState } from './public/i18n';
import { KlineState, rootKlineFetchSaga } from './public/kline';
import { MarketsState, rootMarketsSaga } from './public/markets';
import { MemberLevelsState, rootMemberLevelsSaga } from './public/memberLevels';
import {
    DepthIncrementState,
    DepthState,
    OrderBookState,
    rootOrderBookSaga,
} from './public/orderBook';
import { RangerState } from './public/ranger/reducer';
import { RecentTradesState, rootRecentTradesSaga } from './public/recentTrades';
import { ApiKeysState } from './user/apiKeys';
import { rootApiKeysSaga } from './user/apiKeys/sagas';
import { AuthState, rootAuthSaga } from './user/auth';
import { BeneficiariesState, rootBeneficiariesSaga } from './user/beneficiaries';
import { GeetestCaptchaState, rootGeetestCaptchaSaga } from './user/captcha';
import { CustomizationUpdateState, rootCustomizationUpdateSaga } from './user/customization';
import { EmailVerificationState, rootEmailVerificationSaga } from './user/emailVerification';
import { HistoryState, rootHistorySaga } from './user/history';
import { AddressesState, rootSendAddressesSaga } from './user/kyc/addresses';
import { DocumentsState, rootSendDocumentsSaga } from './user/kyc/documents';
import { IdentityState, rootSendIdentitySaga } from './user/kyc/identity';
import { LabelState, rootLabelSaga } from './user/kyc/label';
import { PhoneState, rootSendCodeSaga } from './user/kyc/phone';
import { NewHistoryState, rootNewHistorySaga } from './user/newHistory';
import { OpenOrdersState, rootOpenOrdersSaga } from './user/openOrders';
import { OrdersState, rootOrdersSaga } from './user/orders';
import { OrdersHistoryState, rootOrdersHistorySaga } from './user/ordersHistory';
import { PasswordState, rootPasswordSaga } from './user/password';
import { ProfileState, rootProfileSaga } from './user/profile';
import { rootUserActivitySaga, UserActivityState } from './user/userActivity';
import { ChildCurrenciesState, rootWalletsSaga, WalletsState } from './user/wallets';
import { rootWithdrawLimitSaga, WithdrawLimitState } from './user/withdrawLimit';
import { SaleListState, rootSaleListSaga } from './sale/sale-list';
import { SaleItemState, rootSaleItemSaga } from './sale/sale-item';
import { BuyState, rootBuySaga, TotalBuyersState } from './sale/buy';
import { PriceState, rootPriceSaga } from './sale/price';
import { TradingRankingsState, rootRankingsSaga } from './trading_competitions/rankings';
import { CompetionListState, rootCompetionsListSaga } from './trading_competitions/competitions';
import { CompetitionItemState, rootcompetitionItemSaga } from './trading_competitions/competition_item';
import { EventsState, rootEventSaga } from './info/events';
import {LunarsState,rootLunarSaga} from './events/lunar';

export * from './public/markets';
export * from './public/orderBook';
export * from './public/globalSettings';
export * from './public/configs';
export * from './public/currencies';
export * from './public/customization';
export * from './public/i18n';
export * from './public/kline';
export * from './public/alert';
export * from './user/apiKeys';
export * from './user/auth';
export * from './user/beneficiaries';
export * from './user/captcha';
export * from './user/customization';
export * from './user/wallets';
export * from './user/profile';
export * from './user/openOrders';
export * from './user/orders';
export * from './user/ordersHistory';
export * from './user/password';
export * from './user/userActivity';
export * from './user/history';
export * from './user/newHistory';
export * from './user/kyc';
export * from './user/emailVerification';
export * from './user/withdrawLimit';
export * from './public/memberLevels';
export * from './public/blocklistAccess';
export * from './airdrops/airdrop';
export * from './airdrops/claim';
export * from './eth-withdraw/fee';
export * from './eth-withdraw/withdraw';
export * from './sale/sale-list';
export * from './sale/sale-item';
export * from './sale/buy';
export * from './sale/price';
export * from './trading_competitions/competitions';
export * from './trading_competitions/competition_item';
export * from './trading_competitions/rankings';
export * from './info/events';
export * from './events/lunar';

export interface RootState {
    airdrops: {
        airdrops: AirdropState;
        claims: ClaimState
    };
    sale: {
        saleList: SaleListState,
        saleItem: SaleItemState,
        buy: BuyState,
        price: PriceState,
        totalBuyers: TotalBuyersState
    };
    trading_competitions: {
        competitions: CompetionListState,
        competition_item: CompetitionItemState,
        rankings: TradingRankingsState
    };
    ethFee: {
        ethFee: ETHFeeState;
        withdraw: ETHFeeWithdrawState;
    };
    info: {
        events: EventsState
    };

    public: {
        alerts: AlertState;
        blocklistAccess: BlocklistAccessState;
        colorTheme: ColorThemeState;
        configs: ConfigsState;
        currencies: CurrenciesState;
        customization: CustomizationState;
        rgl: GridLayoutState;
        i18n: LanguageState;
        kline: KlineState;
        markets: MarketsState;
        memberLevels: MemberLevelsState;
        orderBook: OrderBookState;
        ranger: RangerState;
        recentTrades: RecentTradesState;
        depth: DepthState;
        incrementDepth: DepthIncrementState;
    };
    user: {
        apiKeys: ApiKeysState;
        auth: AuthState;
        beneficiaries: BeneficiariesState;
        captchaKeys: GeetestCaptchaState;
        customizationUpdate: CustomizationUpdateState;
        sendEmailVerification: EmailVerificationState;
        history: HistoryState;
        documents: DocumentsState;
        addresses: AddressesState;
        identity: IdentityState;
        label: LabelState;
        phone: PhoneState;
        newHistory: NewHistoryState;
        openOrders: OpenOrdersState;
        orders: OrdersState;
        ordersHistory: OrdersHistoryState;
        password: PasswordState;
        profile: ProfileState;
        userActivity: UserActivityState;
        wallets: WalletsState;
        child_currencies: ChildCurrenciesState;
        all_child_currencies: ChildCurrenciesState;
        withdrawLimit: WithdrawLimitState;
    };
    events : {
        lunar : LunarsState,
    };
}

export const rootReducer = combineReducers({
    public: publicReducer,
    user: userReducer,
    airdrops: airdropsReducer,
    ethFee: ethFeesReducer,
    sale: saleReducer,
    trading_competitions: tradingCompetitionsReducer,
    info: infoReducer,
    events : eventsReducer,
});

export function* rootSaga() {
    yield all([
        call(rootApiKeysSaga),
        call(rootAuthSaga),
        call(rootBeneficiariesSaga),
        call(rootBlocklistAccessSaga),
        call(rootConfigsSaga),
        call(rootCurrenciesSaga),
        call(rootCustomizationSaga),
        call(rootCustomizationUpdateSaga),
        call(rootEmailVerificationSaga),
        call(rootGeetestCaptchaSaga),
        call(rootHandleAlertSaga),
        call(rootHistorySaga),
        call(rootKlineFetchSaga),
        call(rootLabelSaga),
        call(rootMarketsSaga),
        call(rootMemberLevelsSaga),
        call(rootNewHistorySaga),
        call(rootOpenOrdersSaga),
        call(rootOrderBookSaga),
        call(rootOrdersHistorySaga),
        call(rootOrdersSaga),
        call(rootPasswordSaga),
        call(rootProfileSaga),
        call(rootRecentTradesSaga),
        call(rootSendCodeSaga),
        call(rootSendAddressesSaga),
        call(rootSendDocumentsSaga),
        call(rootSendIdentitySaga),
        call(rootUserActivitySaga),
        call(rootWalletsSaga),
        call(rootWithdrawLimitSaga),
        call(rootAirdropSaga),
        call(rootClaimSaga),
        call(rootETHFeeSaga),
        call(rootETHFeeWithdrawSaga),
        call(rootSaleListSaga),
        call(rootSaleItemSaga),
        call(rootBuySaga),
        call(rootPriceSaga),
        call(rootCompetionsListSaga),
        call(rootcompetitionItemSaga),
        call(rootRankingsSaga),
        call(rootEventSaga),
        call(rootLunarSaga),
    ]);
}