import styles from "../styles/openorder.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import { Component } from "react";
interface Props {

}
interface State {
    panelShow: any
}

class OpenOrders extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            panelShow: {}
        };
    }

    OpenOrderData = [
        {
            "id": 1,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 2,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 3,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 4,
            "date": "09-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 5,
            "date": "05-01-23 15:11:18",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.10,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        },
        {
            "id": 6,
            "date": "02-01-23 12:03:15",
            "pairs": "BTC/USDT",
            "ordertype": "Limit",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 150550.00,
            "price_pair": "USDT",
            "amount": "0.001359",
            "amount_pair": "BTC",
            "filled": 0.00,
            "total": 20.39,
            "total_pair": "USDT",
            "Tcondition": "-",
            "action": "/assets/images/svg/cross.svg"
        }
    ];
    panelToggle = (index: number) => {
        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })
    }
    render(): React.ReactNode {
        return (
            <>
                <div className="text-right">
                    <button className={cx('hover:bg-white p-[7.5px_13px] rounded-[3px] border border-solid border-dedee3 bg-FBFBFB xl:text-[14px] text-[12px] leading-[0.56] text-left align-middle text-171a1e ml-[10px] font-bold')}>
                        <span>
                            <Image className={cx('align-middle mr-[12px]')} src="/assets/images/svg/cross.svg" alt="Cancel Button" height={12.81} width={12.81} />
                        </span>
                        Cancel All
                    </button>
                </div>
                <div>
                    <table className={cx('w-full lg:table block lg:pt-0 pt-[15px]')}>
                        <thead className={cx('border-b-none lg:table-header-group hidden')}>
                            <tr className={cx('')}>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Date</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Pair</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Order Type</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Side</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Price</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Amount</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Filled</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Total</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_12px_9px]')}>Trigger condition</th>
                                <th className={cx('bg-white text-right text-[12px] text-777e91 font-medium p-[25px_10px_9px_15px]')}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="lg:table-row-group block">
                            {this.OpenOrderData.map((t: any, index: any) => (
                                <tr className={cx('hover:bg-00c8960a lg:table-row block even:bg-white odd:bg-light cursor-pointer h-auto')} key={t.id}>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] text-171a1e xl:leading-[0.8px] tracking-normal text-left font-medium lg:table-cell hidden')}>{t.date}</td>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] text-171a1e xl:leading-[0.8px] text-left font-bold lg:table-cell hidden')}>{t.pairs}</td>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] text-171a1e xl:leading-[0.8px] text-left font-medium lg:table-cell hidden')}>{t.ordertype}</td>
                                    <td className={cx('lg:p-[12px_8px_12px_16px] p-[12px_16px_12px_16px] xl:text-[14px] text-[12px] lg:hidden flex text-171a1e xl:leading-[0.8px] text-left font-medium lg:border-none border-b border-solid border-0000000d')}>
                                        <div className="left">
                                            <div className="lg:hidden block pb-[10px] lg:pb-0">
                                                {t.pairs}
                                            </div>
                                            <div className="lg:hidden block">
                                                <span><Image className="mr-[16px]" src={t.side} alt="buy-sell" height={16} width={16} /></span>
                                                <span className="text-success">{t.sideval}</span>
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <div className="lg:hidden block pb-[10px] lg:pb-0">20 USDT</div>
                                            <div className="lg:hidden block">{t.date}</div>
                                        </div>
                                        <button className="flex pt-[10px]" onClick={() => this.panelToggle(index)}>
                                            <Image src="/assets/images/svg/dropb.svg" alt="drop" height={8.14} width={14.77} />
                                        </button>
                                    </td>
                                    <td className={cx('p-[12px_8px_12px_16px] xl:text-[14px] text-[12px] lg:table-cell hidden text-171a1e xl:leading-[0.8px] text-left font-medium')}>
                                        <span><Image className={cx('xl:mr-[16px] mr-[5px]')} src={t.side} alt="buy-sell" height={16} width={16} /></span>
                                        <span className={cx('text-success xl:text-[14px] text-[12px]')}>{t.sideval}</span>
                                    </td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Price:</span> <div>{t.price}<span className="text-85919c"> {t.price_pair}</span></div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Amount:</span> <div>{t.amount}<span className="text-85919c">{t.amount_pair}</span></div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Filled:</span> <div>{t.filled} %</div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-right font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Total Price:</span> <div>{t.total}<span className="text-85919c"> {t.total_pair}</span></div></td>
                                    <td className={cx(`p-[12px_8px_12px_16px] xl:text-[14px] text-[14px] text-171a1e xl:leading-[0.8px] text-left font-medium lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} items-center justify-between`)}><span className="lg:hidden block text-sm">Triggerd Condition:</span> <div>{t.Tcondition}</div></td>
                                    <td className={cx(`pb-[15px] lg:hidden ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-center`)}>
                                        <button className={cx('hover:bg-white p-[7.5px_13px] rounded-[3px] border border-solid border-dedee3 bg-FBFBFB xl:text-[14px] text-[12px] leading-[0.56] text-left align-middle text-171a1e ml-[10px] font-bold')}>
                                            <span>
                                                <Image className={cx('align-middle mr-[12px]')} src="/assets/images/svg/cross.svg" alt="Cancel Button" height={12.81} width={12.81} />
                                            </span>
                                            Cancel Order
                                        </button>
                                    </td>
                                    <td className="text-right pr-[10px] lg:table-cell hidden">
                                        <Image src={t.action} alt="cross" height={12} width={12} />
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                </div>
            </>
        )
    }
}
export default OpenOrders;