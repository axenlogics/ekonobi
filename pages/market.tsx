import Header from '../components/header';
import SimpleSlider from '../components/carousel-slider/slider';
import styles from '../styles/market.module.css'
import Image from 'next/image';
import { MarketTable } from '../components/market/market-table';
import Footer from './footer';
import EmailWidget from './emailwidget';
import AboutCrypto from './aboutcrypto';
import cx from 'classnames';

export default function Home({ dpopular }: any) {
  return (
    <>
      <Header />
      <div className={cx('container px-4 pt-[10px]')}>
          <SimpleSlider />
          <div className={cx(styles.popular)}>
            <h2 className={'mt-[50px] sm:mt-[90px] text-center text-2xl sm:text-4xl txt-gradient txt-gradient-7'}>Most of The Day</h2>
            <div className={cx('sm:flex max-w-[320px] py-6 px-[42px] md:py-10 lg:px-[54px] md:px-[36px] sm:py-7 sm:px-[20px] lg:max-w-[1040px] md:max-w-[800px] sm:max-w-[630px] lg:max-h-[200px] my-4 mx-auto rounded-[20px] bg-white shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]')}>
              {dpopular.map((item: any, i: number) =>
                <>
                  <div className={cx('lg:w-4/6 md:w-4/12 sm:w-4/12')} key={i}>
                    <div>
                      <div className={cx('font-medium float-left sm:text-xs text-777e91')}>{item.label}</div>
                      <div className={cx(item.changeValue.indexOf('-') > -1 ? 'text-danger' : item.changeValue.indexOf('+') > -1 ? 'text-success' : item.changeValue.indexOf('%') > -1 && (dpopular.length - 1) == i ? 'text-primary' : '','text-right font-poppin text-xs')}>{item.changeValue}</div>
                    </div>
                    <div className={cx('md:text-lg sm:text-base font-bold text-181a1e my-[14px] sm:my-[27px]')}>
                      <div>{item.coin}</div>
                    </div>
                    <div className={cx('flex','items-center')}>
                      <div className='h-8 w-8 sm:h-9 sm:w-9'><Image src={`/assets/images/coins/logo/${item.coin.toLowerCase().replace(' ', '-')}.png`} alt={item.coin} width={36} height={36} /></div>

                      <div className='flex-1'>
                        <div className={cx('text-right text-a2a2a2 text-xs')}>{item.pair}</div>
                        <div className='text-right text-232529 font-bold lg:text-[21px] md:text-[19px]'>{item.value}</div>
                      </div>
                    </div>
                  </div>
                  {(dpopular.length - 1) > i ? <div key={item.coin + item.coin} className={cx('my-5 sm:my-0 lg:ml-[46px] lg:mr-[34px] md:ml-[36px] md:mr-[24px] sm:ml-[26px] sm:mr-[14px] border border-solid border-f8f8f8')}></div> : ''}
                </>
              )}

            </div>
            </div>

            <MarketTable />
            <AboutCrypto />
            <EmailWidget />
        </div>
      <Footer />
    </>
  )
}
export async function getStaticProps() {
  const data = [
    { 'pair': 'PT/TRY', 'coin': 'Aptos', 'logo': 'url', 'label': 'Gainer', 'changeValue': '+5,40%', 'value': '97,08' },
    { 'pair': 'LINK/TRY', 'coin': 'Chainlink', 'logo': 'url', 'label': 'Looser', 'changeValue': '-3,40%', 'value': '137,57' },
    { 'pair': 'USDT/TRY', 'coin': 'Tether', 'logo': 'url', 'label': 'Volume', 'changeValue': '14.2 M', 'value': '18,942' },
    { 'pair': 'USDT/TRY', 'coin': 'Binance Coin', 'logo': 'url', 'label': 'Twitter Sentiment', 'changeValue': '% 92', 'value': '18,942' },
  ];
  // 
  return {
    props: {
      dpopular: data
    }
  }
}