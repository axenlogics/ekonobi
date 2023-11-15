import React, { Component } from "react";
import styles from './style.module.css';
import Image from 'next/image';
import cx from "classnames";
import { connect } from "react-redux";
import { PairsManager } from "../../../models/market";
import { PairI } from "../../../helpers/interfaces";

interface Props {
    mainPair: PairI;
}

interface State {
  
}

class PairTicker extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
        
        this.state = {
            
        };
    }

    
    
    componentDidMount() {
    }

    render() {
        const mainPair = this.props.mainPair;
        return (
            <React.Fragment>
                <div className='md:flex hidden items-center flex-1 lg:ml-10 ml-5'>
                    <div className='flex-1'>
                        <div className='text-mute text-[9px] relative z-10 px-[3px]'>Twitter Sentiment</div>
                        <div className='text-8d90b0 text-xs mt-1.5 px-[3px]'>{mainPair?.twitterSentiment}</div>
                    </div>
                    <div className='flex-1 relative'>
                        <div className='text-mute text-[9px] relative z-10 px-[3px]'>24h Low
                            <div className='absolute left-0 right-0 top-0 bottom-0 bg-232842 -z-10'>
                                <div className='absolute top-0 right-0 bottom-0 bg-success' style={{width: '80%'}}>
                                    
                                        <Image className='absolute top-full mt-1 left-[-3px]' src="/assets/images/icons/caret-down-red.webp"  alt="Ekonobi Logo" width={9} height={7} />
                                    
                                    
                                        <Image className="absolute top-full mt-1 right-[-3px]"  src="/assets/images/icons/caret-down-grey.webp"  alt="Ekonobi Logo" width={9} height={7} />
                                    
                                </div>
                            </div>
                        </div>
                        <div className='text-8d90b0 text-xs mt-1.5 px-[3px]'>{mainPair?.rate} {mainPair?.baseCurrency?.symbol} </div>
                    </div>
                    <div className='flex-1 text-right'>
                        
                        <div className='text-mute text-[9px] relative z-10 px-[3px]'>24h High
                            <div className='absolute left-0 right-0 top-0 bottom-0 bg-232842 -z-10'>
                                <div className='absolute top-0 left-0 bottom-0 bg-[#cc3a50]' style={{width: '60%'}}>
                                    
                                        <Image  className='absolute top-full mt-1 left-[-3px]' src="/assets/images/icons/caret-down-red.webp"  alt="Ekonobi Logo" width={9} height={7} />
                                    
                                    
                                        <Image className="absolute top-full mt-1 right-[-3px]"  src="/assets/images/icons/caret-down-grey.webp"  alt="Ekonobi Logo" width={9} height={7} />
                                    
                                </div>
                            </div>
                        </div>
                        <div className='text-8d90b0 text-xs mt-1.5 px-[3px]'>{mainPair?.rate} {mainPair?.baseCurrency?.symbol} </div>
                    </div>
                    <div className='flex-1 text-right'>
                        <div className='text-mute text-[9px] relative z-10 px-[3px]'>24h Volume {mainPair?.marketCurrency?.symbol}/{mainPair?.baseCurrency?.symbol}</div>
                        <div className='text-8d90b0 text-xs mt-1.5 px-[3px]'>{mainPair?.volumeMarketCurrency} / {mainPair?.volume} </div>
                    </div>
                    <div className={styles.ticker_action}>
                        <div className={styles.ticker_btn}>
                            <Image  src="/assets/images/icons/grid.png"  alt="Ekonobi Logo" width={20} height={20} />
                        </div>
                        <div className={styles.ticker_btn}>
                            <Image  src="/assets/images/icons/arrow-down-grey.png"  alt="Ekonobi Logo" width={20} height={20} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
    
// export default PairTicker
const mapStateToProps = (state: any) => {
    return {
        mainPairId: state.pairReducer.selectedPair,
        // walletlist: state.userDataReducer.wallet.wallets.filter((obj: any) => obj.currency.status === 1 && obj?.currency?.currencyType === 0),
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // filterassets: (searchVal: any) => dispatch(filterwallet(searchVal)),
        // fetchWallet: (wallets: any) => dispatch(fetchWallet(wallets))
    }
}
export default (PairTicker)

// export default connect(mapStateToProps, mapDispatchToProps)(PairTicker)