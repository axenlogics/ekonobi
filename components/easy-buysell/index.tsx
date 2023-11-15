import { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, ButtonType } from '../button';
import InputNumeric from '../input-numeric';
import styles from './style.module.css';
import cx from 'classnames';
import { BuySellI } from '../../helpers/interfaces';
import PairMenu from '../trade/pair-menu';


interface Props{
    
}

interface State extends BuySellI {
    orderSide: any,
    bstabSelected: any,
    rangeValue: any
}

class EasyBuySell extends Component<Props, State> {

    rangeItems = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

    constructor(props:any) {

        super(props);
        
        this.state = {
            orderSide: ['buy', 'sell'],
            bstabSelected: 'buy',
            rangeValue: 0
        };
    }

    onTabChange(side: string) {
        this.setState({bstabSelected: side})
    }

    handleRangeChange = (event:any) => {
        this.setState({rangeValue: event.target.value});
    }

    handleRangeStep = (step:any) => {
        this.setState({rangeValue: step});
    }
   

    render(){
        
        return (
            <>
                <PairMenu pairSelectorV2={true} />
                <Tabs className={styles.bstabs} selectedTabClassName={styles[`bstab_selected_${[this.state.bstabSelected]}`]}>
                    <TabList className={styles.bstab_list}>
                        <Tab onClick={() => this.onTabChange('buy')} className={styles.bstab}>Buy</Tab>
                        <Tab onClick={() => this.onTabChange('sell')} className={styles.bstab}>Sell</Tab>
                    </TabList>
                    {this.state.orderSide.map((side:any, index:number) => (
                        <TabPanel key={index}>
                        <div className='row'>
                            <div className='col'>
                                <InputNumeric inputGroupClassName={styles.input_group} spinClassName={styles.spin} fcClassName={styles.form_control} prependClassName={styles.input_prepend} type="number" placeholder="0,00" prependTxtS="Price" prependTxtL="Try"/>
                            </div>
                            <div className='col'>
                                <InputNumeric type="number" inputGroupClassName={styles.input_group} spinClassName={styles.spin} fcClassName={styles.form_control} prependClassName={styles.input_prepend} placeholder="0,00000000" prependTxtS="Amount" prependTxtL="Btc" />
                            </div>
                        </div>
                        <div className={styles.range_slider}>
                            <input 
                                type="range" 
                                min="0" max="100" 
                                value={this.state.rangeValue} 
                                onChange={this.handleRangeChange}
                                className={cx(styles.input_range, styles[side])}
                                style={{background: side === 'buy' ? `linear-gradient(to right, #0ec980 0%, #0ec980 ${this.state.rangeValue}%, #232842 ${this.state.rangeValue}%, #232842 100%)` : `linear-gradient(to right, #E94158 0%, #E94158 ${this.state.rangeValue}%, #232842 ${this.state.rangeValue}%, #232842 100%)`}}
                                />
                            <div className={styles.range_steps}>
                                {this.rangeItems.map((step) => (
                                    <button key={step} onClick={() => this.handleRangeStep(step)} className={styles.range_step} type="button" value="0">{step}%</button>
                                ))}
                            </div>
                        </div>
                        <div className={styles.balance_stats}>
                            <div className={styles.balance_stat}>
                                <div className={styles.balance_txt}>Available / Total <span className='text-white'>TRY</span> Balance</div>
                                <div className={styles.balance_txt}><span className='text-white'>1.252,44</span> / 483.239,34 TRY</div>
                            </div>
                            <div className={styles.balance_stat}>
                                <div className={styles.balance_txt}>Available / Total BTC Balance</div>
                                <div className={styles.balance_txt}>0,35261721 / 1,36273843 BTC</div>
                            </div>
                        </div>
                    </TabPanel>
                    ))}
                </Tabs>
                <Button type={this.state.bstabSelected === "buy" ? ButtonType.success : ButtonType.danger} className={cx(styles.btn_buysell)}>Buy BTC </Button>
            </>
        );
    }
}

export default EasyBuySell