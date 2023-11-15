import React, { Component } from 'react';
import styles from './style.module.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OpenOrder from './open-order';
import TradeHistory from './trade-history';
import OrderHistory from './order-history';
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

declare var document: any;

interface Props {
    chartStatus?: boolean,
    toggleChart?: (() => void)
}
  
interface State {
    checked: boolean,
    scrollHeight: number
}

class MyOrders extends Component<Props,State> {

    private _isMounted = false; 
    private chartHeight = 0;

    constructor(props: Props) {
  
      super(props);
  
        this.state = { 
            checked: false,
            scrollHeight: 0
        };
    }
  
    componentDidMount(): void {

        this._isMounted = true;

        if(this._isMounted){
            this.setScrollHeight()

            window.addEventListener('resize', this.setScrollHeight)
        }
    }

    componentWillUnmount(): void {
        this._isMounted = false;

        window.removeEventListener('resize', this.setScrollHeight)
    }

    setScrollHeight = async () => {

        const buysellHeight = document.querySelector('.buysell_panel').offsetHeight;
        const mytbodyOffset = document.querySelector('.myorder_tbody').offsetTop;

        let scrollHeight;

        if(this.props.chartStatus){
            scrollHeight = buysellHeight - (mytbodyOffset + 4);    
        } else {
            scrollHeight = (this.chartHeight + buysellHeight) - (mytbodyOffset + 4);    
        }
        
        this.setState({
            scrollHeight: scrollHeight
        })
    }

    handleChange = (checked:boolean) => {
        this.setState({ checked });
    }

    cancelAllOrders =  () => {
        alert('Cancel all orders')
    }

    toggleChart = async () => {

        if(this.props.chartStatus)
        this.chartHeight = document.querySelector('.chart_panel').offsetHeight;

        if(this.props.toggleChart)
        await this.props.toggleChart()

        await this.setScrollHeight()

    }


    render(){
        
        return (
            <React.Fragment>
                <div className={styles.myorder_actions}>
                    <div className={styles.hidebtn}>
                        <label>
                            <span>Hide Other Pairs</span>
                            <Switch checked={this.state.checked} onChange={this.handleChange} checkedIcon={false} offColor='#232842' onColor='#2152fa' onHandleColor='#8c8fae' offHandleColor='#8c8fae' uncheckedIcon={false} width={34} height={17}  />
                        </label>
                    </div>
                    <button className={styles.cancelall_btn} type='button' onClick={this.cancelAllOrders}>Cancel All Orders</button>
                    <button className={styles.toggle_btn} type='button' onClick={this.toggleChart}>
                        {this.props.chartStatus && <FontAwesomeIcon icon={faAngleUp} style={{fontSize: 22, color: '#8c8fae'}} />}
                        {!this.props.chartStatus && <FontAwesomeIcon icon={faAngleDown} style={{fontSize: 22, color: '#8c8fae'}} />}
                    </button>
                </div>
                <Tabs className='myorder_tabs' selectedTabClassName={styles.bsmtab_selected}>
                    <TabList className={styles.bsmtab_list}>
                        <Tab className={styles.bsmtab}>Open Orders</Tab>
                        <Tab className={styles.bsmtab}>Order History</Tab>
                        <Tab className={styles.bsmtab}>Trade History</Tab>
                    </TabList>
                    <TabPanel>
                        <OpenOrder scrollHeight={this.state.scrollHeight}/>
                    </TabPanel>
                    <TabPanel>
                        <OrderHistory scrollHeight={this.state.scrollHeight}/> 
                    </TabPanel>
                    <TabPanel> 
                        <TradeHistory scrollHeight={this.state.scrollHeight}/> 
                    </TabPanel>
                </Tabs>
                <style>
                    {
                        `
                        .simplebar-track.simplebar-vertical{
                            width: 8px !important;
                        }
                        .simplebar-track{
                            right: -8px;
                        }
                        .simplebar-scrollbar:before{
                            background: #2152fa;
                        }
                        `
                    }
                </style>
            </React.Fragment>
        );
    }
}

export default MyOrders