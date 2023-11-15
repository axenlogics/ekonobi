import cx from "classnames";
import Link from 'next/link';
import Image from "next/image";
import styles from "../styles/Footer.module.css";


function Footer (){
    return(
        <> 
        <div className={cx('sm:p-[46px_60px_30px] p-[46px_15px_30px] bg-101123')}>
            <div className="container px-4">
            <div className='grid grid-cols-2 lg:grid-cols-5 lg:gap-2 gap-4'>
                <div className={cx('')}>
                    <div>
                        <h6 className={cx('text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Corporate</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                About Us
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Term Of Use
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Privacy Policy
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Personal Data Protection
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Risk Disclosure
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}> 
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Cookie Policy
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                AML Policy
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                KYC Policy
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 className={cx('text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Services</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Overview
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Trade Basics
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Easy Trade
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Exchange
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Platform Security
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Account Security
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Status
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-4b4f59')} href="/about">
                                NFT (soon)
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-4b4f59')} href="/about">
                                Proof of Reserves (soon)
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 className={cx('mt-[30px] sm:mt-0 text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Privileges</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Referral
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Ranking
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Bitcoin Price Prediction
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                BTC Direction Prediction
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Market Analysis
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Auto-Invest
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Twitter Sentiment
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Fees & Limits
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-4b4f59')} href="/about">
                                Airdrops (soon)
                            </Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h6 className={cx('mt-[30px] sm:mt-0 text-[16px] font-medium leading-normal tracking-normal text-2152FA pb-[26px]')}>Sources</h6> 
                    </div>
                    <div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Tradeable Assets
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Support Center
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                <span className={cx('text-2152FA')}>Blog</span>Chain
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Suggestion
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Listing Application
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                API
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Glossary
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Media Materials
                            </Link>
                        </div>
                        <div className={cx('pb-[16px]')}>
                            <Link className={cx('text-[14px] font-medium leading-normal tracking-normal text-cdcfcf')} href="/about">
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('mt-[30px] sm:mt-0 lg:col-auto col-span-2 flex flex-col lg:items-stretch items-center justify-right shrink-0')}>
                    <div className ={cx('flex lg:justify-between justify-start')}>
                        <Link className={cx('lg:shrink-1 shrink-0 lg:mr-0 mr-[33px]')} href="#">
                            <Image src="/assets/ios.png" alt="IOS Store" height={42} width={115} />
                        </Link>
                        <Link className={cx('lg:shrink-1 shrink-0')} href="#">
                            <Image src="/assets/google.png" alt="Play store" height={42} width={115} />
                        </Link>
                    </div> 
                    <div className={cx('flex pt-[30px] shrink-0 lg:justify-between justify-start lg:pb-0 pb-[30px]')}>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/twitter.svg" alt="Twitter" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/telegram.svg" alt="Telegram" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/linkedin.svg" alt="Linkdin" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/facebook.svg" alt="Facebook" height={24} width={24} />
                            </Link>
                        </div>
                        <div className={cx('shrink-0')}>
                            <Link className={cx('mx-[15px] lg:mr-0')} href="#">
                                <Image src="/assets/instagram.svg" alt="description of image" height={24} width={24} />
                            </Link>
                        </div>
                    </div>
                    <div className={cx('text-right w-[100%] max-w-[280px] mt-auto')}>
                        <div className={cx('pb-[23px] text-left lg:text-right')}>
                            <span className={cx('text-[14px] font-medium leading-normal tracking-normal text-2152FA mr-[12px]')}>English</span>
                            <span>
                                <Image src="/assets/earth.svg" alt="description of image" height={20} width={20} />
                            </span>
                        </div>
                        <div className={cx('relative text-left')}>
                            <input className={cx('text-left lg:max-w-[269px] w-[100%] h-[30px] p-[5px_6px_5px_15.5px] rounded-[30px] shadow-[5px_5px_10px_0_rgba(0, 0, 0, 0.08)] bg-16182f text-[12px] font-medium leading-normal tracking-normal text-4e525c border border-16182f')} type="text"placeholder="Subscribe with your e-mail" />
                            <span className={cx('w-[20px] h-[20px] bg-2072ef rounded-[50%] absolute right-[6px] top-[5px] cursor-pointer')}>
                                <Image className={cx('absolute right-[3px] top-[4.7px]')} src="/assets/arrowright.svg" alt="description of image" height={12} width={12} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('pt-[37px] text-525760 border-b border-solid bg-img-source flex sm:justify-between justify-center flex-wrap')}>
                <div className={cx('lg:text-[12px] text-[10px] leading-normal tracking-normal font-normal text-525760 pb-[5px] self-end')}>Copyright © 2022 - 2023 Ekonobi Teknoloji A.Ş. All rights reserved.</div>
                <div className={cx('flex pb-[5px] flex-wrap')}>
                    <div className={cx('text-[11px] lg:text-[14px] font-bold leading-normal tracking-normal text-a6a6a6')}>
                        Built<br/><span className={'font-normal'}>with</span></div>
                    <div className={'lg:m-[9px_14px] shrink-0'}>
                        <Image src="/assets/heart.svg" alt="description of image" height={24} width={24} />
                    </div>
                    <div className={cx('text-[11px] lg:text-[14px] font-bold leading-normal tracking-normal text-a6a6a6')}>
                        <span className={'font-normal'}>in</span> Yıldız<br/>Teknopark
                    </div>
                </div>
            </div>
            </div>
        </div>

        </>
    )
}
export default Footer;
