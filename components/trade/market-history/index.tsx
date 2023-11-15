import React, { Component } from "react";
import cx from "classnames";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

declare var window: any;
declare var document: any;

interface Props {
    
}

interface State {
  pair?: any
  marketHistory?: any,
  loaded: boolean,
  orderbookHeight: number,
}

class MarketHistory extends Component<Props, State> {
    odbTbodyRef:any = React.createRef();
    odbTrowRef:any = React.createRef();
    
    constructor(props: Props) {

        super(props);
        
        this.state = {
            marketHistory: [],
            pair: {},
            loaded: false,
            orderbookHeight: 200,
        };
    }
    
    async componentDidMount() {
        this.setData()
   
        this.setOrderBookHeight();

        window.addEventListener('resize', this.setOrderBookHeight);
        
    }

    setOrderBookHeight = async () => {
        
        const odbTbodyHeight = (window.innerHeight / window['zoomUIBy']) - (document.getElementsByClassName('buysell_panel')[0].offsetHeight + this.odbTbodyRef.current.offsetTop + 57)
        const odbTrowHeight = 31;
        const orderToShow = Math.floor(odbTbodyHeight/odbTrowHeight);

        await this.setState({
            orderbookHeight: (orderToShow * odbTrowHeight),
        })

        document.getElementsByClassName('tradingchart')[0].style.height = ((orderToShow * odbTrowHeight) + odbTrowHeight - 7) + 'px';
        
    }



    
    

    pickRate = (item: any) => {}

    OrderItem = (item: any) => {
        return  <React.Fragment>
            {item.rate !== undefined && <div onClick={() => this.pickRate(item)} key={JSON.stringify(item)} className='flex border-b border-solid border-232842'>
                    <div className={cx('flex-1 p-1.5 leading-normal text-left', item.rate > 3000 ? 'text-success' : 'text-danger')}>{item.rate}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.quantity}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.rate}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.time}</div>
                </div>}
            </React.Fragment>
    }

    setData = async () => {
        let marketHistory = []

        for(var i = 0; i < 80; i++){
            marketHistory.push({rate: (Math.random() * 17000).toFixed(2), quantity: (Math.random() * 8).toFixed(8), total: (Math.random() * 8).toFixed(3), time: '11:04:21'})
        }


        await this.setState({
            marketHistory: marketHistory,
        })
    }

    render() {
        return (
            <div className='text-white text-xs text-right overflow-hidden px-2.5 -mx-2.5'>
                <div className='flex border-b border-solid border-232842'>
                    <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5 text-left'>Price</div>
                    <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Amount</div>
                    <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Total</div>
                    <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Time</div>
                </div>
                <div ref={this.odbTbodyRef} style={{height: this.state.orderbookHeight + 'px'}}>
                    <SimpleBar style={{ maxHeight: this.state.orderbookHeight }}>
                        {this.state.marketHistory.map((item:any) => (
                            this.OrderItem(item)
                        ))}
                    </SimpleBar>
                </div>
            </div>
        )
    }

}


export default MarketHistory


