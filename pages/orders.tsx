import Header from "../components/header";
import styles from "../styles/orders.module.css";
import Footer from "./footer";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OpenOrder from "../components/trade/myorders/open-order";
import OpenOrders from "./openorder";
import TradeHistory from "./tradehistory";
import OrderHistory from "./orderhistory";
import cx from "classnames";
import { Component } from "react";


interface Props {

}
interface State {

}

class Orders extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {};
    }
    render(): React.ReactNode {
        return (
            <>
                <Header/>
                    <section className={cx('lg:p-[50px_94px] p-[50px_0px]')}>
                        <div className={cx('container px-4')}>
                            <div>
                                    <div>
                                        <Tabs defaultIndex={0}  selectedTabClassName={cx('lg:text-[24px] text-[18px] !font-bold leading-normal tracking-normal text-center !border-b-[4px] !border-solid !border-1f4ff4 pb-[8px] pr-[17.5px] pl-[17.5px] txt-gradient-7 txt-gradient')}>
                                            <TabList className={cx('flex align-baseline')}>
                                                <Tab className={cx('flex items-center lg:text-[18px] text-[14px] font-normal leading-normal tracking-normal text-center text-a2a2a2 pr-[17.5px] pl-[17.5px] border-b-[4px] border-solid border-transparent cursor-pointer pb-[8px]')}>
                                                    Open Order
                                                </Tab>
                                                <Tab className={cx('flex items-center lg:text-[18px] text-[14px] font-normal leading-normal tracking-normal text-center text-a2a2a2 pr-[17.5px] pl-[17.5px] border-b-[4px] border-solid border-transparent cursor-pointer pb-[8px]')}>
                                                    Order History
                                                </Tab>
                                                <Tab className={cx('flex items-center lg:text-[18px] text-[14px] font-normal leading-normal tracking-normal text-center text-a2a2a2 pr-[17.5px] pl-[17.5px] border-b-[4px] border-solid border-transparent cursor-pointer pb-[8px]')}>
                                                    Trade History
                                                </Tab>
                                            </TabList>
                                            <div className={cx('max-w-[1508px] h-auto w-full bg-white rounded-[6px] p-[40px_7.5px] mx-auto')}>
                                            <TabPanel>
                                                <OpenOrders/>
                                            </TabPanel>
                                            <TabPanel>
                                                <OrderHistory/>
                                            </TabPanel>
                                            <TabPanel>
                                                <TradeHistory/>
                                            </TabPanel>
                                            </div>
                                        </Tabs>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </section>
    
                <Footer/>
            </>
        )
    }
  
}
export default Orders;