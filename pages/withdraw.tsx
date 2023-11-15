import React, { Component } from "react";
import Header, { NavbarSize } from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/withdraw.module.css'
import { Button } from "../components/button";
import Image from 'next/image';
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import { MarketTable } from "../components/market/market-table";
import { TransactionHistory } from "../components/transaction-history";
import { CoinSelectorDropdwon } from "../components/coin-selector-dropdown";
import Footer from "./footer";
import { getSession } from "next-auth/react";
import { getReturnQuery } from "../helpers/common";
import { MessageCard } from "../components/message-card";
import { NoteCard, NoteCardHeading, NoteCardItem } from "../components/note-card";

interface Props {
  
}

interface State {
    mudata:any,
    wdnotes:any,
    wdnotes2:any,
}


class WithdrawCryptoPage extends Component<Props, State> {
    public static auth = true;
    constructor(props: Props) {

        super(props);
        const data=
    [
        {
        'coin':'Bitcoin',
        'symbol':'BTC',
        },
        {
        'coin':'Solana',
        'symbol':'SOL',
        },
        {
        'coin':'tether',
        'symbol':'USDT',
        },
        {
        'coin':'Bitcoin',
        'symbol':'BTC',
        },
        {
        'coin':'Solana',
        'symbol':'SOL',
        },
        {
        'coin':'Bitcoin',
        'symbol':'BTC',
        },
    ]
     const wdnotes = [
        `You can only withdraw to bank accounts registered in your name.`,
        `You can withdraw Turkish Lira to Ziraat Bank, Akbank, VakıfBank and Fibabanka 24/7.`,
        `You can withdraw to any bank during bank working hours. EFT transactions made between 9.00 - 16.45 on weekdays are completed on the same day, and withdrawals made on weekends and holidays are completed on the first business day following.`,
        `FAST transaction is supported up to 5.000 Turkish Liras. You can also withdraw to any bank 24/7 if the amount is equal or less than 5000 Turkish Liras.`
     ]
     const wdnotes2 = [
        `Minimum withdawal amount for USDT on Tron (TRC-20) network is 20,00 USDT.`,
        `Do not participate in an initial Coin Offering (ICO) or token sale directly from your Ekonobi account.`,
        `If you’ve mistakenly withdrawn any assets to a wrong address, we are unable to locate the proper receiver of your funds and provide you any further assistance due to the anonymized nature of blockchain networks.`,
        `If you have sent your coins to an incorrect address by mistake, and you know that this address belongs to another platform, you are suggested to contact the customer support of that particular platform.`
     ]
     this.state = {
        mudata:data,
        wdnotes:wdnotes,
        wdnotes2:wdnotes2
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
        // 
        return vv+'<span>'+zero.join('')+'</span>';
    }
    render() {
        return (
            <React.Fragment>
                <Header navbarSize={NavbarSize.sm} logoText={true} />
                <div className={cx('container py-[10px] sm:py-[40px] px-4')}>
                    <div >
                    <Tabs defaultIndex={1}  selectedTabClassName={'!text-white font-medium bg-primary rounded'}>
                            
                    <div className={'block lg:flex lg:items-end'}>
                                <div className={'flex items-center'}>

                                <div className={cx('pr-[30px]')}><span className="initial items-start sm:items-center text-[26px] sm:text-[28px] md:text-[32px] lg:text-4xl font-bold whitespace-pre txt-gradient txt-gradient-2">Withdraw</span></div>
                                <div className={'flex items-center rounded max-w-[140px] max-h-[29px] p-[2px_10px_3px] sm:p-[2px_12px_3px] border-solid border-[1px] border-ebece9 ml-auto sm:ml-0'}>
                                    <TabList className={'list-none flex'}>
                                        <Tab className={'text-xs tracking-normal text-bfbfbf cursor-pointer mr-5'}><div className={'p-[4px_8px_1px] sm:p-[5px_10px_1px]'}>Fiat</div></Tab>
                                        <Tab className={'text-xs tracking-normal text-bfbfbf cursor-pointer'}><div className={'p-[4px_8px_1px] sm:p-[5px_10px_1px]'}>Crypto</div></Tab>
                                    </TabList>
                                </div>
                                </div>
                                <div className={'flex items-center mt-5 lg:mt-0 lg:ml-auto'}>
                                    <div className={'text-xs text-a2a2a2 lg:ml-5 self-center whitespace-pre sm:whitespace-normal'}>Most used:</div>
                                    <div className={'flex flex-wrap sm:flex-nowrap items-center'}>
                                    {this.state.mudata.map((item:any,i:number) => 
                                        <div key={i} className={'flex items-center sm:first:p-[0_10px] flex-1 pl-6 sm:pl-5 md:pl-[24px] lg:pl-[30px] mt-2 lg:mt-0'}>
                                            <div className="w-[26px] h-[26px] lg:w-8 lg:h-8"><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt={item.coin}  width={32} height={32}/></div>
                                            <div className={'pl-2'}>
                                                <div className={'font-medium text-171a1e text-[13px] sm:text-sm'}>{item.symbol}</div>
                                                <div className={'text-xs text-a2a2a2 pt-[2px]'}>{item.coin}</div>
                                            </div>
                                        </div>
                                    )}
                                    </div>
                                </div>
                                
                            </div>
                            <TabPanel>
                            <div className={'flex-wrap lg:flex-nowrap flex p-[25px_0_40px] sm:p-[45px_0_100px]'}>
                                <div className={'lg:max-w-[812px] w-full lg:mr-[60px]'}>
                                    <MessageCard text="Witdraws must be made to your own personal bank accounts. After the transaction, the withdrawal amount will be automatically withdrawn to your bank account."/>
                                    <div className={'rounded-[15px] sm:rounded-[20px] bg-white bg-blend-normal shadow-normal p-[15px] md:p-[25px]'}>
                                        <div className={'block sm:flex items-center pb-[10px] border-solid border-e9eff6 border-b-[1px]'}>
                                            <div className={'text-base sm:text-lg text-171a1e font-medium flex-1'}>Bank Transfer</div>
                                            <div className={'flex flex-wrap items-center'}>
                                                <div className={'text-acacac text-xs font-medium mr-[7px]'}>Remaining Daily Withdrawal Limit:</div>
                                                <div className={'text-171a1e text-[13px] lg:text-sm font-bold'}>10.000.000,00 TRY</div>
                                            </div>
                                        </div>
                                        <div className={'pt-5 sm:pt-[25px]'}>
                                            <div className={'text-xs text-acacac'}>Saved Bank Accounts</div>
                                            <div className={'flex flex-wrap items-center'}>
                                                <div className={'py-[7px] px-[12px] sm:px-[20px] sm:flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_15px_0_0] sm:m-[10px_30px_0_0]  w-[144px] shadow-normal flex items-center'}><Image className="w-[120px]" src={`/assets/images/svg/banks/akbank.svg`} alt={'AK Bank'}  width={120} height={25}/></div>
                                                <div className={'py-[7px] px-[12px] sm:px-[20px] sm:flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_15px_0_0] sm:m-[10px_30px_0_0]  w-[144px] shadow-normal flex items-center'}><Image className="w-[120px]" src={`/assets/images/svg/banks/fibabanka.svg`} alt={'Fiba Banka'}  width={120} height={25}/></div>
                                                <div className={'py-[7px] px-[12px] sm:px-[20px] sm:flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_15px_0_0] sm:m-[10px_30px_0_0]  w-[144px] shadow-normal flex items-center'}><Image className="w-[120px]" src={`/assets/images/svg/banks/vakifbank.svg`} alt={'Vakif Bank'}  width={120} height={25}/></div>
                                                <div className={'py-[7px] px-[12px] sm:px-[20px] sm:flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_15px_0_0] sm:m-[10px_30px_0_0]  w-[144px] shadow-normal flex items-center text-xs md:text-sm'}><Image className={'w-[24px] mr-[7px]'} src={`/assets/images/svg/banks/addbank.svg`} alt={'Add IBAN'}  width={24} height={24}/>Add IBAN</div>
                                            </div>
                                            <div className={'pt-[15px] sm:pt-[35px]'}>
                                                <div className={'pt-[8px] sm:pt-[15px]'}>
                                                    <div><Input label="Receiver Name" placeholder="John Doe" /></div>
                                                </div>
                                                <div className={'pt-[8px] sm:pt-[15px]'}>
                                                    <div><Input label="IBAN" value="TR" iconRight="Paste" /></div>
                                                </div>
                                                <div className={'pt-[8px] sm:pt-[15px]'}>
                                                    <div><Input label="Amount" labelRightClassName={'text-xs'} labelRight={<>Available Balance:&nbsp; <span className="text-171a1e font-bold text-[13px] sm:text-sm">884.475,35 TRY</span></>}  labelBLeftClassName={'text-xs font-medium text-acacac'}  labelBottom="true" labelBottomLeft={<>You will get:&nbsp;<span className='text-[13px] sm:text-sm font-bold text-171a1e'>0,00 TRY</span></>} labelBottomRight={<>Transaction Fee:&nbsp;<span className='text-[13px] sm:text-sm font-bold text-171a1e'>0,00 TRY</span></>} labelBRightClassName={'text-acacac text-xs font-medium'} iconRight="Max" /></div>
                                                </div>
                                                <div className={'pt-[8px] sm:pt-[15px]'}>
                                                    <Button className={'w-full text-white bg-danger mt-0 sm:mt-5'}>Confirm</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'mt-9 lg:mt-0 lg:max-w-[454px] w-full'}>
                                    <NoteCard>
                                        <NoteCardHeading>Please note before you withdraw:</NoteCardHeading>
                                        {this.state.wdnotes.map((item:any,i:number) => 
                                            <NoteCardItem className={'pt-6'} key={i}>{1+i}. {item}</NoteCardItem>
                                        )}
                                    </NoteCard>
                                    <div className={'pt-8 sm:pt-10'}>
                                        <TransactionHistory heading="Fiat Withdrawal History"/>
                                    </div>
                                </div>
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div className={'flex-wrap lg:flex-nowrap flex p-[25px_0_40px] sm:p-[30px_0_70px] md:p-[45px_0_100px]'}>
                                <div className={'lg:max-w-[812px] w-full lg:mr-[60px]'}>
                                    <MessageCard text="Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales."/>
                                    <div className={'rounded-[15px] sm:rounded-[20px] bg-white bg-blend-normal shadow-normal p-[15px] md:p-[25px]'}>
                                        <div className={'block sm:flex items-center pb-[10px] border-solid border-e9eff6 border-b-[1px]'}>
                                            <div className={'text-base sm:text-lg text-171a1e font-medium flex-1'}>Crypto Withdrawal</div>
                                            <div className={'flex flex-wrap items-center'}>
                                                <div className={'text-acacac text-xs font-medium mr-[7px]'}>Remaining Daily Withdrawal Limit:</div>
                                                <div className={'text-171a1e text-[13px] lg:text-sm font-bold'}>50,00000000 BTC</div>
                                            </div>
                                        </div>
                                        <div className={'pt-5 sm:pt-[25px]'}>
                                        <div className={'block md:flex flex-wrap lg:flex-nowrap items-center mb-[32px]'}>
                                                <div className="flex-1  sm:min-w-[361px]">
                                                    <CoinSelectorDropdwon/>
                                                </div>
                                                <div className="mt-7 md:mt-0">
                                                    <div className={'text-xs text-acacac'}>Select Network</div>
                                                    <div className={'flex items-center'}>
                                                        <div className={'flex items-center mt-[5px] mr-6 w-ful w-[140px] sm:w-[164px] p-[3px_12px] sm:p-[5px_24px] text-xs rounded-[20px] sm:rounded-[30px] bg-light bg-blend-normal shadow-normal opacity-[0.20426433]'}>
                                                            <Image className={'h-6 w-6 sm:h-8 sm:w-8'} src={`/assets/images/coins/svg/ethereum.svg`} alt={'Ethereum'}  width={32} height={32}/>
                                                            <div className={'py-[5px] px-[7px]'}><span>Ethereum </span><span className={'block'}>(ERC-20)</span></div>
                                                        </div>
                                                        <div className={'flex items-center mt-[5px] w-ful w-[140px] sm:w-[164px] p-[3px_12px] sm:p-[5px_24px] text-xs rounded-[20px] sm:rounded-[30px] bg-light bg-blend-normal shadow-normal'}>
                                                            <Image className={'h-6 w-6 sm:h-8 sm:w-8'} src={`/assets/images/coins/svg/tron.svg`} alt={'Tron'}  width={32} height={32}/>
                                                            <div className={'py-[5px] px-[7px]'}><span>Tron </span> <span className={'block'}>(TRC-20)</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={'text-xs text-acacac'}>Saved USDT withdrawal addresses</div>
                                            <div className={'flex flex-wrap items-center'}>
                                                <div className="py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-xs text-acacac font-medium">
                                                Patos Si USDT TRC20
                                                T39sjdRoe7493als…
                                                </div>
                                                <div className="py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-xs text-acacac font-medium">
                                                Binance USDT TRC20
                                                T39sjdRoe7493als…
                                                </div>
                                                <div className="py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-xs text-acacac font-medium">
                                                Binance USDT TRC20
                                                T39sjdRoe7493als…
                                                </div>
                                                <div className={'py-[7px] px-[10px] sm:px-[15px] min-h-[60px] flex-1 rounded-[20px] bg-light bg-blend-normal m-[10px_10px_0_0] sm:m-[10px_30px_0_0] min-w-[135px] max-w-[160px] shadow-normal flex items-center text-sm sm:text-base text-171a1e font-medium'}>
                                                    <Image className="mr-[7px]" src={`/assets/images/svg/banks/addbank.svg`} alt={'Add Address'}  width={24} height={24}/>Add Address</div>
                                            </div>
                                            <div className={'pt-[35px]'}>
                                                
                                                <div className={'pt-[15px]'}>
                                                    <div><Input label="USDT recipient’s address" iconRight="Paste" /></div>
                                                </div>
                                                <div className={'pt-[15px]'}>
                                                    <div><Input label="Net amount to send" labelRight={<>Available Balance:&nbsp; <span className="text-171a1e font-bold text-xs sm:text-sm">7.473,27380000 USDT</span></>} labelRightClassName={'text-xs'} labelBottom="true" labelBottomLeft={<>Transaction Fee:&nbsp; <span className='text-171a1e font-bold text-xs sm:text-sm'>0,00 USDT</span></>} labelBLeftClassName={'text-acacac text-xs font-medium'} labelBRightClassName={'text-acacac text-xs font-medium'} labelBottomRight={<>Total amount to send:&nbsp; <span className='text-171a1e font-bold text-xs sm:text-sm'>0,75 USDT</span></>} iconRight="Max" /></div>
                                                </div>
                                                <div className={'pt-[15px]'}>
                                                    <Button className={'w-full text-white bg-danger mt-5'}>Confirm</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'mt-9 lg:mt-0 lg:max-w-[454px] w-full'}>
                                    <NoteCard>
                                        <NoteCardHeading>Please note before you withdraw:</NoteCardHeading>
                                        {this.state.wdnotes2.map((item:any,i:number) => 
                                            <NoteCardItem className={'pt-6'} key={i}>{1+i}. {item}</NoteCardItem>
                                        )}
                                    </NoteCard>
                                    <div className={'pt-8 sm:pt-10'}>
                                        <TransactionHistory heading="Crypto Withdrawal History"/>
                                    </div>
                                </div>
                            </div>
                            </TabPanel>
                            
                        </Tabs>
                    </div>

                </div>
                <Footer />
                
            </React.Fragment>
        );
    }

}

// export async function getServerSideProps(context: any) {
//     const session = await getSession(context)
//     // 

//     if (!session) {
//         return {
//             redirect: {
//                 source: '/login',
//                 destination: '/login' + getReturnQuery(context.resolvedUrl),
//                 permanent: false,

//             },

//         }
//     }
//     return {
//         props: { session }
//     }
// }

export default WithdrawCryptoPage

