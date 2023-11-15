import React, { Component } from "react";
import Header, { NavbarSize, NavbarType } from "../components/header";
import { PairsManager } from "../models/market";
import { Router } from "next/dist/client/router";
import EasyBuysell from "../components/easy-buysell";



declare var window: any;
declare var document: any;

interface Props {
    router: Router;
    mainPairId: number;
}

interface State {
    marketStats: any,
    chartStatus: boolean
}

class TradeEasyPage extends Component<Props, State> {

    private _isMounted = false;
    constructor(props: Props) {
        super(props);

        this.state = {
            marketStats: [],
            chartStatus: true
        };
    }



    initPairs = () => {
        PairsManager.getInstance().initPairs();
    }



    componentDidMount() {

        this._isMounted = true;

        if (this._isMounted) {
            this.initPairs();
            const dt = [{ name: 'BTC / TRY', rate: 319.283, trend: 2.81, trendup: false, time: '02:17' },
            { name: 'ETH / TRY', rate: 800.475, trend: 2.81, trendup: true, time: '02:17' },
            { name: 'AVAX / TRY', rate: 257.1, trend: 2.81, trendup: false, time: '02:17' },
            { name: 'XRP / TRY', rate: 0.8, trend: 2.81, trendup: true, time: '02:17' }
            ]
            this.setState({ marketStats: dt })
        }
    }


    render() {
        return (
            <React.Fragment>
                <Header navbarType={NavbarType.dark} navbarSize={NavbarSize.sm} contClassName='max-w-full' logoText={false} searchEnabled={false} />
                <div className='container max-w-580 mt-50'>
                    <EasyBuysell />
                </div>
                
                <style>
                    {
                        `
                        html {
                            transform-origin: top left;
                            overflow: hidden;
                            background-color: #101123;
                        }
                        body{
                            background-color: #101123;
                        }
                     `
                    }
                </style>
            </React.Fragment>
        );
    }
}


export default TradeEasyPage


