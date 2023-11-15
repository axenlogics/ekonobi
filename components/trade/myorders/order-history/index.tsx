import React, { Component } from 'react';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';
import styles from '../style.module.css';
import localStyles from './style.module.css';
import cx from 'classnames';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons'

interface Props{
    scrollHeight?: number
}

interface State{
    openOrders: any,
    detailStatus: any
}

class OrderHistory extends Component<Props, State> {

    constructor(props:any) {

        super(props);
        
        this.state = {
            openOrders: [],
            detailStatus: {}
        };
    }

    componentDidMount(): void {
        this.setData()
    }

    handleOrderDetail = (index: number) => {
        this.setState({
            detailStatus: {[index]: !this.state.detailStatus[index]}
        })
    }

    OrderDetail = (item: any, index:number) => (
        <div className={localStyles.order_detail}>
            <h6>Total Trade: 20.00 <span className={styles.txtmute}>USDT</span></h6>
            <div className={cx(styles.tbl, 'flex-1')}>
                <div className={styles.tblthead}>
                    <div className={styles.tblrow}>
                        <div className={styles.tblth}>Amount</div>
                        <div className={cx(styles.tblth, styles.price_cell)}>Order Price</div>
                        <div className={styles.tblth}>Fee</div>
                        <div className={styles.tblth}>Total</div>
                        <div className={styles.tblth}>Date</div>
                    </div>
                </div>
                <div className={styles.tblbody}>
                    <div key={index} className={`${styles.tblrow}`}>
                        <div className={cx(styles.tbltd)}> 0.00746300  <span className={styles.txtmute}>BTC</span></div>
                        <div className={cx(styles.tbltd, styles.price_cell)}>319.172 <span className={styles.txtmute}>TRY</span></div>
                        <div className={cx(styles.tbltd)}>0.0300075 <span className={styles.txtmute}>TRY</span></div>
                        <div className={cx(styles.tbltd)}>15 <span className={styles.txtmute}>TRY</span></div>
                        <div className={cx(styles.tbltd, styles.date_cell)}>10.12.2022 13:04</div>
                    </div>
                    <div key={index} className={`${styles.tblrow}`}>
                        <div className={cx(styles.tbltd)}> 0.00746300  <span className={styles.txtmute}>BTC</span></div>
                        <div className={cx(styles.tbltd, styles.price_cell)}>319.172 <span className={styles.txtmute}>TRY</span></div>
                        <div className={cx(styles.tbltd)}>0.0300075 <span className={styles.txtmute}>TRY</span></div>
                        <div className={cx(styles.tbltd)}>15 <span className={styles.txtmute}>TRY</span></div>
                        <div className={cx(styles.tbltd, styles.date_cell)}>10.12.2022 13:04</div>
                    </div>
                </div>
            </div>  
        </div>
    )



    OrderItem = (item: any, index:number) => (
        <>
        <div key={index} className={`${styles.tblrow}`}>
            <div className={cx(styles.tbltd, styles.side_cell)}>
                <Image src="/assets/images/svg/icon_buy.svg" alt="Buy" width={16} height={16} />
            </div>
            <div className={cx(styles.tbltd, styles.pair_cell)}>BTC/TRY</div>
            <div className={cx(styles.tbltd, styles.type_cell)}>Limit</div>
            <div className={cx(styles.tbltd)}> 0.00746300  <span className={styles.txtmute}>BTC</span></div>
            <div className={cx(styles.tbltd, styles.price_cell)}>319.172 <span className={styles.txtmute}>TRY</span></div>
            <div className={cx(styles.tbltd)}>{item?.rate}</div>
            <div className={cx(styles.tbltd, styles.filled_cell)}>0.000881 <span className={styles.txtmute}>BTC</span></div>
            <div className={cx(styles.tbltd)}>17034.04 <span className={styles.txtmute}>TRY</span></div>
            <div className={cx(styles.tbltd)}>15 <span className={styles.txtmute}>TRY</span></div>
            <div className={cx(styles.tbltd, styles.date_cell)}>10.12.2022 13:04</div>
            <div className={cx(styles.tbltd, styles.status_cell)}>
                <div className={localStyles.btn_toggle} onClick={() => this.handleOrderDetail(index)}>
                    Completed
                    {!this.state.detailStatus[index] && <FontAwesomeIcon icon={faCirclePlus} className='text-mute text-14' />}
                    {this.state.detailStatus[index] && <FontAwesomeIcon icon={faCircleMinus} className='text-mute text-14' />}
                </div>
            </div>
        </div>
        {this.state.detailStatus[index] && this.OrderDetail(item, index)}
        </>
    )

    setData = async () => {
        let data = []
        for(var i = 0; i < 7; i++){
            data.push({rate: (Math.random() * 8).toFixed(3), quantity: (Math.random() * 8).toFixed(8), total: (Math.random() * 8).toFixed(3), spread: Math.random() * 90})
        }

        await this.setState({
            openOrders: data
        })
    }
   
   

    render(){
        
        return (
            <div className={styles.subpanel}>
                <div className={styles.tbl}>
                    <div className={styles.tblthead}>
                    <div className={styles.tblrow}>
                            <div className={cx(styles.tblth, styles.side_cell)}>Side</div>
                            <div className={cx(styles.tblth, styles.pair_cell)}>Pair</div>
                            <div className={cx(styles.tblth, styles.type_cell)}>Type</div>
                            <div className={styles.tblth}>Amount</div>
                            <div className={cx(styles.tblth, styles.price_cell)}>Order Price</div>
                            <div className={styles.tblth}>Trigger Condition</div>
                            <div className={cx(styles.tblth, styles.filled_cell)}>Filled</div>
                            <div className={styles.tblth}>Average Price</div>
                            <div className={styles.tblth}>Total</div>
                            <div className={styles.tblth}>Date</div>
                            <div className={cx(styles.tblth, styles.status_cell)}>Status/Details</div>
                        </div>
                    </div>
                    
                        <div className={cx(styles.tbltbody, 'myorder_tbody')}>
                            <SimpleBar style={{ height: this.props.scrollHeight }}>
                                {this.state.openOrders.map((item:any, index: number) => (
                                    this.OrderItem(item, index)
                                ))}
                            </SimpleBar>
                        </div>
                    
                </div>  
            </div>
        );
    }
}

export default OrderHistory