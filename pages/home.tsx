import styles from "../styles/homemain.module.css";
import cx from "classnames";
import Link from 'next/link';
import EmailWidget from "./emailwidget";
import Image from "next/image";
import { Component } from "react";
import bg from "../public/assets/images/hero-image-bg.svg";
import AboutCrypto from "./aboutcrypto";
import MartketOpportunities from "../components/market-opportunities";


interface Props{

}

interface State {
    banFontSize: number
}

class HomeMain extends Component<Props, State> {
    _isMounted = false; 

    titles = [
        {

           "id" : 1,
           "title" : "Top Gainer",
           "alt" : "Gainer",
           "faawsome" : 'la-mountain'       
       } ,
       {

           "id" : 2,
           "title" : "Surge",
           "alt" : "surge",
           "faawsome" : 'la-chart-line'           
       } ,
       {

           "id" : 3,
           "title" : "New Listing",
           "alt" : "New Listing",
           "faawsome" : 'la-bolt'
       }      
   ];

    oldWindowWidth = 1440;

    constructor(props:Props){
        super(props)

        this.state = {
            banFontSize: 16
        } 
    }

    componentDidMount(): void {

        this._isMounted = true;

        if(this._isMounted){
            this.setBannerSize()

            window.addEventListener('resize', this.setBannerSize)
        }
    }

    
    componentWillUnmount(): void {
        this._isMounted = false;

        window.removeEventListener('resize', this.setBannerSize)
    }
    

    setBannerSize = () => {
        const newWindowWidth = window.outerWidth;

        if (newWindowWidth < this.oldWindowWidth && newWindowWidth >= 1200) {
            this.setState({
                banFontSize:  15
            })
        } else if (newWindowWidth >= 1024 && newWindowWidth < 1200) {
            this.setState({
                banFontSize:  12.5
            })
        } else {
            this.setState({
                banFontSize:  16
            })
        }
    }

    render() {
        
    
    return (
        <>
            <section className={cx('bg-light')}>
                <div className={cx('container max-w-1230')}>
                    <div className={cx(styles.banner, 'flex sm:justify-between justify-center lg:h-[840px] md:h-[640px] sm:h-[540px] p-[54px_11px_0px] bg-center')} style={{ backgroundImage: `url(${bg.src})` }}>
                        <div className={cx('inline-block self-center mt-[-44px]')}>
                            <h1 className={cx('leading-[1.3] lg:text-[90px] md:text-[60px] sm:text-[40px] tracking-normal txt-gradient txt-gradient-1 mb-[17px] sm:text-left text-center')}>Stay<br /> Earned.</h1>
                            <h4 className={cx('lg:text-[24px] text-[18px] leading-normal tracking-normal font-medium text-85919c sm:text-left text-center')}>Discover the new ways to<br />earn every day.</h4>
                        </div>
                        <div>
                        </div>
                        <div className={cx(styles.rightCircle, 'hidden sm:block ms-lg:!text-[10px] ms-md:!text-[8px]')} style={{ fontSize: this.state.banFontSize }}>
                            <div className={styles.cricle1}>
                                <div>
                                    <img src="/assets/upordown.png" alt="description of image" />
                                </div>
                                <div className={styles.headingtop}>Up or Down?</div>
                                <div className={styles.para}>Win up to 1.000 TRY daily</div>
                            </div>
                            <div className={styles.cricle2}>
                                <div>
                                    <img src="/assets/refral.png" alt="description of image" />
                                </div>
                                <div className={styles.para}>Points based active referrals</div>
                            </div>
                            <div className={styles.cricle3}>
                                <div>
                                    <img src="/assets/guessprice.png" alt="description of image" />
                                </div>
                                <div className={styles.headingtop}>Guess the price,<br />Win the prize!</div>
                                <div className={styles.para}>Win up to 1.000 TRY daily</div>
                            </div>
                            <div className={styles.cricle4}>
                                <div>
                                    <img src="/assets/pointbased.png" alt="description of image" />
                                </div>
                                <div className={styles.para}>Points based trade grade</div>
                            </div>
                            <div className={styles.cricle5}>
                                <div>
                                    <img src="/assets/autoinvest.png" alt="description of image" />
                                </div>
                                <div className={styles.headingtop}>Auto-Invest</div>
                                <div className={styles.para}>Points based auto-invest grade</div>
                            </div>
                            <div className={styles.cricle6}>
                                <div>
                                    <img src="/assets/regularsession.png" alt="description of image" />
                                </div>
                                <div className={styles.para}>Points based regular sessions</div>
                            </div>
                            <div className={styles.cricle7}>
                                <div>
                                    <img src="/assets/fundinggrade.png" alt="description of image" />
                                </div>
                                <div className={styles.para}>Points based funding grade</div>
                            </div>
                            <div className={styles.cricle8}>
                                <div>
                                    <img src="/assets/activities.png" alt="description of image" />
                                </div>
                                <div className={styles.headingtop}>Earn points in every activities</div>
                                <div className={styles.para}>Chance to win monthly rewards</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={cx('relative sm:top-[-79px] px-[30px] sm:text-left text-center')}>
                            <p className={cx('lg:text-[18px] text-[16px] font-normal leading-normal tracking-normal text-c5c5c5 mb-[20px]')}>Start trading with <span className={cx('font-medium text-85919c')}>zero commission</span></p>
                            <div className={cx('max-w-[478px] w-[100%] sm:mx-0 mx-auto')}>
                                <div className={cx('relative')}>
                                    <input className={cx('lg:max-w-[478px] mx-w-[100%] w-[100%] lg:h-[60px] h-[45px] lg:text-[18px] font-medium leading-normal tracking-normal text-2152FA p-[10px_8px_10px_37px] rounded-[30px] shadow-[5px_5px_10px_0_rgba(0,0,0,0.08)]  border border-2152FA bg-white outline-0 text-left placeholder-primary')} type="text" placeholder="Mobile / E-mail" />
                                    <span className={cx('lg:max-w-[178px] max-w-[130px] w-[100%] lg:h-[60px] h-[45px] lg:p-[14px_0px] p-[11px_0px] opacity-[.99] rounded-[30px] bg-gradient-degree absolute top-0 right-0 rounded-l-none text-[17px] lg:text-[21px] font-medium leading-normal tracking-normal text-center text-white cursor-pointer')}>
                                        Start Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section Market Opportunities */}
            {/* redprice class is for red color text */}
            <section className={cx('pt-[69px] sm:pb-[139px] pb-[70px]')}>
                <div className={cx('container sm:p-[0px_30px] p-[0px_20px]')}>
                    <h2 className={cx('mb-[30px] text-center')}>
                        <span className="text-[28px] md:text-[36px] leading-normal tracking-normal font-bold txt-gradient txt-gradient-2">Catch the Market Opportunities</span>
                    </h2>
                    <div className={cx('lg:gap-11 lg:columns-3')}>
                        {this.titles.map((t: any) => (
                            <MartketOpportunities  key={t} title={t.title} icon={t.faawsome} />
                        ))}
                    </div>
                    <div className={cx('pt-18 text-center')}>
                        <Link href="/#" className={cx('text-[14px] font-medium leading-normal tracking-normal text-d1d1d1')}>
                            Go to Market Analysis Page
                        </Link>
                    </div>
                </div>
            </section>
            {/* Section Market Opportunities */}
            {/* Section just few  */}
            <section>
                <div className={cx('container max-w-1230 px-4')}>
                    <h2 className={cx('mb-[30px] text-center')}>
                        <span className="text-[28px] md:text-[36px] leading-normal tracking-normal font-bold txt-gradient txt-gradient-2">Just in a few minutes</span>
                    </h2>
                    <div className={cx('lg:flex lg:justify-center')}>
                        <div className={cx('mx-5 xl:mx-20')}>
                            <div className={cx('h-[200px] xl:w-[200px] min-h-[200px] relative text-center')}>
                                <Image src="/assets/account.png" alt="Create Account" width={200} height={200} />
                            </div>
                            <h4 className={cx('text-center text-[18px] xl:text-[24px]')}>Create Account</h4>
                            <p className={cx('font-normal text-828899 text-center text-[12px] xl:text-[14px]')}>Sign up and verify your account</p>
                        </div>
                        <div className={cx('lg:flex items-center h-[226px] hidden')}>
                            <div className={cx('h-[10px] w-[10px] bg-2152FA rounded-[50%] mr-[10px] xl:mr-[30px]')}></div>
                            <div className={cx('h-[10px] w-[10px] bg-2152FA rounded-[50%] mr-[10px] xl:mr-[30px]')}></div>
                            <div className={cx('h-[10px] w-[10px] bg-2152FA rounded-[50%] mr-[10px] xl:mr-[30px]')}></div>
                        </div>
                        <div className={cx('mx-5 xl:mx-20 text-center')}>
                            <div className={cx('h-[200px] min-h-[200px] lg:w-[200px] relative flex justify-center items-center')}>
                                <Image className={cx('lg:absolute lg:top-[68px] lg:right-[36px]')} src="/assets/deposite.png" alt="Deposite" width={128} height={85} />
                            </div>
                            <h4 className={cx('text-center text-[18px] xl:text-[24px]')}>Deposit</h4>
                            <p className={cx('font-normal text-828899 text-center text-[12px] xl:text-[14px]')}>Turkish Lira or crypto</p>
                        </div>
                        <div className={cx('lg:flex items-center h-[226px] hidden')}>
                            <div className={cx('h-[10px] w-[10px] bg-2152FA rounded-[50%] mr-[10px] xl:mr-[30px]')}></div>
                            <div className={cx('h-[10px] w-[10px] bg-2152FA rounded-[50%] mr-[10px] xl:mr-[30px]')}></div>
                            <div className={cx('h-[10px] w-[10px] bg-2152FA rounded-[50%] mr-[10px] xl:mr-[30px]')}></div>
                        </div>
                        <div className={cx('mx-5 xl:mx-20')}>
                            <div className={cx('h-[200px] lg:w-[200px] relative text-center flex justify-center items-center')}>
                                <Image className={cx('lg:absolute lg:top-[50px] lg:right-[0px]')} src="/assets/buy-sell.png" alt="Buy Sell" width={200} height={200} />
                            </div>
                            <h4 className={cx('text-center text-[18px] xl:text-[24px]')}>Buy & Sell, Earn</h4>
                            <p className={cx('font-normal text-828899 text-center text-[12px] xl:text-[14px]')}>Buy & sell 30+ cryptos,<br />Earn in competitions every day</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section just few  */}
            {/* Section Fast and pro  */}
            <section className='sm:pb-[206px] pb-[70px]'>
                <div className='max-w-[1440px] mx-auto'>
                    <div className='xl:flex xl:items-center sm:pt-[115px] pt-[70px] pl-[15px]'>
                        <div className='xl:pl-[105px] pl-0'>
                            <div className={cx('xl:pb-[108px] pb-[50px] xl:text-left text-center')}>
                                <h2>
                                <span className={cx('text-[28px] md:text-[36px] leading-normal tracking-normal font-bold xl:mb-[30px] xl:text-left text-center txt-gradient txt-gradient-4')}>
                                    Fast.Simple.
                                </span>
                                <br />
                                <span className={cx('text-[28px] md:text-[36px] leading-normal tracking-normal font-bold xl:mb-[30px] xl:text-left text-center txt-gradient txt-gradient-4')}>
                                    and Pro.
                                </span>
                                </h2>
                            </div>
                            <div className={cx('text-center xl:text-left')}>
                                <div>
                                    <div className={cx('pb-[36px]')}>
                                        {/* <Image className={cx('mr-[15px] align-middle')} src="/assets/seconds.png" alt="Nano Second" width={24} height={24} /> */}
                                        <span className="mr-[15px] align-middle"><i className="las text-[32px] la-fast-forward txt-gradient txt-gradient-12"></i></span>                                        
                                        <span className={cx('text-[18px] font-medium leading-normal tracking-normal align-middle')}>Processing in nanoseconds</span>
                                    </div>
                                </div>
                                <div>
                                    <div className={cx('pb-[36px]')}>
                                        {/* <Image className={cx('mr-[15px] align-middle')} src="/assets/easytrade.png" alt="Easy Trade" width={24} height={24} /> */}
                                        <span className="mr-[15px] align-middle"><i className="las text-[32px] la-random txt-gradient txt-gradient-12"></i></span>
                                        <span className={cx('text-[18px] font-medium leading-normal tracking-normal align-middle')}>Easy Trade Option</span>
                                    </div>
                                </div>
                                <div>
                                    <div className={cx('pb-[36px]')}>
                                        {/* <Image className={cx('mr-[15px] align-middle')} src="/assets/advance.png" alt="Advance" width={24} height={24} /> */}
                                        <span className="mr-[15px] align-middle"><i className="las text-[32px] la-chart-area txt-gradient txt-gradient-12"></i></span>
                                        <span className={cx('text-[18px] font-medium leading-normal tracking-normal align-middle')}>Advanced Pro Trade Features</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='xl:text-right text-center xl:ml-auto'>
                            <Image className={cx('align-middle')} src="/assets/tradepage.png" alt="Trading View" width={932} height={600} />
                        </div>
                    </div>
                </div>
            </section>
            {/* Section Fast and pro  */}
            {/* Section INFORMATION  */}
            <section className={cx('sm:pb-[173px] pb-[70px] lg:px-[30px] px-[15px]')}>
                <div className={cx('max-w-[1200px] mx-auto')}>
                    <div className={cx('md:h-[240px] h-auto lg:p-[53px_122px_42px] p-[53px_15px_42px] rounded-[30px] md:flex md:justify-between bg-gradient-degree101')}>
                        <div className={cx('text-center')}>
                            <div className={cx('pb-8')}>
                                <i className='las la-headphones text-[36px] text-white'></i>
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-medium leading-normal tracking-normal text-white pb-[8px]')}>24/7 Support</h6>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-white m-0 w-[145px] mx-auto')}>available support team at any time you wish</p>
                        </div>
                        <div className={cx('text-center')}>
                            <div className={cx('pb-8')}>
                                <i className='las la-business-time text-[36px] text-white'></i>
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-medium leading-normal tracking-normal text-white pb-[8px]')}>Continuous Trade</h6>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-white m-0 w-[145px] mx-auto')}>Processing speed in nanoseconds</p>
                        </div>
                        <div className={cx('text-center')}>
                            <div className={cx('pb-8')}>
                                <i className='las la-desktop text-[36px] text-white'></i>
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-medium leading-normal tracking-normal text-white pb-[8px]')}>Simple Interface</h6>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-white m-0 w-[145px] mx-auto')}>Easy-to-use interface for all levels</p>
                        </div>
                        <div className={cx('text-center')}>
                            <div className={cx('pb-8')}>
                                <i className='las la-user-shield text-[36px] text-white'></i>
                            </div>
                            <h6 className={cx('text-[14px] lg:text-[18px] font-medium leading-normal tracking-normal text-white pb-[8px]')}>High Security</h6>
                            <p className={cx('pb-[30px] text-[12px] lg:text-[14px] font-normal leading-normal tracking-normal text-white m-0 w-[145px] mx-auto')}>Industry leading safety standards</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section INFORMATION  */}
            {/* Section About Crypto? */}
            <AboutCrypto />
            {/* Section About Crypto? */}
            {/* Section Email */}
            <EmailWidget />
            {/* <MarketTable/> */}
            {/* Section Email */}

        </>
        )
    }
}

export default HomeMain