import styles from "../styles/tradehistory.module.css";
import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import DateFilter from "../components/date-filter";
import { Component } from "react";
interface Props {

}
interface State {
    panelShow: any
}

class TradeHistory extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            panelShow: {}
        };
    }

    transactionData = [
        {
            "id": 1,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 2,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 3,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 4,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 5,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        },
        {
            "id": 6,
            "date": "03-01-23 18:11:18",
            "pairs": "BTC/USDT",
            "side": "/assets/images/svg/buy.svg",
            "sideval": "Buy",
            "price": 15000.00,
            "price_pair": "USDT",
            "amount": "0.001334",
            "amount_pair": "BTC",
            "fee": 0.00000133,
            "fee_pair": "BTC",
            "total": 15.00,
            "total_pair": "USDT",
        }
    ];

    panelToggle = (index: number) => {

        this.setState({
            panelShow: { [index]: !this.state.panelShow[index] }
        })

        console.log('toggle')
    }

    render(): React.ReactNode {
        return (
            <>
                <div>
                    <DateFilter dropVisible={false} />
                </div>
                <div className="pt-[25px] lg:pt-0">
                    <table className="w-full lg:table block">
                        <thead className="border-b-none lg:table-header-group hidden">
                            <tr>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Date</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Pair</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Side</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Price</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Amount</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Fee</th>
                                <th className={cx('bg-white text-left text-[12px] text-777e91 font-medium p-[25px_15px_9px]')}>Total</th>
                            </tr>
                        </thead>
                        <tbody className="lg:table-row-group block">
                            {this.transactionData.map((t: any, index: number) =>
                                <tr className={cx('hover:bg-00c8960a lg:table-row block even:bg-white odd:bg-light cursor-pointer h-auto')} key={t.id}>
                                    <td className={cx('p-[12px_8px_12px_16px] text-[14px] lg:table-cell hidden text-171a1e leading-[0.8px] text-left font-medium')}>{t.date}</td>
                                    <td className={cx('p-[12px_8px_12px_16px] text-[14px] lg:table-cell hidden text-171a1e leading-[0.8px] text-left font-medium')}>{t.pairs}</td>
                                    <td className={cx('lg:p-[12px_8px_12px_16px] p-[12px_16px_12px_16px] text-[14px] lg:hidden flex text-171a1e lg:leading-[0.8px] leading-none text-left font-medium lg:border-none border-b border-solid border-0000000d')}>
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
                                    <td className={cx('p-[12px_8px_12px_16px] text-[14px] lg:table-cell hidden text-171a1e leading-[0.8px] text-left font-medium')}>
                                        <span><Image className="mr-[16px]" src={t.side} alt="buy-sell" height={16} width={16} /></span>
                                        <span className="text-success">{t.sideval}</span>
                                    </td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px]  text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'}  justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Price:</span> <div>{t.price} <span className="text-85919c">{t.price_pair}</span></div></td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px] text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Amount:</span> <div>{t.amount} <span className="text-85919c">{t.amount_pair}</span></div></td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px] text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Fee:</span>    <div>{t.fee} <span className="text-85919c">{t.fee_pair}</span></div></td>
                                    <td className={cx(`lg:p-[12px_8px_12px_16px] p-[5px_16px] text-[14px] lg:table-cell ${this.state.panelShow[index] ? 'flex' : 'hidden'} justify-between items-center text-171a1e leading-[0.8px] text-left font-medium`)}><span className="lg:hidden block text-sm">Total:</span> <div>{t.total} <span className="text-85919c">{t.total_pair}</span></div></td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

            </>
        )
    }
}
export default TradeHistory;