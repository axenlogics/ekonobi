import React, { Component } from 'react';
import Image from 'next/image';
import 'react-tabs/style/react-tabs.css';
import styles from '../style.module.css';
import style from './style.module.css';
import cx from 'classnames';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

interface Props{
    scrollHeight?: number
}

interface State{
    openOrders: any
}

class OpenOrder extends Component<Props, State> {

    constructor(props:any) {

        super(props);
        
        this.state = {
            openOrders: []
        };
    }

    componentDidMount(): void {
        this.setData()
    }


    OrderItem = (item: any, index:number) => (
        <div key={index} className={`${styles.tblrow}`}>
            <div className={cx(styles.tbltd, styles.side_cell)}>
                <Image src="/assets/images/svg/icon_buy.svg" alt="Buy" width={16} height={16} />
            </div>
            <div className={cx(styles.tbltd, styles.pair_cell)}>BTC/TRY</div>
            <div className={cx(styles.tbltd, styles.type_cell)}>Limit</div>
            <div className={cx(styles.tbltd, styles.amt_cell)}> 0.00746300  <span className={styles.txtmute}>BTC</span></div>
            <div className={cx(styles.tbltd, styles.price_cell)}>319.172 <span className={styles.txtmute}>TRY</span></div>
            <div className={cx(styles.tbltd, styles.trigger_cell)}>{item?.rate}</div>
            <div className={cx(styles.tbltd, styles.filled_cell)}>% 65.25 <span className={style.fillbar} style={{background: `linear-gradient(to right, rgb(14, 201, 128) 0%, rgb(14, 201, 128) 65%, rgb(35, 40, 66) 65%, rgb(35, 40, 66) 100%)`}}></span></div>
            <div className={cx(styles.tbltd, styles.date_cell)}>10.12.2022 13:04</div>
            <div className={cx(styles.tbltd, styles.action_cell)}>
                <button type='button' className={styles.btn_cancel}><Image src="/assets/images/svg/x.svg" alt="Cancel" fill /></button>
            </div>
        </div>
    )

    setData = async () => {
        let data = []
        for(var i = 0; i < 6; i++){
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
                            <div className={styles.tblth}>Date</div>
                            <div className={cx(styles.tblth, styles.action_cell)}>Action</div>
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

export default OpenOrder