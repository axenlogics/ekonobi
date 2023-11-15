import Script from 'next/script'
import styles from './style.module.css';
import { Component } from 'react';
import cx from 'classnames';

declare var document:any;


interface Props {
  
}

interface State {
    
}

class Chart extends Component<Props, State>  {
    constructor(props:any) {

        super(props);
        
        this.state = {
            
        };
    }

    componentDidMount(): void {

    }

    render(){
        
        return (
        <>
            <Script src="/assets/datafeeds/udf/dist/bundle.js" />
            <Script src="/assets/charting_library/charting_library.standalone.js" />
            <Script src="/assets/chartinit.js?ver=128" />
            <div id='tradingchart' className={cx(styles.tradingchart, 'tradingchart')}></div>
        </>
        );
    }
}

export default Chart