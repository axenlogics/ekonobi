import React, { Component } from "react";

declare var window: any;
declare var document: any;

interface Props {
    pickrt?: any;
    isTradeTablet?: boolean
}

interface State {
  pair?: any
  buyOrderBook?: any,
  sellOrderBook?: any,
  loaded: boolean,
  orderBookType?: number,
  buyTotal?: any,
  sellTotal?: any,
  orderbookHeight: number,
  orderToShow: number,
}

class OrderBook extends Component<Props, State> {
    odbTbodyRef:any = React.createRef();
    odbTrowRef:any = React.createRef();

    private _isMounted = false; 
    
    constructor(props: Props) {

        super(props);
        
        this.state = {
            buyOrderBook: [],
            sellOrderBook: [],
            pair: {},
            loaded: false,
            orderBookType: 0,
            orderbookHeight: 200,
            orderToShow: 8
        };
    }

    updateOrderBook = async () => {}

    private async updateOrdeBookState() {
        // const buyOrderToShow = 8;
        // const sellOrderToShow = 8;

        let sellOrderBook:any = [];
        let buyOrderBook:any = [];
    }
    
    async componentDidMount() {

        this._isMounted = true;

        if(this._isMounted){
        
            this.setData()
            
            this.setOrderBookHeight();

            window.addEventListener('resize', this.setOrderBookHeight);
        }
        
    }

    componentWillUnmount(): void {
        this._isMounted = false;

        window.removeEventListener('resize', this.setOrderBookHeight)
    }

    setOrderBookHeight = async () => {
        
        const odbTbodyHeight = (window.innerHeight / window['zoomUIBy']) - (document.querySelector('.buysell_panel').offsetHeight + this.odbTbodyRef.current.offsetTop + 57)
        const odbTrowHeight = 31;
        const orderToShow = this.props.isTradeTablet ? 10 : Math.floor(odbTbodyHeight/odbTrowHeight);

        await this.setState({
            orderbookHeight: (orderToShow * odbTrowHeight),
            orderToShow: orderToShow
        })

        document.querySelector('.tradingchart').style.height = ((orderToShow * odbTrowHeight) + odbTrowHeight - 7) + 'px';
        
    }




    pickRate = (rate: number) => {
         this.props.pickrt(rate);
    }

    OrderItemBuy = (item: any,index: number) => {
        return <React.Fragment key={JSON.stringify(item)}>
            {item.rate !== undefined && <div onClick={() => this.pickRate(item.rate)} className={`flex relative z-10 cursor-pointer border-b border-solid border-232842 before:absolute before:top-0 before:bottom-[-1px] before:${item.active ? 'w-2' : 'w-0'} before:left-[-10px] before:bg-[#184538]`}>
                
                    <div className='absolute top-0 h-full -z-10 right-0 bg-[#184538]' style={{width: item.spread + '%'}}></div>
                    <div className='flex-1 p-1.5 leading-normal sm:order-2 ms-sm:text-left pr-[11px]'>{item.rate}</div>
                    <div className='flex-1 p-1.5 leading-normal sm:order-1'>{item?.quantity}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.total}</div>
                </div>}
                {item.rate === undefined && <div className='flex'>
                    <div className='flex-1 p-1.5 leading-normal'>-</div>
                    <div className='flex-1 p-1.5 leading-normal'>-</div>
                    <div className='flex-1 p-1.5 leading-normal'>-</div>
                    </div>}
            </React.Fragment>
    }

    OrderItemSell = (item: any, index: number) => {
        return <React.Fragment key={JSON.stringify(item)}>
            {item.rate !== undefined && <div onClick={() => this.pickRate(item.rate)} className={`flex relative z-10 cursor-pointer border-b border-solid border-232842 before:absolute before:top-0 before:bottom-[-1px] before:${item.active ? 'w-2' : 'w-0'} before:right-[-10px] before:bg-[#4f2332]`}>
                    <div className='absolute top-0 h-full -z-10 left-0 bg-[#4f2332]' style={{width: item.spread + '%'}}></div>
                    <div className='flex-1 p-1.5 leading-normal text-left pl-[11px]'>{item.rate}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.quantity}</div>
                    <div className='flex-1 p-1.5 leading-normal'>{item?.total}</div>
                </div>}
                {item.rate === undefined && <div className='flex'>
                    <div className='flex-1 p-1.5 leading-normal text-left'>-</div>
                    <div className='flex-1 p-1.5 leading-normal'>-</div>
                    <div className='flex-1 p-1.5 leading-normal'>-</div>
                    </div>}
                </React.Fragment>
    }

    setData = async () => {
        let buyOrderBook = []
        let sellOrderBook = []
        for(var i = 0; i < 80; i++){
            buyOrderBook.push({rate: (Math.random() * 17065).toFixed(3), quantity: (Math.random() * 8).toFixed(6), total: (Math.random() * 8).toFixed(3), spread: Math.random() * 90, active: Math.random() > 0.5 ? true : false})
        }

        for(var i = 0; i < 80; i++){
            sellOrderBook.push({rate: (Math.random() * 17000).toFixed(3), quantity: (Math.random() * 7).toFixed(6), total: (Math.random() * 7).toFixed(3), spread: Math.random() * 90, active: Math.random() > 0.8 ? true : false})
        }

        await this.setState({
            buyOrderBook: buyOrderBook,
            sellOrderBook: sellOrderBook
        })
    }

    render() {
        return (
            <div className="grid sm:grid-cols-2">
                <div className='text-white text-xs text-right overflow-hidden px-2.5 -mx-2.5'>
                        <div className="flex relative z-10 border-b border-solid border-232842">
                            <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5 pr-[11px] sm:order-2 ms-sm:text-left'>Price (TRY)</div>
                            <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5 sm:order-1'>Amount (BTC)</div>
                            <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Total (TRY)</div>
                        </div>
                    
                    <div ref={this.odbTbodyRef} style={{height: this.state.orderbookHeight + 'px'}}>
                        {this.state.buyOrderBook.map((item:any,index: number) => (
                            this.OrderItemBuy(item,index)
                        ))}
                    </div>
                </div>
                <div className='text-white text-xs text-right overflow-hidden px-2.5 -mx-2.5'>
                    <div className="flex relative z-10 border-b border-solid border-232842">
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5 pl-[11px] text-left'>Price (TRY)</div>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Amount (BTC)</div>
                        <div className='flex-1 text-8d90b0 font-medium text-[11px] leading-loose py-[7px] px-1.5'>Total (TRY)</div>
                    </div>
                    <div style={{height: this.state.orderbookHeight + 'px'}}>
                        {this.state.sellOrderBook.map((item:any, index: number) => (
                            this.OrderItemSell(item,index)
                        ))}
                    </div>
                </div>
            </div>
        );
    }

}


export default OrderBook


