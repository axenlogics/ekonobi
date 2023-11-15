import React, { Component } from "react";
import Header from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/dashboard.module.css'
import { Button, ButtonLink, ButtonType } from "../components/button";
import Image from 'next/image';
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import { MarketTable } from "../components/market/market-table";
import { TransactionHistory } from "../components/transaction-history";
import Footer from "./footer";
import { UserStats } from "../components/user-stats";
import LineChart from "../components/line-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AccountSetting from "./setting";


interface Props {
  
}

interface State {
    txData:any,
    cryptoAsset:any,
    stableAsset:any,
    tab:any
}

class DashboardPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
        const txhistory=[
            {'status':false,'coin':'TRY','value':'5.783,57000000','date':'09.12.2022 17:14'},
            {'status':true,'coin':'USDT','value':'7.271,05948392','date':'09.12.2022 17:13'},
        ]
        const data=
    [
        {
        'coin':'Avalanche',
        'symbol':'AVAX',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'autoInvest':false}
        },
        {
            'coin':'Bitcoin',
            'symbol':'BTC',
            'totalPrice':'428.166',
            'stotalPrice':'₺ 428.166,34',
            'Available':'418.166,34',
            'sAvailable':'₺ 428.166,34',
            'inOrder':'0,00',
            'sinOrder':'₺ 0,00',
            'OutofSpot':'10.000,00',
            'sOutofSpot':'₺ 0,00',
            'Action':{'BUY':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'autoInvest':false}
            },
        {
        'coin':'Solana',
        'symbol':'SOL',
        'totalPrice':'17.463,46370000',
        'stotalPrice':'₺ 428.166,34',
        'Available':'17.463,46370000',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
        {
        'coin':'DogeCoin',
        'symbol':'DOGE',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
        {
        'coin':'Polkadot',
        'symbol':'DOT',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },,
        {
        'coin':'Polygon',
        'symbol':'MATIC',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
    ]
    const data2=[
        {
        'coin':'Turkish Lira',
        'symbol':'TRY',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':false,'Sell':false,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':false,'autoInvest':false}
        },
        {
        'coin':'Tether',
        'symbol':'USDT',
        'totalPrice':'17.463,46370000',
        'stotalPrice':'₺ 428.166,34',
        'Available':'17.463,46370000',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
        {
        'coin':'Binance USD',
        'symbol':'BUSD',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':false,'Trade':true,'autoInvest':true}
     },
        {
        'coin':'USD Coin',
        'symbol':'USDC',
        'totalPrice':'428.166',
        'stotalPrice':'₺ 428.166,34',
        'Available':'418.166,34',
        'sAvailable':'₺ 428.166,34',
        'inOrder':'0,00',
        'sinOrder':'₺ 0,00',
        'OutofSpot':'10.000,00',
        'sOutofSpot':'₺ 0,00',
        'Action':{'BUY':true,'Sell':true,'Deposit':true,'Withdraw':true,'Transfer':true,'Trade':true,'autoInvest':true}
        },
    ]
    this.state = {
            txData:txhistory,
            cryptoAsset:data,
            stableAsset:data2,
            tab:false
        };
    }
    
    
    
    componentDidMount() {
        
    }
    markZero(val:any){
        let v=val
        let nv=v.split('').reverse();
        let zero=[];
        for(let el of nv){
            if(el!=0){
                break; 
            }
            zero.push(el);
        }
        let vv=val.substring(0,(val.length-zero.length))
        return vv+'<span class="text-a2a2a2">'+zero.join('')+'</span>';
    }
    toggleCoin = (item:any,ctype:any) =>{
        // ctype 0 stable Asset
        // ctype 1 crypto Asset
        if(ctype==0){
            this.setState(prevState => ({
                stableAsset: prevState.stableAsset.map((v:any)=>{
                    if(v.coin==item.coin){
                        return {...v, isVisible: !item.isVisible};
                    }else
                    return {...v, isVisible: false};
                })
            }))
        }else{
            this.setState(prevState => ({
                cryptoAsset: prevState.cryptoAsset.map((v:any)=>{
                    if(v.coin==item.coin){
                        return {...v, isVisible: !item.isVisible};
                    }else
                    return {...v, isVisible: false};
                })
            }))
        }
    }
    render() {
        return (
            <React.Fragment>
                <Header navbarType="light" navbarSize="sm" logoText={true} />
                <div className={'container py-[10px] sm:py-[40px] px-4'}>
                    <Tabs defaultIndex={5}  selectedTabClassName={'!text-171a1e font-medium'}>
        
                        <TabList className={'flex flex-wrap items-center list-none w-full mb-2'}>
                            <Tab className={'pr-5 text-adadaf cursor-pointer text-base'}><div>Overview</div></Tab>
                            <Tab className={'pr-5  text-adadaf cursor-pointer text-base'}><div>Security</div></Tab>
                            <Tab className={'pr-5 text-adadaf cursor-pointer text-base'}><div>Verification</div></Tab>
                            <Tab className={'pr-5 text-adadaf cursor-pointer text-base'}><div>Rewards</div></Tab>
                            <Tab className={'pr-5 text-adadaf cursor-pointer text-base'}><div>Points</div></Tab>
                            <Tab className={'pr-5 text-adadaf cursor-pointer text-base'}><div>Preferences</div></Tab>
                            <Tab className={' text-adadaf cursor-pointer text-base'}><div>API</div></Tab>
                        </TabList>
                        <UserStats/>
                        <TabPanel>
                            <div className={'lg:flex'}>
                                <div className={cx('w-full md:pr-[28px] max-w-[840px] mx-auto lg:mx-0')}>
                                    <div className={'flex my-5 md:my-10 flex-wrap md:flex-auto'}>
                                        <Button className='font-bold text-sm lg:text-base mr-[30px] max-h-10 ml-0 mt-3 md:mt-0' type={ButtonType.primary}>Deposit</Button>
                                        <Button className='font-bold text-sm lg:text-base mr-[30px] max-h-10 mt-3 md:mt-0'  type={ButtonType.default}>Withdrawal</Button>
                                        <Button className='font-bold text-sm lg:text-base mr-[30px] max-h-10 mt-3 md:mt-0' type={ButtonType.default}>Transfer</Button>
                                        <Button className='font-bold text-sm lg:text-base ml-0 max-h-10 mt-3 md:mt-0' type={ButtonType.default}>Convert Low-value Assets to TRY</Button>
                                    </div>
                                    
                                    <Tabs defaultIndex={0}  selectedTabClassName={'!text-171a1e font-bold'}>
                                    <div className={cx('relative','items-center')}>
                                        <div className={cx('md:flex items-center max-w-[528px] w-full')}>
                                        <div className={cx('max-w-[164px] w-full rounded border-solid border-ebece9 border-[1px] left-0 md:absolute','flex','text-xs','font-medium','text-center')}>
                                            <div className={cx('col','text-xs','font-bold m-[4px_5px] p-[3.5px_9.8px] rounded text-white bg-primary')}>TRY</div>
                                            <div className={cx('col','text-xs','m-[4px_5px] p-[3.5px_9.8px] rounded text-b5b6b8')}>USDT</div>
                                            <div className={cx('col','text-xs','m-[4px_5px] p-[3.5px_9.8px] rounded text-b5b6b8')}>BTC</div>
                                        </div>
                                        <TabList className={'flex items-center list-none w-full md:justify-end pt-2 md:pt-0'}>
                                            <Tab className={'pr-5 pl-1 text-adadaf cursor-pointer'}><div>Assets</div></Tab>
                                            <Tab className={'pr-5  text-adadaf cursor-pointer'}><div>Spot</div></Tab>
                                            <Tab className={'pr-5 text-adadaf cursor-pointer'}><div>Auto-Invest</div></Tab>
                                            <Tab className={'pr-5 text-adadaf cursor-pointer'}><div>Reward</div></Tab>
                                            <Tab className={'pr-5 text-adadaf cursor-pointer'}><div><Image src={`/assets/images/icons/eye.svg`} alt={'show'} width={17} height={12} /></div></Tab>
                                            <Tab className={cx('  text-adadaf cursor-pointer hidden md:block absolute right-0')}><div>Asset Pool</div></Tab>
                                        </TabList>
                                        </div>
                                    </div>
                                    <TabPanel>
                                        <div className={'md:h-[285px] md:flex md:shadow-normal'}>
                                            <div className={' relative w-full bg-white rounded-b-[20px] rounded-t-[20px] md:rounded-b-[0px] md:rounded-t-[0px] md:rounded-tl-[30px] md:rounded-bl-[30px] md:max-w-[530px] mt-[10px] flex items-center justify-center h-[285px]'}>
                                                <LineChart/>
                                                <div className="absolute top-5 flex items-center w-full px-5">
                                                    <div className="text-xl sm:text-2xl font-bold flex-1">815.372,22</div>
                                                    <div className="text-base sm:text-lg text-success font-medium flex-1 text-right">+17.284 TRY / % 2,23</div>
                                                </div>
                                            </div>
                                            <div className="text-adadaf cursor-pointer mt-4 block md:hidden">Asset Pool</div>
                                            <div className={'rounded-b-[20px] rounded-t-[20px] md:rounded-b-[0px] md:rounded-t-[0px] mt-2 md:mt-[10px] mx-auto bg-danger h-[285px] md:w-[275px] md:ml-2 flex items-center justify-center flex-1'}>
                                            boxes
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className={'h-[285px] flex shadow-normal'}>
                                            <div className={'w-full max-w-[528px] mt-[10px] bg-2152FA flex items-center justify-center h-[285px]'}>
                                                Chart
                                            </div>
                                            <div className={'mt-[10px] bg-danger h-[285px] flex items-center justify-center flex-1'}>
                                            boxes
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className={'h-[285px] flex shadow-normal'}>
                                            <div className={'w-full max-w-[528px] mt-[10px] bg-2152FA flex items-center justify-center h-[285px]'}>
                                                Chart
                                            </div>
                                            <div className={'mt-[10px] bg-danger h-[285px] flex items-center justify-center flex-1'}>
                                            boxes
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <div className={'h-[285px] flex shadow-normal'}>
                                            <div className={'w-full max-w-[528px] mt-[10px] bg-2152FA flex items-center justify-center h-[285px]'}>
                                                Chart
                                            </div>
                                            <div className={'mt-[10px] bg-danger h-[285px] flex items-center justify-center flex-1'}>
                                            boxes
                                            </div>
                                        </div>
                                    </TabPanel>
                                    </Tabs>
                                    
                                    <div className={'p-[28px_15px_22px_15px] sm:p-[28px_28px_22px_30px] rounded-[20px] shadow-normal bg-white m-[40px_0_40px] md:m-[40px_0_80px]'}>
                                        <Tabs defaultIndex={0}  selectedTabClassName={'!text-171a1e font-bold'}>
                                        <TabList className={'hidden md:flex items-center list-none w-full justify-start'}>
                                            <Tab className={'flex-1'}><div>Assets</div></Tab>
                                            <Tab className={'flex-1 text-right text-a2a2a2 font-medium'} disabled={true}><div>Spot Wallet</div></Tab>
                                            <Tab className={'flex-1 text-right text-a2a2a2 font-medium'} disabled={true}><div>Auto-Invest Wallet</div></Tab>
                                            <Tab className={'flex-1 text-right text-a2a2a2 font-medium '} disabled={true}><div>Reward Wallet</div></Tab>
                                            <Tab className={'flex-1 text-right text-a2a2a2 font-medium'} disabled={true}><div>Total Balance</div></Tab>
                                        </TabList>
                                        <div className={'hidden md:block mt-3 border-solid border-e9eff6 border-b'}></div>
                                        <TabPanel>
                                            <div className={'md:mt-5'}>
                                                <div className={'text-171a1e font-medium'}>Stable Assets</div>
                                                {this.state.stableAsset.map((item:any,i:number) => 
                                                <div key={i} className={'block md:flex items-center mt-2 md:mt-0 p-[15px_0_0]'}>
                                                    <div className={'flex flex-1'}>
                                                        <div className={'pr-2'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt={item.coin}  width={32} height={32}/></div>
                                                        <div>
                                                            <div className={cx('text-171a1e','font-medium')}>{item.symbol}</div>
                                                            <div className={cx('text-a2a2a2','text-xs')}>{item.coin}</div>
                                                        </div>
                                                        <div className="flex-1 text-right"><FontAwesomeIcon onClick={()=>this.toggleCoin(item,0)} icon={item.isVisible==true?faChevronUp:faChevronDown} /></div>
                                                    </div>
                                                    <div className={cx("flex-1 md:block",item.isVisible?'block':'hidden')}>
                                                        <div className="flex items-start md:justify-end">
                                                            <div className={'flex items-center md:hidden text-a2a2a2 text-sm max-w-[140px] w-full sm:min-w-0'}>Spot Wallet <span className="ml-auto">:&nbsp;</span></div>
                                                            <div className="block">
                                                                <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.totalPrice)}}></div>
                                                                <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.stotalPrice}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx("flex-1 md:block",item.isVisible?'block':'hidden')}>
                                                        <div className="flex items-start md:justify-end">
                                                            <div className={'flex items-center md:hidden text-a2a2a2 text-sm max-w-[140px] w-full sm:min-w-0'}>Auto-Invest Wallet <span className="ml-auto">:&nbsp;</span></div>
                                                            <div className="block">
                                                                <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.Available)}}></div>
                                                                <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.sAvailable}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx("flex-1 md:block",item.isVisible?'block':'hidden')}>
                                                        <div className="flex items-start md:justify-end">
                                                            <div className={'flex items-center md:hidden text-a2a2a2 text-sm max-w-[140px] w-full sm:min-w-0'}>Reward Wallet <span className="ml-auto">:&nbsp;</span></div>
                                                            <div className="block">
                                                                <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.inOrder)}} ></div>
                                                                <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.sinOrder}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx("flex-1 md:block",item.isVisible?'block':'hidden')}>
                                                        <div className="flex items-start md:justify-end">
                                                        <div className={'flex items-center md:hidden text-a2a2a2 text-sm max-w-[140px] w-full sm:min-w-0'}>Total Balance <span className="ml-auto">:&nbsp;</span></div>
                                                            <div className="block">
                                                                <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.OutofSpot)}} ></div>
                                                                <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.sOutofSpot}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                            
                                                </div>
                                                )}
                                                <div className={'text-171a1e font-medium pt-5 border-solid border-e9eff6 border-t m-[21px_0_10px]'}>Crypto Assets</div>
                                                {this.state.cryptoAsset.map((item:any,i:number) => 
                                                <div key={i} className={'flex items-center p-[15px_0_0]'}>
                                                    <div className={'flex flex-1'}>
                                                        <div className={'pr-2'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt={item.coin} width={32} height={32}/></div>
                                                        <div>
                                                            <div className={cx('text-171a1e','font-medium','text-181a1e')}>{item.symbol}</div>
                                                            <div className={cx('text-a2a2a2','text-xs')}>{item.coin}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.totalPrice)}}></div>
                                                        <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.stotalPrice}</div>
                                                    </div>
                                                    <div className="flex-1 hidden md:block">
                                                        <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.Available)}}></div>
                                                        <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.sAvailable}</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.inOrder)}} ></div>
                                                        <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.sinOrder}</div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className={cx('text-right font-medium','text-171a1e')} dangerouslySetInnerHTML={{ __html:this.markZero(item.OutofSpot)}} ></div>
                                                        <div className={cx('text-right pt-1text-xs','text-a2a2a2')}>{item.sOutofSpot}</div>
                                                    </div>
                                                </div>
                                                )}
                                                <div className="flex items-center pt-8">
                                                    <div className={'flex-1'}>
                                                        <Checkbox o='true' id="hidesm" label="Hide Small Balances" />
                                                    </div>
                                                    <div className="w-4 h-4 flex items-center flex-1 justify-end">show more <Image className="ml-1" src={`/assets/images/icons/db.svg`} alt={'Show more'}  width={16} height={16}/></div>
                                                </div>
                                            </div>
                                        </TabPanel>
                                        {/* <TabPanel><div className={styles.tcenter}>Coming soon</div></TabPanel>
                                        <TabPanel><div className={styles.tcenter}>Coming soon</div></TabPanel>
                                        <TabPanel><div className={styles.tcenter}>Coming soon</div></TabPanel>
                                        <TabPanel><div className={styles.tcenter}>Coming soon</div></TabPanel> */}
                                        </Tabs>
                                    </div>
                                </div>
                                <div className={cx('md:pl-[30px] mb-10 md:mb-0 md:mt-10 flex-1 max-w-[480px] mx-auto lg:mx-0')}>
                                    <ButtonLink href="#" className={cx('rounded-[20px] sm:rounded-[30px] border-0 bg-blend-normal shadow-normal bg-gradient-alert w-full py-[2px] pl-[28px] pr-[15px] text-base sm:text-lg font-bold text-left flex items-center')} type={ButtonType.primary}>Trade with “0” fee <div className={cx('ml-auto')}><div className="w-[70px] h-[45px] sm:w-20 sm:h-[55px]"><Image src={`/assets/images/icons/bell-icon.svg`} alt={'show'} width={80} height={55} /></div></div></ButtonLink>
                                    <div className={cx('mt-[30px] px-[24px] pt-[27px] pb-[18px] rounded-[20px] bg-white bg-blend-normal shadow-normal')}>
                                        <ul className="list-none mb-[7px]"><div className="flex items-center text-base font-medium">Referral <div className="ml-auto"><Image src={`/assets/images/icons/sample-qr.svg`} alt={'Referral QR'}  width={24} height={24}/></div></div>
                                            <li className={cx('text-a2a2a2 pt-1 text-[11px] flex items-center')}>Registered <span className={cx('text-181a1e font-medium text-xs ml-auto')}>12</span></li>
                                            <li className={'text-a2a2a2 text-[11px] flex items-center'}>Traded <span className={cx('text-181a1e font-medium text-xs ml-auto')}>9</span></li>
                                            <li className={'text-a2a2a2 text-[11px] flex items-center'}>Commission Earn (TRY) <span className={cx('text-181a1e font-medium text-xs ml-auto')}>1.220</span></li>
                                            <li className={'text-a2a2a2 text-[11px] flex items-center'}>Ranking <span className={cx('text-181a1e font-medium text-xs ml-auto')}>#52</span></li>
                                        </ul>
                                        <Button className={cx('fullwidth',' block mt-2 text-xs')} type={ButtonType.primary}>Referans linkini kopyala</Button>
                                    </div>
                                    <div className={cx('w-full mt-10 p-[18px_15px_5px_15px] sm:p-[30px_25px_5px_30px] rounded-[20px] bg-white bg-blend-normal shadow-normal')}>
                                            <div className={cx('flex')}>
                                                <div className={cx('text-171a1e','font-medium','text-base flex-1')}>Identity Verification (KYC)</div>
                                                <div className={cx('flex items-center')} >
                                                    <div className={cx('text-danger','font-bold','text-base')}>Level 1</div>
                                                    <div className={cx('flex')}><span className={'w-[120px] h-4 inline-block ml-[9px] rounded-lg bg-e9eff6 bg-blend-normal shadow-normal'}><span className={'block h-full rounded-lg bg-b3c5ff bg-blend-normal'} style={{width: `50%`}}></span></span></div>
                                                </div>
                                            </div>
                                            <div className={'w-full border-b-[1px] border-solid border-e9eff6 pt-2'}></div>
                                            <div>
                                                <div className={cx('flex','items-center mt-[26px] mb-[8px]')}>
                                                    <div className={cx('text-center border-solid border-[1px] border-e9eff6 rounded-[50px] p-[5px_13.8px] sm:p-[7px_15.8px] mr-[13px]')}><h4 className={cx('text-e9eff6 m-0')}>1</h4></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>20.000 TRY / 0,1 BTC</div>
                                                        <div className={cx('text-xs','text-777e91')}>Daily Withdrawal Limit</div>
                                                    </div>
                                                    <Button className={cx('max-w-[120px] py-[11px] w-full h-full text-xs whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.disable}>Done</Button>
                                                </div>
                                                <div className={cx('flex','py-3 relative')}>
                                                    <div className={cx('absolute left-5 top-0 sm:left-6 h-[20px] border-[1px] border-solid border-e9eff6')}></div>
                                                </div>
                                                <div className={cx('flex','items-center  mb-[21px] mt-[8px]')}>
                                                    <div className={cx('text-center border-solid border-[1px] border-primary rounded-[50px] p-[5px_13.8px] sm:p-[7px_15.8px] mr-[13px]')}><h4 className={cx('text-primary m-0')}>2</h4></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>10.000.000 TRY / 50 BTC</div>
                                                        <div className={cx('text-xs','text-777e91')}>Daily Withdrawal Limit</div>
                                                    </div>
                                                    <Button className={cx('max-w-[120px] max-h-[40px] pt-[5px] w-full h-full text-xs whitespace-normal tracking-normal','text-white','font-medium','text-xs')} type={ButtonType.primary}>Verify <div>in just 2 minutes</div></Button>
                                                </div>
                                            </div>

                                    </div>
                                    <div className={cx('w-full mt-10 p-[18px_15px_5px_15px] sm:p-[30px_25px_5px_30px] rounded-[20px] bg-white bg-blend-normal shadow-normal')}>
                                            <div className={cx('flex')}>
                                                <div className={cx('text-171a1e','font-medium','text-base flex-1')}>Security Level</div>
                                                <div className={cx('flex items-center')} >
                                                    <div className={cx('text-danger','font-bold','text-base')}>Low</div>
                                                    <div className={cx('flex')}><span className={'w-[120px] h-4 inline-block ml-[9px] rounded-lg bg-e9eff6 bg-blend-normal shadow-normal'}><span className={'block h-full rounded-lg bg-b3c5ff bg-blend-normal'} style={{width: `33.34%`}}></span></span></div>
                                                </div>
                                            </div>
                                            <div className={'w-full border-b-[1px] border-solid border-e9eff6 pt-2'}></div>
                                            <div>
                                                <div className={cx('flex','items-center mt-5 sm:mt-[26px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px]"><div className="w-11 h-11 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/google-authentication.svg`} alt={'Google Authentication'}  width={48} height={48}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Google Authentication</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Deactive</span><span className="text-ffc500 font-bold">High Priority</span></div>
                                                    </div>
                                                    <Button className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.primary}>Activate</Button>
                                                </div>
                                                <div className={cx('flex','items-center mt-6 sm:mt-[42px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-11 h-11 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/sms-verification.svg`} alt={'SMS Verification'}  width={48} height={48}/></div><div className="absolute left-[18px] top-[18px] w-9 h-9 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/active-gaurd.svg`} alt={'Active'}  width={48} height={48}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>SMS Verification</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-success pl-1 pr-2">Active</span></div>
                                                    </div>
                                                    <Button className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.disable}>Deactivate</Button>
                                                </div>
                                                <div className={cx('flex','items-center mt-6 sm:mt-[38px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-[32px] h-[25.5px] sm:w-[36px] sm:h-[29.5px]"><Image src={`/assets/images/icons/email-verification.svg`} alt={'Email Verification'}  width={36} height={29.5}/></div><div className="absolute left-[15px] top-[3px] w-9 h-9 sm:w-12 sm:h-12"><Image src={`/assets/images/icons/active-gaurd.svg`} alt={'Active'}  width={48} height={48}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>E-mail Verification</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-success pl-1 pr-2">Active</span></div>
                                                    </div>
                                                    <Button className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.disable}>Deactivate</Button>
                                                </div>
                                                <div className={cx('flex','items-center mt-5 sm:mt-[26px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-7 h-7 sm:w-8 sm:h-8"><Image src={`/assets/images/icons/anti-phishing.svg`} alt={'Anti-Phishing'}  width={32} height={32}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Anti-Phishing</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Deactive</span></div>
                                                    </div>
                                                    <Button className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.primary}>Activate</Button>
                                                </div>
                                                <div className={cx('flex','items-center mt-6 sm:mt-[30px] mb-[8px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-7 h-7 sm:w-8 sm:h-8"><Image src={`/assets/images/icons/lock.svg`} alt={'Password'}  width={32} height={32}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Password</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Weak</span></div>
                                                    </div>
                                                    <Button className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.primary}>Change</Button>
                                                </div>
                                                <div className={cx('flex','items-center mt-6 sm:mt-[30px] mb-[28px]')}>
                                                    <div className="mr-3 sm:mr-[14px] relative"><div className="w-7 h-7 sm:w-8 sm:h-8"><Image src={`/assets/images/icons/whitelist.svg`} alt={'Withdrawal Whitelist'}  width={32} height={32}/></div></div>
                                                    <div className={cx('col')}>
                                                        <div className={cx('text-sm sm:text-base','font-medium','text-181a1e')}>Withdrawal Whitelist</div>
                                                        <div className={cx('text-xs mt-1')}><span className="text-danger pl-1 pr-2">Deactive</span></div>
                                                    </div>
                                                    <Button className={cx('max-w-[100px] sm:max-w-[120px]  leading-5 pt-[6.5px] pb-[7.5px] sm:pt-[9.5px] sm:pb-[10.5px] w-full h-full whitespace-normal tracking-normal bg-e9eff6 text-a2a2a2 font-medium shadow-normal border-0 ')} type={ButtonType.primary}>Activate</Button>
                                                </div>
                                            </div>

                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        <TabPanel></TabPanel>
                        {/* ACCOUNT SETTING TAB */}
                        <TabPanel>
                            <AccountSetting />
                        </TabPanel>
                        {/* ACCOUNT SETTING TAB */}
                        <TabPanel></TabPanel>
                    </Tabs>
                </div>
                    <Footer/>
                
            </React.Fragment>
        );
    }

}


export default DashboardPage


