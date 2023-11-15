import Link from 'next/link';
import styles from './style.module.css';
import Image from 'next/image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useState } from 'react';
import { Button } from "../../components/button";
import cx from "classnames";

export function TransactionHistory({ className, icon, text, heading } : any) {

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
        return vv+'<span class="text-ebece9">'+zero.join('')+'</span>';
    }
    return (
        <>
    <div className={cx('p-[18px_15px_11px_15px] sm:p-[24px_27px_11px_30px] rounded-[20px] max-w-[454px] w-full bg-white shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]',className)}>
        <div className={cx('flex items-center pb-2.5 border-solid border-b-[1px] border-e9eff6 ')}>
            <div className={cx('text-sm sm:text-base font-medium leading-normal tracking-normal flex-1 text-171a1e')}>{heading? heading:'Transaction History'}</div>
            <div><Button className='text-xs border-0 bg-e9eff6 text-a2a2a2 rounded-md p-[4px_7.5px_5px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.05)]'>View All</Button></div>
        </div>
        <div >
        {txhistory.map((item:any,i:number) => 
        // <>
            <div key={i} className={cx('flex items-center py-[7px] text-171a1e leading-normal')}>
                <div className='flex-1 max-w-[20px] sm:max-w-[30px]'><div className={cx('w-[8px] h-[8px] rounded-[10px] p-0',item.status?'bg-success':'bg-danger')}></div></div>
                <div className='flex-1 max-w-[20px] sm:max-w-[50px] text-xs sm:text-sm'>{item.coin}</div>
                <div className='flex-1 text-end text-xs sm:text-sm' dangerouslySetInnerHTML={{ __html:markZero(item.value)}}></div>
                <div className='flex-1 text-end text-xs sm:text-sm'>{item.date}</div>
            </div>
        // </>
        )}
        </div>
    </div>
    </>
    );
}