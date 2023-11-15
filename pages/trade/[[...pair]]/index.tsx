import React, { Component } from "react";
import Header, { NavbarSize, NavbarType } from "../../../components/header";
import BuySell from "../../../components/trade/buysell";
import Chart from "../../../components/trade/chart";
import OrderBook from "../../../components/trade/orderbook";
import PairMenu from "../../../components/trade/pair-menu";
import PairTicker from "../../../components/trade/pair-ticker";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../../../styles/trade.module.css';
import MyOrders from "../../../components/trade/myorders";
import Image from 'next/image';
import { PairsManager } from "../../../models/market";
import MarketHistory from "../../../components/trade/market-history";
import withRouter from "next/dist/client/with-router";
import { Router } from "next/dist/client/router";
import { getReturnQuery, randomNumbers, sleep } from "../../../helpers/common";
import { store } from "../../../redux/Store";
import { connect } from "react-redux";
import { NextSeo } from "next-seo";
import { Page_titles } from "../../../models/page_titles";
import { PairI } from "../../../helpers/interfaces";
import { Dispatch } from "@reduxjs/toolkit";
import withSession from "../../../components/auth/withsession";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

declare var window: any;
declare var document: any;

interface Props {
    router: Router;
    mainPairId: number;
    pairs: { [id: number]: PairI };
    dispatch: Dispatch,
    session: Session,
    isSessionExist: boolean,

}

interface State {
    marketStats: any;
    chartStatus: boolean;
    rate: number;
    isTradeTablet: boolean;
    isTradeMobile: boolean;

}

class TradePage extends Component<Props, State> {
    private refreshTime: any;
    private _isMounted = false;
    
    constructor(props: Props) {
        super(props);

        this.state = {
            marketStats: [],
            chartStatus: true,
            rate: 0,
            isTradeTablet: false,
            isTradeMobile: false
        };

        // this.initialPair();
    }


    initialPair = async () => {
        // if (typeof window === 'undefined'){
        //     await sleep(10);
        //     this.initialPair();
        //     return;
        // }
        const url = window.location.href;

        if (url.indexOf('/trade') > -1) {
            if (url.split('/')[url.split('/').length - 1] === 'trade') {
                // initialState.selectedPair = 1

                store.dispatch({ type: 'CHANGE_PAIR', payload: (this.props.mainPairId ? this.props.mainPairId : 1) });
            } else {

                const pairName = url.split('/')[url.split('/').length - 1];
                let pairMatch = false;
                // if (pairName?.length > 0) {
                const pName = String(pairName).toLowerCase().replace('_', '/')
                PairsManager.getInstance().getPairs().forEach(pair => {
                    if (pair.id !== 0 && pair.name?.toLowerCase() === pName) {
                        pairMatch = true;
                        const id = pair.id === undefined ? 1 : pair.id;
                        store.dispatch({ type: 'CHANGE_PAIR', payload: id });

                        // store.dispatch('pair')
                        // store.dispatch({ type: 'CHANGE_PAIR', payload: pair.id });

                    }
                })
                if (!pairMatch) {

                    store.dispatch({ type: 'CHANGE_PAIR', payload: this.props.mainPairId ? this.props.mainPairId : 1 });
                    // const pair = PairsManager.getInstance().getPairById(1)
                    // this.props.router.push({
                    //     pathname: '/trade/' + pair.name?.replace('/', '_'),
                    //     // query: { sortBy: 'price' }
                    // },
                    //     undefined, { shallow: true }
                    // )
                    // initialState.selectedPair = 1
                }
            }
        }
    }
    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
        // if (this.props.pairs !== nextProps.pairs) {
        //     return true;
        // } else {
        //     return false;
        // }
        return true;
    }
    // getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
    //     console.log('new props', prevProps,this.props );

    //     return false;
    // }
    checkRouterReady = async () => {

        if (this.props.router.isReady && this.props.pairs[this.props.mainPairId]?.Status) {

            const pair = PairsManager.getInstance().getPairs().find(p => p.id === this.props.mainPairId && p.Status);
            if (pair !== undefined) {
                this.props.router.push({
                    pathname: '/trade/' + pair?.name?.replace('/', '_'),
                    // query: { sortBy: 'price' }
                },
                    undefined, { shallow: true }
                )
            }
        } else {
            await sleep(50);
            this.checkRouterReady();
        }
    }


    initPairs = () => {
        PairsManager.getInstance().initPairs();
    }



    componentDidMount() {
        console.log('did mount called');
        this.initialPair();
        this.checkRouterReady();
        // pair managment
        this.setPairsAll();
        // end pair managment

        this._isMounted = true;

        if (this._isMounted) {
            
            this.initPairs();
            const dt = [{ name: 'BTC / TRY', rate: 319.283, trend: 2.81, trendup: false, time: '02:17' },
            { name: 'ETH / TRY', rate: 800.475, trend: 2.81, trendup: true, time: '02:17' },
            { name: 'AVAX / TRY', rate: 257.1, trend: 2.81, trendup: false, time: '02:17' },
            { name: 'XRP / TRY', rate: 0.8, trend: 2.81, trendup: true, time: '02:17' }
            ]
            this.setState({ marketStats: dt })

            this.screenSize();
            window.addEventListener('resize', this.screenSize);

            this.applyChangeInZoom()
            
            window.addEventListener('resize', this.applyChangeInZoom);
        }
        store.dispatch({ type: 'ISLOGGED_IN', payload: this.props.isSessionExist });
    }


    screenSize = () => {
        this.setState({isTradeTablet:  window.innerWidth < 1200});
        this.setState({isTradeMobile:  window.innerWidth < 768});
    }


    componentWillUnmount() {
        this._isMounted = false;

        document.getElementsByTagName('html')[0].style = null;

        window.removeEventListener('resize', this.screenSize);
        window.removeEventListener('resize', this.applyChangeInZoom);

    }

    applyChangeInZoom = async (isZoom = true) => {

        window['zoomUIBy'] = (window.innerHeight <= 800 && window.innerWidth >= 1200) ? 0.8 : 1;

        const htmlEle = document.getElementsByTagName('html')[0];
        htmlEle.style.transform = window['zoomUIBy'] === 1 ? null : 'scale(' + window['zoomUIBy'] + ')';
        htmlEle.style.width = window['zoomUIBy'] === 1 ? null : window.innerWidth / window['zoomUIBy'] + 'px';
        htmlEle.style.height = window['zoomUIBy'] === 1 ? null : window.innerHeight * (htmlEle.offsetHeight / htmlEle.getBoundingClientRect().height) + 'px';
    }

    toggleChart = () => {
        this.setState(prevState => ({
            chartStatus: !prevState.chartStatus
        }))
    }

    mobileTabs = () => {

    }

    pickRate = (rate: number) => {
        // this.childRef.current?.picRate(rate);
        this.setState({ rate: rate })
        // this.childRef.
    }
    reFreshPairs = async () => {
        // await sleep(500);
        console.log('pair refresh calls');
        this.props.dispatch({
            type: 'PAIRS_SET_REFRESH',
            payload: '',
        })
        // console.log('refresh called')

    }
    async setPairsAll() {
        // await sleep(1000);
        // this.setPairsAll();

        if (Object.keys(this.props.pairs).length === 0) {
            store.dispatch({
                type: 'PAIRS_SET_ALL',
                payload: PairsManager.getInstance().pairs,
            })
        }
        clearInterval(this.refreshTime);
        // this.refreshTime = setInterval(() => {
        //     console.log('session data now', this.props.session);
        //     // this.applyChangepair();
        //     // this.reFreshPairs();
        // }, 1000);

    }
    async applyChangepair() {
        // await sleep(300);
        // pairs = this.props.pairs;
        let keys: string[] = Object.keys(this.props.pairs);
        for (let key of keys) {
            let pair = { ...this.props.pairs[Number(key)] }
            pair.rate = randomNumbers(pair?.rate!, (pair?.rate! + 10));
            pair.rateUsd = pair.rate / 1000;

            pair.volume = randomNumbers(10, 1000);
            pair.change24hour = {
                value: randomNumbers(1, 10),
                isPositive: randomNumbers(1, 0) ? true : false,
            }

            // setPair(this.pairs[Number(key)]);
            this.props.dispatch({
                type: 'PAIRS_SET',
                payload: { ...pair }
            });
        }
        // console.log('store now',store);
    }
    render() {
        // const { data: session, status } = this.props.session
        const mainPair = this.props.pairs[this.props.mainPairId];
        console.log('trade page render called', mainPair?.rate)

        return (
            <React.Fragment>
                <NextSeo
                    title={
                        (mainPair?.rate ? (((mainPair?.rate) + ' | ' + (mainPair?.name) + ' | ' + Page_titles.trade?.title)) : Page_titles.trade?.title)}
                    description={Page_titles.trade.description}
                />
                <Header isTrade={true} isSessionExist={this.props.isSessionExist} navbarSize={NavbarSize.sm} contClassName='max-w-full' logoText={false} searchEnabled={false} />
                <div className="bg-dark py-[8px] md:px-5 px-4">
                    {/* <div className="flex">
                        <button type="button" onClick={this.mobileTabs} className="flex-1 py-2 bg-success text-white text-lg uppercase">Market</button>
                        <button type="button" onClick={this.mobileTabs} className="flex-1 text-white text-lg uppercase">Trade</button>
                        <button type="button" onClick={this.mobileTabs} className="flex-1 text-white text-lg uppercase">My Orders</button>
                    </div> */}
                    <div className={styles.tradepanel}>
                        <div className={styles.tradepanel_left}>
                            <div className={cx("flex rounded-[3px] bg-16182f border border-solid border-1e2136 py-[8.5px] pr-[10px] lg:pl-[15px] pl-[10px]")}>
                                <PairMenu mainPairId={this.props.mainPairId} pairs={this.props.pairs} pairSelectorV2={false} />
                                <PairTicker mainPair={mainPair} />
                            </div>
                            <div className={cx(styles.chart_panel, 'chart_panel')} style={{ display: this.state.chartStatus ? 'block' : 'none' }}>
                                <Chart />
                            </div>
                            {!this.state.isTradeTablet && <div className={cx(styles.myorder_panel)}>
                                <MyOrders chartStatus={this.state.chartStatus} toggleChart={this.toggleChart} />
                            </div>} 
                        </div>
                        <div className={styles.tradepanel_right}>
                            <div className={cx(styles.subpanel, styles.orderbook_panel)}>
                                <Tabs selectedTabClassName={styles.omtab_selected}>
                                    <TabList className={styles.omtab_list}>
                                        <Tab className={styles.omtab}>
                                            <span className={styles.omtab_icon}>
                                                <Image src="/assets/images/icons/cshape.png" alt="Cshape" width={16} height={16} priority />
                                            </span>
                                            Market Orders</Tab>
                                        <Tab className={styles.omtab}>Market History</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <OrderBook key={String(this.state.isTradeTablet)} isTradeTablet={this.state.isTradeTablet} pickrt={this.pickRate} />
                                    </TabPanel>
                                    <TabPanel>
                                        <MarketHistory />
                                    </TabPanel>
                                </Tabs>
                            </div>
                            <div className={cx(styles.subpanel, styles.buysell_panel, 'buysell_panel')}>
                                <BuySell key={String(mainPair?.id)} mainPair={mainPair} ratep={this.state.rate} />
                            </div>
                        </div>
                    </div>
                    {(this.state.isTradeTablet && false) && <div className={cx(styles.myorder_panel)}>
                        <MyOrders chartStatus={this.state.chartStatus} toggleChart={this.toggleChart} />
                    </div>} 
                </div>
                
                {/* <div className={styles.tradefooter}>
                    
                    <div className={styles.market_stats}>
                        <div className={styles.mstat_title}>5m Surge:</div>
                        {this.state.marketStats.map((item: any) => (
                            <div key={item.name} className={styles.mstat_item}>
                                <span>{item.name}</span>
                                <span>{item.rate}</span>
                                <span className={item.trendup ? "text-success" : "text-danger"}>- % {item.trend}</span>
                                <span>{item.time}</span>
                            </div>
                        ))}
                    </div>
                    <div className={styles.tcon_stats}>
                        <div className={styles.tcon_signal}>
                            <Image src="/assets/images/icons/signal.png" alt="Ekonobi Logo" width={17} height={17} priority />
                            282 ms
                        </div>
                        <div className={styles.tcon_date}>02:17:58 (UTC +3)</div>
                        <button type="button" className={styles.tcon_btn}>
                            <Image src="/assets/images/icons/arrow-up.png" alt="Ekonobi Logo" width={18} height={10} priority />
                        </button>
                    </div>
                </div> */}
                <style>
                    {
                        `
                        html {
                            transform-origin: top left;
                            background-color: #101123;
                        }
                        body{
                            background-color: #101123;
                        }

                        @media screen and (min-width:1200px){
                            html {
                                overflow: hidden;
                            }
                        }
                     `
                    }
                </style>
            </React.Fragment>
        );
    }

}
export async function getServerSideProps(context: any) {
    const session = await getSession(context)
    // 
    // if (context.resolvedUrl === '/trade') {
    //     return {
    //         redirect: {
    //             source: '/trade',
    //             destination: '/trade/BTC_TRY',
    //             permanent: false,

    //         }
    //     }
    // }
    // console.log('parth props', context);
    const isSessionExist = session !== null;
    return {
        props: { isSessionExist }
    }
}
const mapStateToProps = (state: any) => {
    return {
        mainPairId: state.pairReducer.selectedPair,
        pairs: state.pairReducer.pairs,
        // walletlist: state.userDataReducer.wallet.wallets.filter((obj: any) => obj.currency.status === 1 && obj?.currency?.currencyType === 0),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // filterassets: (searchVal: any) => dispatch(filterwallet(searchVal)),
        // fetchWallet: (wallets: any) => dispatch(fetchWallet(wallets))
    }
}
export default (connect(mapStateToProps, null)(withRouter(withSession(TradePage))));
// export default TradePage
// export default withRouter(TradePage);


