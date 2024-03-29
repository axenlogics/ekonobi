import React, { Component, useRef } from 'react';
import styles from './style.module.css';
import LimitOrder from './limit-order';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MarketOrder from './market-order';
import StopOrder from './stop-order';
import CocoOrder from './coco-order';
import { connect } from 'react-redux';
import { PairI, WalletI } from '../../../helpers/interfaces';
import { PairsManager, Wallets } from '../../../models/market';

interface Props {
    mainPair: PairI,
    isLoggedIn: boolean,
    wallets: { [id: number]: WalletI }
    ratep?: number,

}

interface State {
}
class BuySell extends Component<Props, State> {
    public childRef: any;

    constructor(props: any) {
        super(props);
        this.childRef = React.createRef();
        this.state = {

        };
    }
    getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>) {
        // 
        if (prevProps.mainPair?.id !== this.props.mainPair?.id) {
            
            this.childRef.current.resetBuySell(this.props.mainPair);
            return true;
        } else if (prevProps.ratep !== this.props.ratep) {
            
            this.childRef.current.pickRate(this.props.ratep);
            return true;
        }
        return false;
    }
    picRate = (rate: number) => {
        
    }
    componentDidUpdate() {

    }
    // componentWillReceiveProps(nextProps) {
    //     // You don't have to do this check first, but it can help prevent an unneeded render
    //     if (nextProps.startTime !== this.state.startTime) {
    //         this.setState({ startTime: nextProps.startTime });
    //     }
    // }
    render() {
        const wallets = Wallets.getInstance().getWallets()
        const mainPair: PairI = this.props.mainPair;
        // const wallets: { [id: number]: WalletI } = Wallets.getInstance().getWallets();
        const mWalelt = wallets[mainPair?.marketCurrency?.id ?? 1];
        const bWalelt = wallets[mainPair?.baseCurrency?.id ?? 2];
        
        return (
            <React.Fragment>
                <div className={styles.fee_stats}>
                    Fee
                    <div className={styles.fee_stat}>Maker: <span>0%</span></div>
                    <div className={styles.fee_stat}>Taker: <span>0%</span></div>
                </div>
                <Tabs selectedTabClassName={styles.bsmtab_selected}>
                    <TabList className={styles.bsmtab_list}>
                        <Tab className={styles.bsmtab}>Limit</Tab>
                        <Tab className={styles.bsmtab}>Market</Tab>
                        <Tab className={styles.bsmtab}>Stop</Tab>
                        <Tab className={styles.bsmtab}>COCO</Tab>
                    </TabList>
                    <TabPanel> <LimitOrder
                        mWallet={mWalelt}
                        bWallet={bWalelt}
                        ref={this.childRef}
                        isLogin={this.props.isLoggedIn}
                        mainPair={mainPair}/> </TabPanel>
                    <TabPanel> <MarketOrder mainPair={mainPair} /> </TabPanel>
                    <TabPanel> <StopOrder mainPair={mainPair} /> </TabPanel>
                    <TabPanel> <CocoOrder mainPair={mainPair} /> </TabPanel>
                </Tabs>
            </React.Fragment>
        );
    }
}

// export default BuySell
const mapStateToProps = (state: any) => {
    return {
        wallets: state.walletReducer.data,
        isLoggedIn: state.authReducer.isLoggedIn,
        // walletlist: state.userDataReducer.wallet.wallets.filter((obj: any) => obj.currency.status === 1 && obj?.currency?.currencyType === 0),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // filterassets: (searchVal: any) => dispatch(filterwallet(searchVal)),
        // fetchWallet: (wallets: any) => dispatch(fetchWallet(wallets))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuySell)
// export default connect(mapStateToProps, mapDispatchToProps)(React.forwardRef((props: Props, ref) => <BuySell
//     innerRef={ref} {...props}
// />));