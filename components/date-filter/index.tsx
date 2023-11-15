import styles from "./style.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import React, { Component, useState } from 'react';
import { render } from "react-dom";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from "react-date-range";
import { Calendar } from 'react-date-range';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

// import { DateRangePicker } from 'react-date-ran';

interface Props {
    dropVisible: false;
}

interface State {
    dropVisible: boolean,
    showBackdrop: boolean,
    expand: {
        marketCurrency?: boolean,
        baseCurrency?: boolean,
        side?: boolean,
        date?: string,
    },
}

class DateFilter extends Component<Props, State>{
    // handleSelect(ranges:any){
    //     
    //     {
    //       selection: {
    //         startDate: [native Date Object],
    //         endDate: [native Date Object],
    //       }
    //     }
    //   }
    constructor(props: Props) {
        super(props)
        // Calendar
        this.state = {
            showBackdrop: false,
            dropVisible: false,
            expand: {
                marketCurrency: false,
                baseCurrency: false,
                side: false,

            },
        }
    }
    listdata = [
        {
            "id": 1,
            "symble": "BTC",
            "logo": "/assets/images/coins/svg/bitcoin.svg",
            "activeTick": "/assets/images/icons/order-green-tick.svg"
        },
        {
            "id": 2,
            "symble": "BTC",
            "logo": "/assets/images/coins/svg/bitcoin.svg",
            "activeTick": "/assets/images/icons/order-green-tick.svg"
        },
        {
            "id": 3,
            "symble": "BTC",
            "logo": "/assets/images/coins/svg/bitcoin.svg",
            "activeTick": "/assets/images/icons/order-green-tick.svg"
        },
        {
            "id": 4,
            "symble": "BTC",
            "logo": "/assets/images/coins/svg/bitcoin.svg",
            "activeTick": "/assets/images/icons/order-green-tick.svg"
        },
        {
            "id": 5,
            "symble": "BTC",
            "logo": "/assets/images/coins/svg/bitcoin.svg",
            "activeTick": "/assets/images/icons/order-green-tick.svg"
        },
        {
            "id": 6,
            "symble": "BTC",
            "logo": "/assets/images/coins/svg/bitcoin.svg",
            "activeTick": "/assets/images/icons/order-green-tick.svg"
        }
    ]


    pannelOpen = async (type: any) => {
        // alert('faisal');

        // if(type === 'market') {

        const exp: any = { ...this.state.expand };
        // this.setState({})
        exp[type] = exp[type] ? false : true;
        this.setState({ expand: exp });
        // if(exp[type]){
        this.setState({ showBackdrop: true })
    }
    closebackDrop = () => {
        this.setState({ showBackdrop: false });
        this.setState({ expand: { baseCurrency: false, marketCurrency: false, side: false } })
    }

    handleSelect(ranges: any) {

        // {
        //   selection: {
        //     startDate: [native Date Object],
        //     endDate: [native Date Object],
        //   }
        // }
    }

    render() {
        const selectionRange = {
            startDate: new Date(),
            endDate: new Date(),


        }
        return (
            <>
                <div className={cx('lg:flex block items-center relative')}>
                    <div>
                        {/* <DateRangePicker

                            ranges={[selectionRange]}
                            onChange={this.handleSelect}
                        /> */}
                    </div>
                    <div>
                        {this.state.showBackdrop && <div onClick={() => this.closebackDrop()} className={styles.backdrop}></div>}
                        <div className={cx('lg:flex block items-center w-full')}>
                            <h6 className={('text-[14px] leading-[0.56px] mx-[0px_10px] text-dark lg:block inline-block lg:p-0 p-[0px_0px_15px_5px]')}>pair</h6>
                            <div className="relative xl:m-[0px_16px] lg:m-[0px_4px] m-[0px_4px_15px]">
                                <input className={cx('border border-solid border-080c341f bg-white h-[32px] lg:max-w-[124px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark')} type="text" placeholder="All" />
                                <span className={cx('bg-FBFBFB max-w-[35px] border border-solid border-080c341f h-[32px] block w-full rounded-[4px] absolute top-0 right-0')} data-test="test" onClick={() => this.pannelOpen('marketCurrency')}>
                                    {this.state.expand?.marketCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleUp} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                    {!this.state.expand?.marketCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleDown} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                </span>
                                {this.state.expand?.marketCurrency && <div className={cx('!absolute z-[3] lg:w-[200px] w-full')}>
                                    <div className={cx('h-auto shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                        <SimpleBar style={{ maxHeight: 260 }}>
                                            <ul>
                                                {this.listdata.map((t: any) =>
                                                    <li key={t.id} className={cx('list-none flex items-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:00c89612')}>
                                                        <div className={cx('mr-[12px]')}>
                                                            <Image src={t.logo} alt="coin" height={28} width={28} />
                                                        </div>
                                                        <div className={cx('text-[16px] font-bold text-dark')}>
                                                            {t.symble}
                                                        </div>
                                                        <div className={cx('absolute right-[14px]')}>
                                                            <Image src={t.activeTick} alt="tick" height={12.8} width={15.8} />
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </div>}
                            </div>
                            <h6 className={('text-[14px] leading-[0.56px] mx-[0px_10px] text-dark lg:block inline-block lg:p-0 p-[0px_0px_15px_5px]')}>/</h6>
                            <div className="relative xl:m-[0px_16px] lg:m-[0px_4px] m-[0px_4px_25px]">
                                <input className={cx('border border-solid border-080c341f bg-white h-[32px] lg:max-w-[124px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark')} type="text" placeholder="All" />
                                <span className={cx('bg-FBFBFB max-w-[35px] border border-solid border-080c341f h-[32px] block w-full rounded-[4px] absolute top-0 right-0')} onClick={() => this.pannelOpen('baseCurrency')}>
                                    {this.state.expand?.baseCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleUp} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                    {!this.state.expand?.baseCurrency && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleDown} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                </span>
                                {this.state.expand?.baseCurrency && <div className={cx('!absolute z-[3] lg:w-[200px] w-full')}>
                                    <div className={cx('h-auto shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                        <SimpleBar style={{ maxHeight: 260 }}>
                                            <ul>
                                                {this.listdata.map((t: any) =>
                                                    <li key={t.id} className={cx('list-none flex items-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:00c89612')}>
                                                        <div className={cx('mr-[12px]')}>
                                                            <Image src={t.logo} alt="coin" height={28} width={28} />
                                                        </div>
                                                        <div className={cx('text-[16px] font-bold text-dark')}>
                                                            {t.symble}
                                                        </div>
                                                        <div className={cx('absolute right-[14px]')}>
                                                            <Image src={t.activeTick} alt="tick" height={12.8} width={15.8} />
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </div>}
                            </div>
                            <h6 className={('text-[14px] leading-[0.56px] mx-[0px_10px] text-dark lg:block inline-block lg:p-0 p-[0px_0px_15px_5px]')}>side</h6>
                            <div className="relative xl:m-[0px_16px] m-[0px_4px]">
                                <input className={cx('border border-solid border-080c341f bg-white h-[32px] lg:max-w-[124px] max-w-full w-full rounded-[4px] border-r-none outline-0 p-[5px_8px] text-[14px] text-dark')} type="text" placeholder="All" />
                                <span className={cx('bg-FBFBFB max-w-[35px] border border-solid border-080c341f h-[32px] block w-full rounded-[4px] absolute top-0 right-0')} onClick={() => this.pannelOpen('side')}>
                                    {this.state.expand?.side && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleUp} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                    {!this.state.expand?.side && <FontAwesomeIcon className={cx('absolute top-[8px] right-[9px]')} icon={faAngleDown} style={{ fontSize: 16, color: '#8c8fae' }} />}
                                </span>
                                {this.state.expand?.side && <div className={cx('absolute z-[3] lg:w-[200px] w-full')}>
                                    <div className={cx('h-auto shadow-[0_5px_10px_0_rgb(11,12,25,/4%)] border border-solid border-dfdfe4 bg-FBFBFB rounded-[4px] p-[10px_0px]')}>
                                        <SimpleBar style={{ maxHeight: 260 }}>
                                            <ul>
                                                {this.listdata.map((t: any) =>
                                                    <li key={t.id} className={cx('list-none flex items-center h-[52px] p-[14px] cursor-pointer relative odd:bg-light even:bg-transparent hover:00c89612')}>
                                                        <div className={cx('mr-[12px]')}>
                                                            <Image src={t.logo} alt="coin" height={28} width={28} />
                                                        </div>
                                                        <div className={cx('text-[16px] font-bold text-dark')}>
                                                            {t.symble}
                                                        </div>
                                                        <div className={cx('absolute right-[14px]')}>
                                                            <Image src={t.activeTick} alt="tick" height={12.8} width={15.8} />
                                                        </div>
                                                    </li>
                                                )}
                                            </ul>
                                        </SimpleBar>
                                    </div>
                                </div>}
                            </div>

                        </div>
                    </div>
                    <div className="lg:pt-0 pt-[25px] lg:ml-0 ml-[1px]">
                        <button className={cx('xl:p-[0px_33.5px] p-[0px_20px] h-[33px] xl:m-[0px_16px_0_20px] m-[0px_4px]  rounded-[3px] text-[14px] text-center text-00c896 border border-solid border-00c896 bg-white hover:bg-00c896 hover:text-white')}>Search</button>
                        <button className={cx('xl:p-[0px_33.5px] p-[0px_20px] h-[33px] xl:m-[0px_16px_0_20px] m-[0px_4px] rounded-[3px] text-[14px] text-center text-black border border-solid border-black bg-white hover:bg-black hover:text-white')}>Clear All</button>
                    </div>
                    <div className={cx('lg:absolute lg:right-0 ml-[6px] pt-[25px] lg:pt-[0]')}>
                        <button className={cx('xl:p-[0px_18px_0px_10px] p-[0px_12px_0px_4px] h-[33px] lg:m-[0px_16px_0_20px] rounded-[3px] text-[12px] text-center text-black border border-solid border-black bg-white hover:bg-black hover:text-white')}>
                            <Image className="mr-[5px] mt-[-2px]" src="/assets/images/svg/export.svg" alt="export" height={16} width={16} />
                            Export To Excel</button>
                    </div>
                </div>
                {/* <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={this.handleSelect}
                    /> */}
            </>
        )
    }
}
export default DateFilter;