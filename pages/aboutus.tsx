import { Component } from "react";
import BlueBanner from "../components/blue-banner";
import styles from "../styles/aboutus.module.css";
import Image from "next/image";
import Footer from "./footer";
import cx from "classnames";
import EmailWidget from "./emailwidget";

interface Props {

}

interface State {

}
class AboutUs extends Component<Props, State>{
    constructor(props: Props) {
        super(props)

    }

    aboutdata = [
        {
            "id": 1,
            "icon": "about-1",
            "date": "July 2022",
            "title": "Concept project presented to Yıldız Teknopark"
        },
        {
            "id": 2,
            "icon": "about-2",
            "date": "August 2022",
            "title": "Ekonobi Teknoloji Inc. was established"
        },
        {
            "id": 3,
            "icon": "about-3",
            "date": "September 2022",
            "title": "Accepted & moved to Yıldız Teknopark Davutpaşa Campus"
        }, {
            "id": 4,
            "icon": "about-4",
            "date": "January 2023",
            "title": "Company capital rised to 30.000.000 TRY"
        },
        {
            "id": 5,
            "icon": "about-2",
            "date": "January 2023",
            "title": "Headquarters moved to YTU Teknopark Maslak Campus"
        },
        {
            "id": 6,
            "icon": "about-5",
            "date": "February 2023",
            "title": "Launched Initial Exchange"
        },

    ];

    render() {
        return (
            <>

                <BlueBanner headingOne="New era" headingTwo="for Crypto" source={<Image src="/assets/images/svg/btc-world.svg" alt="btc world" height={271.68} width={300} />} />
                <div className="container">
                    <div className="max-w-[740px] w-full mx-auto text-center lg:p-[48px_15px_0px] p-[0px_15px_0px]">
                        <h2 className="mb-[37px]">
                            <span className="lg:text-[36px] text-[24px] txt-gradient-8 txt-gradient">
                                Who we are ?
                            </span>
                        </h2>
                        <p className="lg:text-[24px] text-[18px] pb-[18px] font-bold leading-normal tracking-normal text-171a1e">
                            We are Ekonobi. Located in YTU Teknopark Maslak<br />
                            Our aim is to change the way you view crypto fundamentally
                        </p>
                        <p className="lg:text-[24px] text-[18px] pb-[18px] font-bold leading-normal tracking-normal text-171a1e">
                            We want to make crypto<br />
                            fast, simple, cozy and sharing together!
                        </p>
                    </div>
                    <div className="max-w-[827px] lg:p-[80px_15px_0px] p-[22px_15px_0px] w-full mx-auto">
                        {this.aboutdata.map((t: any) =>
                            <div key={t.id}>
                                <div className="sm:flex items-center block">
                                    <div className="bg-white lg:h-[120px] lg:w-[120px] h-[80px] w-[80px] shadow-[5px_5px_10px_0_rgb(0,0,0,/ 5%),inset_10px_10px_10px_0_rgb(0,0,0,/ 5%)] border border-solid border-ebefff rounded-[120px] flex items-center justify-center sm:mr-[42px] mx-auto sm:mx-0">
                                        <Image src={`/assets/images/${t.icon}.png`} alt="description of image" width={48} height={48} />
                                    </div>
                                    <div className="sm:text-left text-center sm:pt-0 pt-[15px]">
                                        <p className="lg:text-[18px] text-[14px] text-acacac leading-normal tracking-normal font-medium">{t.date}</p>
                                        <h4 className="lg:text-[24px] text-[20px] leading-normal tracking-normal text-171a1e font-medium">{t.title}</h4>
                                    </div>
                                </div>
                                <div className="lg:p-[37px_56px_0px] p-[37px_34px_0px]">
                                    <div className="h-[10px] w-[10px] bg-2152FA rounded-[50%] mb-[32px] sm:mx-0 mx-auto"></div>
                                    <div className="h-[10px] w-[10px] bg-2152FA rounded-[50%] mb-[32px] sm:mx-0 mx-auto"></div>
                                    <div className="h-[10px] w-[10px] bg-2152FA rounded-[50%] mb-[32px] sm:mx-0 mx-auto"></div>
                                </div>
                            </div>
                        )}
                        <div>
                            <p className="sm:text-[18px] text-[16px] sm:text-left text-center text-acacac leading-normal tracking-tight font-medium pb-[60px]">to be Continued</p>
                        </div>
                        <EmailWidget />
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}
export default AboutUs;