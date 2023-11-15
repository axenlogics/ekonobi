import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { Button } from "../../components/button";
import cx from "classnames";

export function UserStats({ className, icon, text, heading } : any) {

    const txhistory=[
        {'status':false,'coin':'TRY','value':'5.783,57000000','date':'09.12.2022 17:14'},
        {'status':true,'coin':'USDT','value':'7.271,05948392','date':'09.12.2022 17:13'},
    ]
    function markZero(val:any){
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
        return vv+'<span class="text-a2a2a2">'+zero.join('')+'</span>';
    }
    return (
        <>
        <div className={'sm:flex rounded-[20px] bg-white bg-blend-normal shadow-normal p-[17px_20px_17px_15px] sm:p-[20px_30px_27px_15px]'}>
            <div>
                <div className={'flex'}>
                    <Image className='mr-[22px] w-12 h-12 sm:w-13 sm:h-13 md:w-16 md:h-16' src={`/assets/images/icons/userbtcicon.svg`} alt={'Profile Image'}  width={64} height={64}/>
                    <div className={'flex flex-col justify-between'}>
                        <div className='block'><div className='flex items-center'><Image className='mr-[5px]' src={`/assets/images/icons/default-level.svg`} alt={'Edit'}  width={18} height={18}/> <span className={cx('text-16','font-medium','text-171a1e')}>BitcoinKAFASI</span> <Image className={cx('ml-[5px]')} src={`/assets/images/icons/pencil.svg`} alt={'Edit'}  width={10} height={10}/></div> <span className={cx('text-acacac','text-xs','font-medium pl-3')}>13.273 Obi-Point</span></div>
                    </div>
                </div>
                <div className={'pt-1 sm:pt-[15px] flex flex-wrap'}>
                    <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                        <div className='text-a2a2a2 text-xs font-medium text-left'>User ID</div>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        <div className='font-medium'>126172</div>
                    </div>
                    <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                        <div className='text-a2a2a2 text-xs font-medium text-left'>Twitter ID</div>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        <div className='font-medium'>@johndoe</div>
                    </div>
                    <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                        <div className='text-a2a2a2 text-xs font-medium text-left'>Registration</div>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        <div className='font-medium'>10.12.2022</div>
                    </div>
                    <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                        <div className='text-a2a2a2 text-xs font-medium text-left'>Verification</div>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        <div className='font-medium'>Level 1</div>
                    </div>
                    <div className='pt-2 sm:pt-0 pr-[10px] flex items-center sm:block'>
                        <div className='text-a2a2a2 text-xs font-medium text-left'>Fee</div>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        <div><span className={cx('text-acacac','text-xs')}>M:</span> % 0   <span className={cx('text-acacac','text-xs')}>T:</span> % 0</div>
                    </div>
                    <div className='pt-2 sm:pt-0 pr-[10px] block'>
                        <div className='flex items-center'>
                            <div className={cx('text-acacac','text-xs','font-medium')}>Monthly / Annual / All Time Obi-Points</div>
                            <span className='ml-1 mr-2 block sm:hidden'>:</span>
                        </div>
                        <div className={cx('text-181a1e','font-medium ml-[3px]')}>2.200 / 4.700 / 12.128</div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-1 flex-col sm:justify-between pt-1 sm:pt-0'}>
                <div className='block'>
                    <div className='flex sm:block items-center'>
                        <span className={cx('text-acacac','text-xs','font-medium block sm:text-right whitespace-pre')}>Remaining / Daily TRY Withdrawal Limit</span>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                    </div>
                    <span className={cx('text-181a1e','font-medium block sm:text-right')}>9.784 / 20.000 TRY</span>
                </div>
                <div className='block'>
                    <div className='flex sm:block items-center'>
                        <span className={cx('text-acacac','text-xs','font-medium block sm:text-right whitespace-pre')}>Remaining / Daily Crypto Withdrawal Limit</span>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                    </div>
                    <span className={cx('text-181a1e','font-medium block sm:text-right')} dangerouslySetInnerHTML={{ __html:markZero('0,06360000')+' / 0,1 BTC'}}></span>
                </div>
                <div className='block'>
                    <div className='flex sm:block items-center'>
                        <span className={cx('text-acacac','text-xs','font-medium block sm:text-right')}>7D / 30D Trade Volume</span>
                        <span className='ml-1 mr-2 block sm:hidden'>:</span>
                    </div>
                    <span className={cx('text-181a1e','font-medium block sm:text-right')}>17.483 / 100.473 TRY</span>
                </div>
            </div>
        </div>
    </>
    );
}