import { Component } from "react";
import BlueBanner from "../components/blue-banner";
import styles from "../styles/agreements.module.css";
import Image from "next/image";
import Footer from "./footer";
import cx from "classnames";
import EmailWidget from "./emailwidget";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Accordians from "../components/accordion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
interface Props {

}

interface State {
    tab: boolean,
}
class Agreements extends Component<Props, State>{

    constructor(props: Props) {
        super(props)
        this.state = {
            tab: false
        }
        
    }
    toggletab = () =>{
        this.setState({tab: this.state.tab?false:true});
    }
    data = [
        {
            "sideN" : "01",
            "title" : "Definitions and Interoretations",
            "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

        },
        {
            "sideN" : "02",
            "title" : "Risk Warning",
            "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

        },
        {
            "sideN" : "03",
            "title" : "General Information",
            "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

        },
        {
            "sideN" : "04",
            "title" : "Anti Money-Laundering Disclaimer",
            "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

        },
        {
            "sideN" : "05",
            "title" : "When Can I Qualify The Award?",
            "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

        },
        {
            "sideN" : "06",
            "title" : "What is Award?",
            "body" : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"

        },

    ];
    render() {
        return (
            <>

                <BlueBanner headingOne="All agreements." headingTwo="In one page." source={<Image src="/assets/images/svg/btc-world.svg" alt="btc world" height={271.68} width={300} />} />
                <div className='container'>
                    <section>
                        <div className="xl:p-[0px_45px] p-[0_16px_16px]">
                        {this.state.tab && <><div onClick={this.toggletab} className='block md:hidden fixed w-[100%] h-[100%] top-0 z-10 bg-050505'></div></>}
                            <Tabs defaultIndex={0} selectedTabClassName="xl:!text-[24px] lg:text-[16px] text-[14px] txt-gradient-9 txt-gradient !font-bold leading-normal tracking-normal text-center md:border-b-[4px] md:border-solid md:border-1f4ff4 xl:px-[17.5px] px-[10px]">
                                <TabList className="flex pb-[50px] items-baseline relative">
                                    {!this.state.tab && <div className='hidden md:flex '>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">Terms of Use</div>
                                        </Tab>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">Privacy Policy</div>
                                        </Tab>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">Personal Data Protection</div>
                                        </Tab>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">Risk Disclosure</div>
                                        </Tab>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">Cookie Policy</div>
                                        </Tab>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">AML Policy</div>
                                        </Tab>
                                        <Tab className="list-none xl:text-[18px] lg:text-[14px] text-[12px] font-light cursor-pointer">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] border-b border-solid border-transparent pb-[8px]">KYC Policy</div>
                                        </Tab>
                                    </div>
                                    }
                                    <div className='block md:hidden absolute top-[8px] bg-transparent z-10 '>
                                        <FontAwesomeIcon icon={faEllipsisVertical} className='text-lg' onClick={this.toggletab} />
                                        {this.state.tab && <div className="bg-white rounded shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)] p-[25px_15px_17px]">
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] pb-[8px]">Terms of Use</div>
                                        </Tab>
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] pb-[8px]">Privacy Policy</div>
                                        </Tab>
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px} pb-[8px]">Personal Data Protection</div>
                                        </Tab>
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] pb-[8px]">Risk Disclosure</div>
                                        </Tab>
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] pb-[8px]">Cookie Policy</div>
                                        </Tab>
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] pb-[8px]">AML Policy</div>
                                        </Tab>
                                        <Tab onClick={this.toggletab} className="list-none xl:text-[18px] lg:text-[14px] text-[14px] font-light">
                                            <div className="leading-normal tracking-normal text-center text-a2a2a2 xl:px-[17.5px] px-[10px] pb-[8px]">KYC Policy</div>
                                        </Tab>
                                        </div>}
                                    </div>
                                </TabList>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <div className={styles.content}>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">Terms of Use Agreement</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[28px]">For all intents and purposes of these Terms of Use, all customers accessing the Ekonobi Platform will be contracting with:</p>
                                        <p className="text-16 font-medium leading-normal tracking-normal text-171a1e mb-[35px]">Ekonobi Teknoloji Anonim Şirketi [Trade Registration Number: 397352-5, Central Registration System Number (MERSIS): 0329-1632-1880-0001, Tax ID: 329 163 2188], located in Çifte Havuzlar Mah. Eski Londra Asfaltı Cad. Kuluçka Mrk. D2 Blok No: 151/1f İç Kapı No: 2b03 Esenler İstanbul, which owns and operates the ‘Ekonobi’ Exchange Platform in Turkey and shall hereinafter referred to as “Ekonobi” or “Company.</p>
                                    </div>
                                    { this.data.map((t:any)=>
                                        <Accordians key={t.sideN} label = {t.title} content = {t.body} number = {t.sideN}/> 
                                    )}
                                </TabPanel>
                            </Tabs>
                        </div>
                    </section>
                    <div className="sm:pb-[30px] pb-0"></div>
                    <EmailWidget />
                </div>
                <Footer />
            </>
        )
    }
}
export default Agreements;




