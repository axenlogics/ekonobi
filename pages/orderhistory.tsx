import styles from "../styles/orderhistory.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import React, { Component, useState } from 'react';
import { render } from "react-dom";
import DateFilter from "../components/date-filter";

interface Props {

}

interface State {
    panel: boolean,
    // orders: number[],
    expand: any,
    panelShow: any,
    // color: string,
}

class OrderHistory extends Component<Props, State>{

    constructor(props: Props) {
        super(props)

        this.state = {
            panel: false,
            // orders: [1, 2, 3, 4, 5, 6, 7, 8],
            expand: {},
            panelShow: {}
            // color: "red",
        }
    }


    OrderHistory = [
        {
            "id": 1,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 2,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 3,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 4,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 5,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        },
        {
            "id": 6,
            "date": "03-01-23 18:11:18",
            "trading_price": 17719.23,
            "TP_pair": "USDT",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "stopPrice": "-",
            "filled": "0.001129",
            "fill_pair": "BTC",
            "avrg_price": "17719.23",
            "avrg_price_pairs": "USTD",
            "status": "Completed",
            "src": "/assets/images/svg/dropb.svg",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 20.00,
            "total_pair": "USDT"
        }
    ];

    pannelOpen = async (index: any) => {
        if (this.state.expand[index]) {
            // this.state.expand = {};

            this.setState({ expand: {} });
        } else {
            this.setState({ expand: {} }, () => {
                this.setState({ expand: { [index]: true } });

            });
        }
        await this.setState(prevState => ({
            panel: !prevState.panel
        }));
        // alert(this.state.panel);

    }
    panelToggle = (i: number) => {
        this.setState({
            panelShow: { [i]: !this.state.panelShow[i] },
            expand: {[i]: false}
        })
    }
    render() {
        return (
            <>
                <div>
                    <DateFilter dropVisible={false} />
                </div>
                <div>
                    <table className="w-full lg:table block lg:mt-0 mt-[15px]">
                        <thead className="border-b-none lg:table-header-group hidden">
                            <tr>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Date</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Pair</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Order Type</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Side</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Amount</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Stop Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Filled</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Average Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Total</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Status</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Details</th>
                            </tr>
                        </thead>
                        <tbody className="lg:table-row-group block">
                            {this.OrderHistory.map((item: any, index: any) => {
                                return (
                                    <>
                                        <tr className={cx('hover:bg-00c8960a even:bg-white lg:table-row block odd:bg-light cursor-pointer h-auto')}>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] lg:table-cell hidden xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium')}>{item.date}</td>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] lg:table-cell hidden text-[12px] text-171a1e leading-normal text-left font-medium')}>{item.pairs}</td>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] lg:table-cell hidden text-171a1e leading-normal text-left font-medium')}>{item.ordertype}</td>
                                            <td className={cx('xl:p-[12px_8px_12px_16px] p-[12px_5px] lg:hidden flex xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:border-none border-b border-solid border-0000000d')}>
                                                <div className="left">
                                                    <div className="lg:hidden block pb-[10px] lg:pb-0">
                                                        {item.pairs}
                                                    </div>
                                                    <div className="lg:hidden block">
                                                        <span><Image className="mr-[16px]" src={item.side} alt="buy-sell" height={16} width={16} /></span>
                                                        <span className="text-success">{item.sideval}</span>
                                                    </div>
                                                </div>
                                                <div className="ml-auto">
                                                    <div className="lg:hidden block pb-[10px] lg:pb-0">20 USDT</div>
                                                    <div className="lg:hidden block">{item.date}</div>
                                                </div>
                                                <button className="flex pt-[10px]" onClick={() => this.panelToggle(index)}>
                                                    <Image src="/assets/images/svg/dropb.svg" alt="drop" height={8.14} width={14.77} />
                                                </button>
                                            </td>
                                            <td className={cx('lg:table-cell hidden xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium')}>
                                                <span><Image className="mr-[5px]" src={item.side} alt="buy-sell" height={16} width={16} /></span>
                                                <span className="text-success">Buy</span>
                                            </td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Price:</span><div>{item.price} <span className="text-85919c">{item.price_pair}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Amount:</span><div>{item.amount} <span className="text-85919c">{item.amount_pair}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Stop Price:</span>{item.stopPrice}</td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Filled:</span><div>{item.filled} <span className="text-85919c">{item.fill_pair}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">AVG Price:</span><div>{item.avrg_price} <span className="text-85919c">{item.avrg_price_pairs}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Total:</span><div>{item.total} <span className="text-85919c">{item.total_pair}</span></div></td>
                                            <td className={cx(`xl:p-[12px_8px_12px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}>
                                                <span className="flex items-center justify-between w-full">
                                                    <span className="lg:hidden text-sm">Status:</span>
                                                    <div className="flex items-center">
                                                    <div className="h-[8px] w-[8px] rounded-[50%] bg-success mr-[10px]"></div>
                                                    <div>{item.status}</div>
                                                    </div>
                                                </span>
                                            </td>
                                            <td className={cx('lg:table-cell hidden p-[22px_8px_22px_16px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-right font-medium')} onClick={() => this.pannelOpen(index)}>
                                                <Image src={item.src} alt="drop" height={8.14} width={14.77} />
                                            </td>
                                            <td className={cx(`pb-[15px] lg:hidden ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-center`)} onClick={() => this.pannelOpen(index)}>
                                                <button className={cx('hover:bg-white p-[7.5px_13px] rounded-[3px] border border-solid border-dedee3 bg-FBFBFB xl:text-[14px] text-[12px] leading-[0.56] text-left align-middle text-171a1e ml-[10px] font-bold')}>
                                                    Show More
                                                </button>
                                            </td>
                                        </tr>
                                        {
                                            this.state.expand[index] &&
                                            <tr className="bg-white lg:table-row block">
                                                <td className="p-[15px_13px] lg:table-cell block" colSpan={12}>
                                                    <div className="lg:flex">
                                                        <div>
                                                            <span className={cx('xl:text-[14px] text-[12px] font-bold')}>TOTAL TRADE: </span>
                                                            <span className={cx('xl:text-[14px] text-[12px] font-bold')}>{item.total} {item.total_pair}</span>
                                                        </div>
                                                        <div className={cx('w-full')}>
                                                            <table className={cx('w-full')}>
                                                                <thead className="lg:table-header-group hidden">
                                                                    <tr>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Date</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Trading Price</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Amount</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Fee</th>
                                                                        <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[0px_15px_9px]')}>Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="lg:table-row-group">
                                                                    <tr className={cx('lg:table-row block hover:bg-00c8960a even:bg-white odd:bg-light cursor-pointer h-auto')}>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Date:</span>{item.date}</td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Trading Price:</span><div>{item.trading_price} <span className="text-85919c">{item.TP_pair}</span></div></td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Amount:</span><div>{item.amount} <span className="text-85919c">{item.amount_pair}</span></div></td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Fee:</span> <div>{item.fee} <span className="text-85919c">{item.fee_pair}</span></div></td>
                                                                        <td className={cx(`lg:p-[22px_8px_22px_16px] p-[12px_5px] xl:text-[14px] text-[12px] text-171a1e leading-normal text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center`)}><span className="lg:hidden block text-sm">Total:</span><div><span className="font-bold">{item.total}</span>{item.total_pair}</div></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        }
                                    </>
                                )
                            })}


                        </tbody>
                    </table>

                </div>

            </>
        )
    }
}
export default OrderHistory;