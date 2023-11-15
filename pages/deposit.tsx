import React, { Component } from "react";
import Header, { NavbarSize } from "../components/header";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import cx from "classnames";
import styles from '../styles/deposit.module.css'
import { Button } from "../components/button";
import Image from 'next/image';
import Footer from "./footer";
import Input from "../components/input";
import Checkbox from "../components/checkbox";
import { MarketTable } from "../components/market/market-table";
import { TransactionHistory } from "../components/transaction-history";
import { CoinSelectorDropdwon } from "../components/coin-selector-dropdown";
import { getSession } from "next-auth/react";
import router from "next/router";
import { getReturnQuery } from "../helpers/common";
import { MessageCard } from "../components/message-card";
import { NoteCard, NoteCardHeading, NoteCardItem } from "../components/note-card";


interface Props {
  
}

interface State {
    mudata:any,
    wdnotes:any,
    wdnotes2:any,
    banks:any,
}

class DepositCryptoPage extends Component<Props, State> {
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
            `You must send Turkish Lira by Havale or EFT from your personal bank account opened only in your name.`,
            `You can make 24/7 deposit with your AKBANK account.`,
            `FAST transaction is supported up to 5000 Turkish Liras. You can also deposit from any bank 24/7 if the amount is equal or less than 5000 Turkish Liras.`,
            `You can deposit to our AKBANK account from all banks during bank working hours.`,
            `Transfers made by ATM or credit card will not be accepted as it is not possible to confirm the sender information.`,
            `There is no minimum limit for Turkish Lira deposit, you can make your TRY deposits within your limits.`,
            `After your first Turkish Lira deposit transaction, Binance Transfer and crypto withdrawals will be disabled for 48 hours.`,
         ]
         const wdnotes2 = [
            `Send only USDT to this deposit address`,
            `Sending coin or token other than USDT to this address may result in the loss of your deposit.`,
            `Ensure the network you are using is Tron TRC-20.`,
            `The transaction information of deposit will be notified after  1 network confirmation.`,
            `The deposit amount will be credited to your balance after 2 network confirmation.`,
            `If you have sent your tokens to an different or incorrect address which does not belong to Ekonobi, we are unable to provide you any further assistance. You are suggested to contact the relevant parties (owner of the address or exchange/platform which the address belongs to)`,
            `Do not send NFTs to this address.`,
         ]
         const banks =[
            {'logo':'akbank','ac':'Ekonobi Teknoloji A.Ş.','iban':'TR03 0001 0026 2839 0794 6473 05','provides':'EFT & 7/24 Havale & FAST','show':true},
            {'logo':'fibabanka','ac':'Ekonobi Teknoloji A.Ş.','iban':'TR03 0001 0026 2839 0794 6473 05','provides':'EFT & 7/24 Havale & FAST','show':false},
            {'logo':'vakifbank','ac':'Ekonobi Teknoloji A.Ş.','iban':'TR03 0001 0026 2839 0794 6473 05','provides':'EFT & 7/24 Havale & FAST','show':false},
            {'logo':'yapikredi','ac':'Ekonobi Teknoloji A.Ş.','iban':'TR03 0001 0026 2839 0794 6473 05','provides':'EFT & 7/24 Havale & FAST','show':false},
            {'logo':'otherbank','ac':'Ekonobi Teknoloji A.Ş.','iban':'TR03 0001 0026 2839 0794 6473 05','provides':'EFT & FAST','show':false},
         ]
         this.state = {
            mudata:data,
            wdnotes:wdnotes,
            wdnotes2:wdnotes2,
            banks:banks
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
        return vv+'<span class="lowvisible">'+zero.join('')+'</span>';
    }
    handleClick(e:any) {
        var d = this.state.banks;
        d.map((i:any,ind:any)=>{
            if(i.logo === e.logo){
                i.show=(i.show?false:true);
            }
            else
            i.show=false;

        })
        this.setState({
            banks:d
        })
    }
    render() {
        return (
            <React.Fragment>
                <Header navbarSize={NavbarSize.sm} logoText={true} />
                <div className={cx('container py-[10px] sm:py-[40px] px-4')}>
                    <div>
                    <Tabs defaultIndex={1}  selectedTabClassName={cx('!text-white font-medium bg-primary rounded')}>
                            <div className={'block lg:flex lg:items-end'}>
                                <div className={'flex items-center'}>
                                    <div className={cx('pr-[30px]')}><span className="initial items-start sm:items-center text-[26px] sm:text-[28px] md:text-[32px] lg:text-4xl font-bold whitespace-pre txt-gradient txt-gradient-2">Deposit</span></div>
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
                                    <MessageCard text="Deposits must be made from your own personal bank accounts. After the Havale transaction, the deposit amount will be automatically deposited to your account."/>
                                    <div className={'rounded-[20px] bg-white bg-blend-normal shadow-normal p-[15px] md:p-[25px]'}>
                                        <div className={'pb-[10px] border-solid border-e9eff6 border-b-[1px]'}>
                                            <div className={'text-base sm:text-lg text-171a1e font-medium flex-1'}>Bank Transfer</div>
                                            
                                        </div>
                                        <div className={'pt-5 sm:pt-[25px]'}>
                                            {this.state.banks.map((item:any,i:number) => 
                                                <div key={i} className={cx('py-4 sm:py-[25px] px-3 sm:px-5 rounded-[15px] sm:rounded-[20px] bg-light bg-blend-normal my-[20px] sm:my-[30px] shadow-normal first:mt-0')}>
                                                    <div className={'flex items-center text-acacac'}><Image className={cx(this.state.banks.length-1!=i?'w-[100px] sm:w-[160px]':'')} src={`/assets/images/svg/banks/${item.logo}.svg`} alt={'AK Bank'}  width={((this.state.banks.length-1)==i?32:160)} height={((this.state.banks.length-1)==i?32:34)}/> {(this.state.banks.length-1)==i && <span className={'pl-[15px] font-medium text-lg text-171a1e'}>Other Bank</span>} <div className={cx('ml-auto flex items-center text-a2a2a2')}><div className={'text-xs sm:text-sm pl-1'}>{item.provides}</div><div className={cx('flex items-center ml-[5px] ')}onClick={() => this.handleClick(item)}><Image className={item.show?'rotate-180':''} src={`/assets/images/icons/arrow-down.svg`} alt={'Arrow'}  width={12} height={12}/></div></div></div>
                                                    <div className={cx(item.show?'block':'hidden')}>
                                                        <div className={cx('block sm:flex flex-wrap pt-2 sm:pt-3')}><span className={'flex flex-1 items-center text-a2a2a2 text-xs max-w-[115px]'}>Account Name </span> <span className="flex items-center text-[12.5px] sm:text-sm sm:ml-2">{item.ac} <Image className={'ml-3 sm:ml-5 w-4 sm:w-6'} src={`/assets/images/icons/copy-icon.svg`} alt={'Copy'}  width={24} height={24}/></span></div>
                                                        <div className={cx('block sm:flex flex-wrap pt-2 sm:pt-3')}><span className={'flex flex-1 items-center text-a2a2a2 text-xs max-w-[115px]'}>IBAN </span> <span className="flex items-center text-[12.5px] sm:text-sm sm:ml-2">{item.iban} <Image className={'ml-3 sm:ml-5 w-4 sm:w-6'} src={`/assets/images/icons/copy-icon.svg`} alt={'Copy'}  width={24} height={24}/></span></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={'mt-9 lg:mt-0 lg:max-w-[454px] w-full'}>
                                    <NoteCard>
                                        <NoteCardHeading>Please note before you deposit:</NoteCardHeading>
                                        {this.state.wdnotes.map((item:any,i:number) => 
                                           <NoteCardItem key={i}>{1+i}. {item}</NoteCardItem> 
                                        )}
                                    </NoteCard>
                                    <div className={'pt-8 sm:pt-10'}>
                                        <TransactionHistory heading="Fiat Deposit History"/>
                                    </div>
                                </div>
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div className={'flex-wrap lg:flex-nowrap flex p-[25px_0_100px] sm:p-[45px_0_100px]'}>
                                <div className={'lg:max-w-[812px] w-full lg:mr-[60px]'}>
                                    <MessageCard text="Send only USDT to this deposit address. Sending any other coin or token, using any other network while sending to this address may result in the loss of your crypto asset."/>
                                    <div className={'rounded-[15px] sm:rounded-[20px] bg-white bg-blend-normal shadow-normal p-[15px] md:p-[25px]'}>
                                        <div className={'pb-[10px] border-solid border-e9eff6 border-b-[1px]'}>
                                            <div className={'text-base sm:text-lg text-171a1e font-medium flex-1'}>Crypto Deposit</div>
                                            
                                        </div>
                                        <div className={'pt-[25px]'}>
                                            <div className={'block sm:flex flex-wrap lg:flex-nowrap items-center mb-[32px]'}>
                                                <div className="flex-1  sm:min-w-[361px]">
                                                    <CoinSelectorDropdwon/>
                                                </div>
                                                <div className="mt-7 sm:mt-0">
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
                                            <div className={'flex flex-wrap md:flex-nowrap items-center pt-0 md:pt-[50px]'}>
                                                <div className={'flex-1 sm:min-w-[320px]'}>
                                                    <div>
                                                        <div><Input label="USDT Deposit Address (Tron TRC-20)" labelLeftClassName={'text-acacac text-xs'} value="TJNUxR2ZPNViPV2N3ocZB7AA3rqunjnBPi" iconRight={<Image className={'w-4 h-4 sm:w-6 sm:h-6'} src={`/assets/images/icons/copy-icon.svg`} alt={'copy'}  width={24} height={24}/>} fControlClassName={'text-sm md:text-base font-medium text-171a1e p-[13px_12px]'} fControlWrapClassName={'rounded-[30px] bg-light bg-blend-normal shadow-normal'} /></div>
                                                    </div>
                                                    <div className={'rounded-[30px] bg-light bg-blend-normal shadow-normal py-[9px] px-[7px] mt-8'}>
                                                        <div className="flex items-center p-[3px_7px_0_7px] text-xs">
                                                            <div className="flex-1">Minimum Deposit Amount</div>
                                                            <div className={'flex sm:flex-1 justify-end max-w-[140px] text-sm font-medium pl-2'} dangerouslySetInnerHTML={{ __html:this.markZero('0,01000000') + '&nbsp;USDT'}}></div>
                                                        </div>
                                                        <div className="flex items-center p-[3px_7px_0_7px] text-xs">
                                                            <div className="flex-1">Tron (TRC-20) network confirmations for arrival</div>
                                                            <div className={'flex sm:flex-1 justify-end max-w-[140px] text-sm font-medium pl-2'}>1</div>
                                                        </div>
                                                        <div className="flex items-center p-[3px_7px_0_7px] text-xs">
                                                            <div className="flex-1">Tron (TRC-20) network confirmations for unlock</div>
                                                            <div className={'flex sm:flex-1 justify-end max-w-[140px] text-sm font-medium pl-2'}>2</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={'flex justify-center my-5 sm:mt-0 sm:block min-w-[165px] w-full sm:w-auto sm:pl-6'}>
                                                    <div><span className="block ml-[7px] mb-[10px] text-acacac text-xs">QR Code</span><Image className={'w-[130px] h-[130px] md:w-[145px] md:h-[145px] lg:h-[165px] lg:w-[165px]'} src={`https://chart.googleapis.com/chart?chs=175x175&cht=qr&chld=L|0&chl=TJNUxR2ZPNViPV2N3ocZB7AA3rqunjnBPi&choe=UTF-8`} alt={'QR Code'}  width={165} height={165}/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={'mt-9 lg:mt-0 lg:max-w-[454px] w-full'}>
                                    <NoteCard>
                                        <NoteCardHeading>Please note before you deposit:</NoteCardHeading>
                                        {this.state.wdnotes2.map((item:any,i:number) => 
                                            <NoteCardItem key={i}>{1+i}. {item}</NoteCardItem>
                                        )}
                                    </NoteCard>
                                    <div className={'pt-8 sm:pt-10'}>
                                        <TransactionHistory heading="Crypto Deposit History"/>
                                    </div>
                                </div>
                            </div>
                            </TabPanel>  
                        </Tabs>
                    </div>
                </div>
                <Footer/>
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
export default DepositCryptoPage


