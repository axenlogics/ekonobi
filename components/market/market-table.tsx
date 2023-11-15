import Link from 'next/link';
import styles from './style-market-table.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useLayoutEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
export function MarketTable({ className, icon, text } : any) {
    const data=
    [
        {
        'rank':'1',
        'coin':'Bitcoin',
        'symbol':'BTC',
        'price':'428.166',
        'sprice':'$23.952',
        'd1c':'-%1,25',
        'd7c':'-%1,25',
        'd1v':'22,34M',
        'mc':'7,9T',
        'cs':'19,1M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'428.166',
        'elpvalue':'$23.952',
        'ts':'% 62',
        fv:true,
        },
        {
        'rank':'2',
        'coin':'Ethereum',
        'symbol':'ETH',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'+%2,12',
        'd7c':'+%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:true,

        },
        {
        'rank':'3',
        'coin':'Tether',
        'symbol':'USDT',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'-%2,12',
        'd7c':'-%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:true,

        },
        {
        'rank':'4',
        'coin':'USD Coin',
        'symbol':'USDC',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'-%2,12',
        'd7c':'-%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:false,

        },
        {
        'rank':'5',
        'coin':'Binance Coin',
        'symbol':'BNB',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'-%2,12',
        'd7c':'-%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:false,
        },
        {
        'rank':'6',
        'coin':'Binance USD',
        'symbol':'BUSD',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'-%2,12',
        'd7c':'-%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:false,
        },
        {
        'rank':'7',
        'coin':'Ripple',
        'symbol':'XRP',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'+%2,12',
        'd7c':'+%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:true,
        },
        {
        'rank':'8',
        'coin':'Cardano',
        'symbol':'ADA',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'-%2,12',
        'd7c':'-%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:false,
        },
        {
        'rank':'9',
        'coin':'Solana',
        'symbol':'SOL',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'-%2,12',
        'd7c':'-%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:true,
        },
        {
        'rank':'8',
        'coin':'Dogecoin',
        'symbol':'DOGE',
        'price':'30.923',
        'sprice':'$1.728,1',
        'd1c':'+%2,12',
        'd7c':'+%2,12',
        'd1v':'17,36M',
        'mc':'3,5T',
        'cs':'121,8M',
        'tp':'TRY | USDT',
        'bc':'Blockchain',
        'elp':'30.923',
        'elpvalue':'$1.728,1',
        'ts':'% 54',
        fv:false,
        }
    ]
    const [state, setState] = useState({'USDT':false,'TRY':true});
    const [tab, setTab] = useState(false);
    const targetRef = useRef();

    function handleClick(e:any) {
        let d=e.target.outerText;
        setState(prevState=> ({
            ...prevState,
            USDT: (d=='USDT'?prevState.USDT=true:prevState.USDT=false),
            TRY: (d=='TRY'?prevState.TRY=true:prevState.TRY=false)
          }));
    }
    function toggletab(){
        setTab(tab?false:true);
    }
    
    return (
        <div className={'pt-[32px] sm:pt-[85px]'}>
            {tab && <><div onClick={toggletab} className='block md:hidden fixed w-[100%] h-[100%] top-0 z-10 bg-050505'></div></>}
            <Tabs defaultIndex={1}  selectedTabClassName={cx(styles.omtab_selected,'font-bold')}>      
                <div className='flex relative'>
                    <div className='flex' ref={targetRef}>
                    <TabList className={cx('flex flex-wrap items-center list-none')} >
                    {!tab && <div className='hidden md:flex '>
                        
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 opacity-50 leading-normal tracking-normal')}><div><Image src="/assets/images/icons/fill-star.png" alt='Fav' width={18} height={18}/></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>All<span className='px-[3px] text-adadaf'>(18)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>Blockchain<span className='px-[3px] text-adadaf'>(16)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>Layer<span className='px-[3px] text-adadaf'>(6)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>Metaversa<span className='px-[3px] text-adadaf'>(8)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>Defi<span className='px-[3px] text-adadaf'>(12)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>Meme<span className='px-[3px] text-adadaf'>(4)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>GameFi<span className='px-[3px] text-adadaf'>(8)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>NTF<span className='px-[3px] text-adadaf'>(14)</span></div></Tab>
                            <Tab className={cx('text-adadaf cursor-pointer lg:px-[7px] sm:px-1 leading-normal tracking-normal')}><div>New</div></Tab>
                        </div>
                        }
                        <div className='block md:hidden absolute top-[8px] bg-transparent z-10 '>
                           <FontAwesomeIcon icon={faEllipsisVertical} className='text-lg' onClick={toggletab} />
                           {tab && <div className="bg-white rounded shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] text-[0.81rem] sm:text-base">
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[9px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>Favorite</div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>All<span className='px-[3px] text-adadaf'>(18)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>Blockchain<span className='px-[3px] text-adadaf'>(16)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>Layer<span className='px-[3px] text-adadaf'>(6)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>Metaversa<span className='px-[3px] text-adadaf'>(8)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>Defi<span className='px-[3px] text-adadaf'>(12)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>Meme<span className='px-[3px] text-adadaf'>(4)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>GameFi<span className='px-[3px] text-adadaf'>(8)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer pt-[5px] sm:pt-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>NTF<span className='px-[3px] text-adadaf'>(14)</span></div></Tab>
                                <Tab onClick={toggletab} className={cx('text-adadaf cursor-pointer py-[7px] px-2 mx-3 leading-normal tracking-normal')}><div>New</div></Tab>
                            </div>
                           }
                        </div>
                    </TabList>
                    </div>
                    <div className={cx(styles.cointab,'flex ml-auto rounded-[4px] items-center cursor-pointer border-solid border-[1px] border-ebece9 p-[2px_3px_1px_3px]')}>
                        <div className='flex py-[3px] px-[5px]'>
                            <div onClick={handleClick}  className={cx('rounded opacity-[99] text-xs',state.TRY?'p-[4px_9.5px_3px] text-white bg-primary font-bold':'py-[3px] text-b5b6b8 px-[5px]')}>TRY</div>
                            <div onClick={handleClick}  className={cx('rounded opacity-[99] text-xs ml-1',state.USDT?'p-[4px_9.5px_3px] text-white bg-primary font-bold':'py-[3px] text-b5b6b8 px-[5px]')}>USDT</div>
                        </div>
                    </div>
                </div> 
                <div className={cx(styles.mtblarea,'bg-white rounded-[5px] m-[5.1px_0px_197.9px_0] p-[32.9px_12px_16.1px_12px] sm:p-[32.9px_24px_16.1px_19px]')}>
                    <div className={cx(styles.mtblareah,'flex')}>
                        <div className='flex items-end flex-1 text-181a1e text-end pl-[4px] max-w-[48px] sm:max-w-[67px] text-[13px] sm:text-sm  tracking-normal'>
                            <div>Rank </div>
                        </div>
                        <div className='flex items-end flex-1 text-181a1e text-end lg:min-w-[125px] p-[0_0px_0_15px] text-[13px] sm:text-sm  tracking-normal'>
                            <div>Name</div>
                        </div>
                        <div className='flex items-end flex-1 text-181a1e text-end max-w-[90px] pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>Price <span className='block'>(TRY)</span></div>
                        </div>
                        <div className='flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>1D <span className='block'>Change (%)</span></div>
                        </div>
                        <div className='hidden md:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>7D <span className='block'>Change (%)</span></div>
                        </div>
                        <div className='hidden sm:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>1D <span className='block'>Volume (TRY)</span></div>
                        </div>
                        <div className='hidden lg:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div className='relative'>Market <span className='block'>Cap (TRY)</span> <div className='absolute right-[-16px] bottom-[-1px]'><Image src={`/assets/images/svg/arrow-down.svg`} alt='Fav' width={13} height={15}/></div></div>
                        </div>
                        <div className='hidden lg:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>Circulating <span className='block'>Supply</span></div>
                        </div>
                        <div className='hidden md:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>Trading <span className='block'>Pairs</span></div>
                        </div>
                        <div className='hidden lg:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>Blockchain <span className='block'>Concept</span></div>
                        </div>
                        <div className='hidden sm:flex items-end flex-1 text-181a1e text-end pl-[6px] text-[13px] sm:text-sm  tracking-normal'>
                            <div>Ekonobi Listing <span className='block'>Price (TRY)</span></div>
                        </div>
                        <div className='hidden lg:flex items-end flex-1 text-181a1e text-end pl-[6px] justify-end text-[13px] sm:text-sm  tracking-normal'>
                            <div>Twitter <span className='block'>Sentiment</span></div>
                        </div>
                    </div>
                    <TabPanel className={'text-right text-xs sm:text-sm'}>
                    <div className={styles.mtblareac}>
                        {data.map((item:any,i:number) => 
                        <><div key={i} className={'flex items-center p-[17px_6px_0]'}>
                        {/* Rank */}
                        <div className={'flex flex-1 max-w-[48px] sm:max-w-[67px]'}>
                            <div className={'font-poppin font-medium text-181a1e'}>{item.rank}</div>
                            <div className='flex-1 mr-2 sm:mr-3'><Image src={`/assets/images/icons/${item.fv?'fill':'unfill'}-star.png`} alt='Fav' width={18} height={18}/></div>
                        </div>
                        {/* Name */}
                        <div className={cx('flex flex-1 items-center text-left lg:min-w-[125px]')}>
                            <div className={'mr-[10px] w-7 sm:w-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt='Fav' width={32} height={32}/></div>
                            <div>
                                <div className={'text-181a1e font-medium'}>{item.symbol}</div>
                                <div className={'text-a2a2a2 text-xs'}>{item.coin}</div>
                            </div>
                        </div>
                        {/* Price (TRY) */}
                        <div className={cx(styles.tbody,'flex-1 max-w-[90px]')}>
                            <div className={cx('font-medium text-right', item.d1c.indexOf('-')>-1?'text-danger':'text-success')}>{item.price}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.sprice}</div>
                        </div>
                        {/* 1D Change */}
                        <div className={cx(styles.tbody,'flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d1c}</div>
                        </div>
                        {/* 7D Change */}
                        <div className={cx(styles.tbody,'hidden md:block  flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d7c}</div>
                        </div>
                        {/* 1D Volume */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.d1v}</div>
                        </div>
                        {/* Market Cap */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.mc}</div>
                        </div>
                        {/* Circulating Supply */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.cs}</div>
                        </div>
                        {/* Trading Pairs */}
                        <div className={cx(styles.tbody,'hidden md:block flex-1')}>
                            <div className={cx('text-primary font-bold')} dangerouslySetInnerHTML={{ __html: item.tp.indexOf('|')>-1?item.tp.split('|')[0]+'<span class="tpline text-f8f8f8">|</span>'+item.tp.split('|')[1]:item.tp}}></div>
                        </div>
                        {/* Blockchain Concept */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.bc}</div>
                        </div>
                        {/* Ekonobi Listing Price (TRY) */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.elp}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.elpvalue}</div> 
                        </div>
                        {/* Twitter sentiment */}
                        <div className={cx(styles.tbody,'hidden lg:block  flex-1')}>
                            <div className={styles.tpair}>{item.ts}</div>
                        </div>
                        </div></>
                        )}
                    </div>
                    </TabPanel>

                    <TabPanel className={'text-right text-xs sm:text-sm'}>
                    <div className={styles.mtblareac}>
                        {data.map((item:any,i:number) => 
                        <><div key={i} className={'flex items-center p-[17px_6px_0]'}>
                        {/* Rank */}
                        <div className={'flex flex-1 max-w-[48px] sm:max-w-[67px]'}>
                            <div className={'font-poppin font-medium text-181a1e'}>{item.rank}</div>
                            <div className='flex-1 mr-2 sm:mr-3'><Image src={`/assets/images/icons/${item.fv?'fill':'unfill'}-star.png`} alt='Fav' width={18} height={18}/></div>
                        </div>
                        {/* Name */}
                        <div className={cx('flex flex-1 items-center text-left lg:min-w-[125px]')}>
                            <div className={'mr-[10px] w-7 sm:w-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt='Fav' width={32} height={32}/></div>
                            <div>
                                <div className={'text-181a1e font-medium'}>{item.symbol}</div>
                                <div className={'text-a2a2a2 text-xs'}>{item.coin}</div>
                            </div>
                        </div>
                        {/* Price (TRY) */}
                        <div className={cx(styles.tbody,'flex-1 max-w-[90px]')}>
                            <div className={cx('font-medium text-right', item.d1c.indexOf('-')>-1?'text-danger':'text-success')}>{item.price}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.sprice}</div>
                        </div>
                        {/* 1D Change */}
                        <div className={cx(styles.tbody,'flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d1c}</div>
                        </div>
                        {/* 7D Change */}
                        <div className={cx(styles.tbody,'hidden md:block  flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d7c}</div>
                        </div>
                        {/* 1D Volume */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.d1v}</div>
                        </div>
                        {/* Market Cap */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.mc}</div>
                        </div>
                        {/* Circulating Supply */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.cs}</div>
                        </div>
                        {/* Trading Pairs */}
                        <div className={cx(styles.tbody,'hidden md:block flex-1')}>
                            <div className={cx('text-primary font-bold')} dangerouslySetInnerHTML={{ __html: item.tp.indexOf('|')>-1?item.tp.split('|')[0]+'<span class="tpline text-f8f8f8">|</span>'+item.tp.split('|')[1]:item.tp}}></div>
                        </div>
                        {/* Blockchain Concept */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.bc}</div>
                        </div>
                        {/* Ekonobi Listing Price (TRY) */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.elp}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.elpvalue}</div> 
                        </div>
                        {/* Twitter sentiment */}
                        <div className={cx(styles.tbody,'hidden lg:block  flex-1')}>
                            <div className={styles.tpair}>{item.ts}</div>
                        </div>
                        </div></>
                        )}
                    </div>
                    </TabPanel>
                    <TabPanel className={'text-right text-xs sm:text-sm'}>
                    <div className={styles.mtblareac}>
                        {data.map((item:any,i:number) => 
                        <><div key={i} className={'flex items-center p-[17px_6px_0]'}>
                        {/* Rank */}
                        <div className={'flex flex-1 max-w-[48px] sm:max-w-[67px]'}>
                            <div className={'font-poppin font-medium text-181a1e'}>{item.rank}</div>
                            <div className='flex-1 mr-2 sm:mr-3'><Image src={`/assets/images/icons/${item.fv?'fill':'unfill'}-star.png`} alt='Fav' width={18} height={18}/></div>
                        </div>
                        {/* Name */}
                        <div className={cx('flex flex-1 items-center text-left lg:min-w-[125px]')}>
                            <div className={'mr-[10px] w-7 sm:w-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt='Fav' width={32} height={32}/></div>
                            <div>
                                <div className={'text-181a1e font-medium'}>{item.symbol}</div>
                                <div className={'text-a2a2a2 text-xs'}>{item.coin}</div>
                            </div>
                        </div>
                        {/* Price (TRY) */}
                        <div className={cx(styles.tbody,'flex-1 max-w-[90px]')}>
                            <div className={cx('font-medium text-right', item.d1c.indexOf('-')>-1?'text-danger':'text-success')}>{item.price}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.sprice}</div>
                        </div>
                        {/* 1D Change */}
                        <div className={cx(styles.tbody,'flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d1c}</div>
                        </div>
                        {/* 7D Change */}
                        <div className={cx(styles.tbody,'hidden md:block  flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d7c}</div>
                        </div>
                        {/* 1D Volume */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.d1v}</div>
                        </div>
                        {/* Market Cap */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.mc}</div>
                        </div>
                        {/* Circulating Supply */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.cs}</div>
                        </div>
                        {/* Trading Pairs */}
                        <div className={cx(styles.tbody,'hidden md:block flex-1')}>
                            <div className={cx('text-primary font-bold')} dangerouslySetInnerHTML={{ __html: item.tp.indexOf('|')>-1?item.tp.split('|')[0]+'<span class="tpline text-f8f8f8">|</span>'+item.tp.split('|')[1]:item.tp}}></div>
                        </div>
                        {/* Blockchain Concept */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.bc}</div>
                        </div>
                        {/* Ekonobi Listing Price (TRY) */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.elp}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.elpvalue}</div> 
                        </div>
                        {/* Twitter sentiment */}
                        <div className={cx(styles.tbody,'hidden lg:block  flex-1')}>
                            <div className={styles.tpair}>{item.ts}</div>
                        </div>
                        </div></>
                        )}
                    </div>
                    </TabPanel>
                    <TabPanel className={'text-right text-xs sm:text-sm'}>
                    <div className={styles.mtblareac}>
                        {data.map((item:any,i:number) => 
                        <><div key={i} className={'flex items-center p-[17px_6px_0]'}>
                        {/* Rank */}
                        <div className={'flex flex-1 max-w-[48px] sm:max-w-[67px]'}>
                            <div className={'font-poppin font-medium text-181a1e'}>{item.rank}</div>
                            <div className='flex-1 mr-2 sm:mr-3'><Image src={`/assets/images/icons/${item.fv?'fill':'unfill'}-star.png`} alt='Fav' width={18} height={18}/></div>
                        </div>
                        {/* Name */}
                        <div className={cx('flex flex-1 items-center text-left lg:min-w-[125px]')}>
                            <div className={'mr-[10px] w-7 sm:w-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt='Fav' width={32} height={32}/></div>
                            <div>
                                <div className={'text-181a1e font-medium'}>{item.symbol}</div>
                                <div className={'text-a2a2a2 text-xs'}>{item.coin}</div>
                            </div>
                        </div>
                        {/* Price (TRY) */}
                        <div className={cx(styles.tbody,'flex-1 max-w-[90px]')}>
                            <div className={cx('font-medium text-right', item.d1c.indexOf('-')>-1?'text-danger':'text-success')}>{item.price}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.sprice}</div>
                        </div>
                        {/* 1D Change */}
                        <div className={cx(styles.tbody,'flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d1c}</div>
                        </div>
                        {/* 7D Change */}
                        <div className={cx(styles.tbody,'hidden md:block  flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d7c}</div>
                        </div>
                        {/* 1D Volume */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.d1v}</div>
                        </div>
                        {/* Market Cap */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.mc}</div>
                        </div>
                        {/* Circulating Supply */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.cs}</div>
                        </div>
                        {/* Trading Pairs */}
                        <div className={cx(styles.tbody,'hidden md:block flex-1')}>
                            <div className={cx('text-primary font-bold')} dangerouslySetInnerHTML={{ __html: item.tp.indexOf('|')>-1?item.tp.split('|')[0]+'<span class="tpline text-f8f8f8">|</span>'+item.tp.split('|')[1]:item.tp}}></div>
                        </div>
                        {/* Blockchain Concept */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.bc}</div>
                        </div>
                        {/* Ekonobi Listing Price (TRY) */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.elp}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.elpvalue}</div> 
                        </div>
                        {/* Twitter sentiment */}
                        <div className={cx(styles.tbody,'hidden lg:block  flex-1')}>
                            <div className={styles.tpair}>{item.ts}</div>
                        </div>
                        </div></>
                        )}
                    </div>
                    </TabPanel>
                    <TabPanel className={'text-right text-xs sm:text-sm'}>
                    <div className={styles.mtblareac}>
                        {data.map((item:any,i:number) => 
                        <><div key={i} className={'flex items-center p-[17px_6px_0]'}>
                        {/* Rank */}
                        <div className={'flex flex-1 max-w-[48px] sm:max-w-[67px]'}>
                            <div className={'font-poppin font-medium text-181a1e'}>{item.rank}</div>
                            <div className='flex-1 mr-2 sm:mr-3'><Image src={`/assets/images/icons/${item.fv?'fill':'unfill'}-star.png`} alt='Fav' width={18} height={18}/></div>
                        </div>
                        {/* Name */}
                        <div className={cx('flex flex-1 items-center text-left lg:min-w-[125px]')}>
                            <div className={'mr-[10px] w-7 sm:w-8'}><Image src={`/assets/images/coins/svg/${item.coin.toLowerCase().replace(' ','-')}.svg`} alt='Fav' width={32} height={32}/></div>
                            <div>
                                <div className={'text-181a1e font-medium'}>{item.symbol}</div>
                                <div className={'text-a2a2a2 text-xs'}>{item.coin}</div>
                            </div>
                        </div>
                        {/* Price (TRY) */}
                        <div className={cx(styles.tbody,'flex-1 max-w-[90px]')}>
                            <div className={cx('font-medium text-right', item.d1c.indexOf('-')>-1?'text-danger':'text-success')}>{item.price}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.sprice}</div>
                        </div>
                        {/* 1D Change */}
                        <div className={cx(styles.tbody,'flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d1c}</div>
                        </div>
                        {/* 7D Change */}
                        <div className={cx(styles.tbody,'hidden md:block  flex-1')}>
                            <div className={`${styles.tvalue} ${item.d1c.indexOf('-')>-1?'text-danger':'text-success'}`}>{item.d7c}</div>
                        </div>
                        {/* 1D Volume */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.d1v}</div>
                        </div>
                        {/* Market Cap */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.mc}</div>
                        </div>
                        {/* Circulating Supply */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.cs}</div>
                        </div>
                        {/* Trading Pairs */}
                        <div className={cx(styles.tbody,'hidden md:block flex-1')}>
                            <div className={cx('text-primary font-bold')} dangerouslySetInnerHTML={{ __html: item.tp.indexOf('|')>-1?item.tp.split('|')[0]+'<span class="tpline text-f8f8f8">|</span>'+item.tp.split('|')[1]:item.tp}}></div>
                        </div>
                        {/* Blockchain Concept */}
                        <div className={cx(styles.tbody,'hidden lg:block flex-1')}>
                            <div className={styles.tvalue}>{item.bc}</div>
                        </div>
                        {/* Ekonobi Listing Price (TRY) */}
                        <div className={cx(styles.tbody,'hidden sm:block flex-1')}>
                            <div className={styles.tvalue}>{item.elp}</div>
                            <div className={'text-a2a2a2 text-[10px] text-right pt-1'}>{item.elpvalue}</div> 
                        </div>
                        {/* Twitter sentiment */}
                        <div className={cx(styles.tbody,'hidden lg:block  flex-1')}>
                            <div className={styles.tpair}>{item.ts}</div>
                        </div>
                        </div></>
                        )}
                    </div>
                    </TabPanel>

                </div>
            </Tabs>
        </div>
    );
}


