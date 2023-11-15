import Link from "next/link";
import Image from 'next/image';
import { Button, ButtonLink, ButtonType } from "../button";
import styles from './style.module.css'
import Input from "../input";
import { useEffect, useState } from "react";
import cx from "classnames";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { store } from "../../redux/Store";
import { UserService } from "../../helpers/userservice";
// import { useAuth } from "../auth/authprovider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faCaretDown, faSun, faMoon, faClose, faAngleDown, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { useTheme } from "next-themes";
import { NavButton, NavDropDown, NavDropDownDivider, NavDropDownLink, NavDropDownTitle, NavDropPositon, NavItem, NavLink, NavList } from "./nav-item";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { twMerge } from "tailwind-merge";



export enum NavbarType {
    light = 'light',
    primary = 'primary',
    dark = 'dark'
}

const NavVariation = {
    light : {
        logoIcon: '#2152FA',
        logoTxt: 'text-primary',
        nav: 'bg-light dark:bg-dark border-light dark:border-1e2136',
        list: `[&_.nav-link]:text-181a1e hover:[&_.nav-link]:text-primary dark:[&_.nav-link]:text-8184a3 dark:hover:[&_.nav-link]:text-white 
        [&_.nav-dp]:bg-e8effe dark:[&_.nav-dp]:bg-232842 [&_.dp-link]:text-181a1e hover:[&_.dp-link]:text-primary dark:[&_.dp-link]:text-cccfd5 dark:hover:[&_.dp-link]:text-white [&_.dp-divid]:border-[#acacac] dark:[&_.dp-divid]:border-[#353765] 
        [&_.caret-up]:border-b-e8effe  dark:[&_.caret-up]:border-b-232842`
    },
    primary : {
        logoIcon: '#ffffff',
        logoTxt: 'text-white',
        nav: 'bg-primary border-primary',
        list: `[&_.nav-link]:text-white hover:[&_.nav-link]:text-181a1e [&_.nav-link]:text-white :hover:[&_.nav-link]:text-181a1e 
        [&_.nav-dp]:bg-e8effe [&_.dp-link]:text-181a1e hover:[&_.dp-link]:text-primary [&_.dp-divid]:border-[#acacac] 
        [&_.caret-up]:border-b-e8effe`,
    }
} as any;


export enum NavbarSize {
    md = 'md',
    sm = 'sm'
}

export interface Props {
    navbarType?: NavbarType,
    navbarSize?: NavbarSize,
    navbarClasName?: string,
    logoText?: boolean,
    isLoggedIn?: boolean,
    contClassName?: string,
    searchEnabled?: boolean,
    isSessionExist?: boolean,
    navListClassName?: string,
    isTrade?: boolean
}

function Header({isTrade = false, isSessionExist, navbarType = NavbarType.light, navbarSize = NavbarSize.md, navbarClasName, navListClassName, logoText = true, isLoggedIn, contClassName, searchEnabled = true }: Props) {
    // const { auth, initializing, getRedirect, clearRedirect, user, error } = useAuth();
    const [islogedInSet, setLogedIn] = useState('');
    const [menu, setMenu] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();



    const changeData = (val: string) => {

    }
    const logout = async () => {
        const res = await UserService.getInstance().logOut();
        const res1 = await signOut({ callbackUrl: '/' });
        if (res) {
            // await auth.signOut()
            // router.push('/');
            store.dispatch({ type: 'ISLOGGED_IN', payload: false });
        }
    }
    const startup = async () => {
        if (localStorage !== undefined && islogedInSet === '') {
            // if (status === 'authenticated') {

            // const res = localStorage.getItem('userInfo')

            const res = localStorage.getItem('userInfo')
            if (res !== null) {
                // await auth.UpdateUser(res);
                // if (session.user !== null) {
                store.dispatch({ type: 'ISLOGGED_IN', payload: res !== null });
                setLogedIn('true');
                // }
            }
            // }
        }
    }
    // if (status === 'authenticated') {

    //     // const res = localStorage.getItem('userInfo')

    //     if (user !== null) {
    //         store.dispatch({ type: 'ISLOGGED_IN', payload: session.user !== null});
    //         setLogedIn('true');
    //     }

    // }

    const isLogin = isSessionExist || session;

    const handleTheme = (theme:string) => {
        localStorage.setItem('theme-mode', theme);

        setTheme(theme)
    }


    const renderThemeChanger = () => {
        const currentTheme = theme;
        
        return  <button className={`bg-232842 relative inline-flex justify-between h-[30px] w-[61px] p-1 ${isLogin ? 'ml-2' : 'ml-[22px]'} items-center rounded-full`}>
            <span className={`w-[22px] h-[22px] inline-flex items-center justify-center rounded-full ${currentTheme === 'dark' ? 'bg-primary' : 'bg-transparent'}`} onClick={() => handleTheme('dark')}><i className={`la la-moon text-lg ${currentTheme === 'dark' ? 'text-white' : 'text-mute'}`}></i> </span>
            <span className={`w-[22px] h-[22px] inline-flex items-center justify-center rounded-full ${currentTheme === 'light' ? 'bg-primary' : 'bg-transparent'}`} onClick={() => handleTheme('light')}><i className={`la la-sun text-lg ${currentTheme === 'light' ? 'text-white' : 'text-mute'}`}></i> </span>
        </button>
    }

    const toggleMenu = () => {
        setMenu(prevState => !prevState)
    }

    useEffect(() => {
        checkIsMobile()

        window.addEventListener('resize', checkIsMobile)

        const isTrade = router.pathname.indexOf('trade') > - 1;
        const themeMode = localStorage.getItem('theme-mode');
        isTrade ? setTheme(themeMode ? themeMode : 'dark') : setTheme('light');
        
        startup();
    }, [])

    const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 1024)
    }

   
    return (
        <header>
            <nav className={twMerge(navbarSize === 'sm' ? 'py-2 md:px-1' : 'py-5 md:px-1', 'border-b border-solid', NavVariation[navbarType]['nav'], navbarClasName)}>
                <div className={twMerge('mx-auto container flex justify-between items-center px-4', contClassName)}>
                    <Link className='items-center flex' href="/">
                        <svg className="mr-2.5" width="30" height="30" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
                            <path d="M200 0c22.091 0 40 17.909 40 40v160c0 22.091-17.909 40-40 40H40c-22.091 0-40-17.909-40-40V40C0 17.909 17.909 0 40 0h160zm-40 80c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40z" fill={NavVariation[navbarType]['logoIcon']} fillRule="evenodd" />
                        </svg>
                        {logoText && <h4 className={NavVariation[navbarType]['logoTxt']}>ekonobi</h4>}
                    </Link>

                    {!isMobile && <>
                        <NavList className={twMerge(`ml-5 flex-1 ${NavVariation[navbarType]['list']}`, navListClassName)}>
                            <NavItem className="relative">
                                <NavButton>
                                    Market
                                    <FontAwesomeIcon icon={faCaretDown} className='text-base ml-1' />
                                </NavButton>
                                <NavDropDown>
                                    <NavDropDownLink href="/market">
                                        <Image src="/assets/images/icons/shuffle.png" alt="Ekonobi Logo" className='mr-[18px]' width={24} height={24} priority />
                                        Market
                                    </NavDropDownLink>
                                    <NavDropDownDivider className="lg:my-1.5" />
                                    <NavDropDownLink href="/market">
                                        <Image src="/assets/images/icons/chart-histogram.png" alt="Ekonobi Logo" className='mr-[18px]' width={24} height={24} />
                                        Market Analysis
                                    </NavDropDownLink>
                                </NavDropDown>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/easy-trade">Easy Trade</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/trade">Exchange</NavLink>
                            </NavItem>
                            <NavItem className="relative">
                                <NavButton>
                                    <FontAwesomeIcon icon={faEllipsis} className="nav-link text-2xl align-middle" />
                                </NavButton>
                                <NavDropDown className='lg:left-[-42px]'>
                                    <div className="gap-7 columns-2">
                                        <div className="min-w-[170px]">
                                            <NavDropDownTitle>Services</NavDropDownTitle>
                                            <NavDropDownDivider />
                                            <NavDropDownLink href="#">Overview</NavDropDownLink>
                                            <NavDropDownLink href="#">Trade Basics</NavDropDownLink>
                                            <NavDropDownLink href="#">Easy Trade</NavDropDownLink>
                                            <NavDropDownLink href="#">Exchange</NavDropDownLink>
                                            <NavDropDownLink href="#">Platform Security</NavDropDownLink>
                                            <NavDropDownLink href="#">Account Security</NavDropDownLink>
                                            <NavDropDownLink href="#">Status</NavDropDownLink>
                                            <NavDropDownLink href="#" className="pointer-events-none !text-4b4f59">NFT (soon)</NavDropDownLink>
                                            <NavDropDownLink href="#" className="pointer-events-none !text-4b4f59">Proof of Reserves (soon)</NavDropDownLink>
                                        </div>
                                        <div className="min-w-[170px]">
                                            <NavDropDownTitle>Privileges</NavDropDownTitle>
                                            <NavDropDownDivider />
                                            <NavDropDownLink href="#">Referral</NavDropDownLink>
                                            <NavDropDownLink href="#">Ranking</NavDropDownLink>
                                            <NavDropDownLink href="#">Bitcoin Price Prediction</NavDropDownLink>
                                            <NavDropDownLink href="#">BTC Direction Prediction</NavDropDownLink>
                                            <NavDropDownLink href="#">Market Analysis</NavDropDownLink>
                                            <NavDropDownLink href="#">Auto-Invest</NavDropDownLink>
                                            <NavDropDownLink href="#">Twitter Sentiment</NavDropDownLink>
                                            <NavDropDownLink href="#">Fees &amp; Limits</NavDropDownLink>
                                            <NavDropDownLink href="#" className="pointer-events-none !text-4b4f59">Airdrops (soon)</NavDropDownLink>
                                        </div>
                                    </div>
                                </NavDropDown>
                            </NavItem>
                            {(isLogin) && <>
                                <NavItem className="relative lg:ml-auto">
                                    <NavButton>
                                        Wallet
                                        <FontAwesomeIcon icon={faCaretDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown dropPositon={NavDropPositon.right}>
                                        <NavDropDownTitle>Overall</NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="/deposit">Deposit</NavDropDownLink>
                                        <NavDropDownLink href="/withdraw">Withdraw</NavDropDownLink>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="#">Spot Wallet</NavDropDownLink>
                                        <NavDropDownLink href="#">Auto-Invest Wallet</NavDropDownLink>
                                        <NavDropDownLink href="#">Bank Accounts</NavDropDownLink>
                                        <NavDropDownLink href="#">Crypto Addresses</NavDropDownLink>
                                        <NavDropDownLink href="#">Transaction History</NavDropDownLink>
                                        <NavDropDownLink href="#">Distribution History</NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        <Image className="mr-2" src="/assets/images/bitcoin.png" alt="Ekonobi Logo" width={30} height={30} />
                                        {session?.user?.email?.split('@')[0]}
                                        <FontAwesomeIcon icon={faCaretDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown dropPositon={NavDropPositon.right}>
                                        <NavDropDownTitle className="flex">
                                            {session?.user?.email?.split('@')[0].slice(0, 3)}***{session?.user?.email?.split('@')[1]}
                                            <Image className="ml-auto self-center" src="/assets/images/icons/verify.png" alt="Verify" width={18} height={18} priority />
                                        </NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="dashboard">Dashboard</NavDropDownLink>
                                        <NavDropDownLink href="#">Security</NavDropDownLink>
                                        <NavDropDownLink href="#">Verification</NavDropDownLink>
                                        <NavDropDownLink href="#">Referral</NavDropDownLink>
                                        <NavDropDownLink href="#">Rewards</NavDropDownLink>
                                        <NavDropDownLink href="#">Points</NavDropDownLink>
                                        <NavDropDownDivider />
                                        <div className="dp-link cursor-pointer font-normal items-center py-2" onClick={logout}>Log Out</div>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="lg:mr-0">
                                    <NavLink href="#" className="lg:pr-0">
                                        <Image src="/assets/images/icons/bell-light.png" alt="Ekonobi Logo" width={24} height={24} priority />
                                    </NavLink>
                                </NavItem>
                            </>}
                        </NavList>
                        {!(isLogin) && <div className="flex items-center">
                            {searchEnabled && <Input type="search" fGroupClassName='mb-0 sm:mb-0' fControlWrapClassName='rounded-[50px] bg-ebefff max-w-[178px] shadow-[5px_5px_10px_0_rgba(188,188,188,0.05)]' placeholder="Search coin" iconRight={<FontAwesomeIcon icon={faSearch} className='text-xs text-8993b4' />} appendClassName="pr-5" onChange={(event: any) => changeData(event?.target.value)} />}
                            <ButtonLink href='/login' type={navbarType === NavbarType.primary ? ButtonType.outline_white : ButtonType.outline_primary} className='min-w-[98px] rounded-full leading-5 ml-5'>Login</ButtonLink>
                            <ButtonLink href='/signup' type={navbarType === NavbarType.primary ? ButtonType.white : ButtonType.primary} className='min-w-[98px] rounded-full leading-5 ml-5'>Signup</ButtonLink>
                        </div>}
                        {/* {isTrade && renderThemeChanger()} */}
                    </>}
                    {isMobile && <>
                        <Button type={ButtonType.primary} onClick={toggleMenu}>
                            <FontAwesomeIcon icon={faBars} className='text-base' />
                        </Button>
                        
                        <div className={`fixed ${menu ? 'flex flex-col items-end overflow-y-auto' : 'hidden'} w-full h-full left-0 right-0 top-0 bottom-0 bg-[rgba(24,26,30,0.3)] z-40 pl-10`}>
                            <div className={`fixed w-full h-full left-0 right-0 top-0 bottom-0 z-30`} onClick={toggleMenu}></div>
                            <NavList className={`flex-1 max-w-[310px] w-full relative z-40 ${NavVariation[navbarType]['nav']} ${NavVariation[navbarType]['list']}`}>
                                {/* <NavItem className="relative text-right">
                                    <Button type={ButtonType.danger} onClick={toggleMenu}>
                                        <FontAwesomeIcon icon={faClose} className='text-base' />
                                    </Button>
                                </NavItem> */}
                                <NavItem className='flex p-5'>
                                    <ButtonLink href='/login' type={navbarType === NavbarType.primary ? ButtonType.outline_white : ButtonType.outline_primary} className="flex-1 rounded-full leading-5">Login</ButtonLink>
                                    <ButtonLink href='/signup' type={navbarType === NavbarType.primary ? ButtonType.white : ButtonType.primary} className="flex-1 rounded-full leading-5 ml-3">Signup</ButtonLink>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        Market
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <NavDropDownLink href="/market">
                                            <Image src="/assets/images/icons/shuffle.png" alt="Ekonobi Logo" className='mr-[18px]' width={24} height={24} priority />
                                            Market
                                        </NavDropDownLink>
                                        <NavDropDownDivider className="my-1.5" />
                                        <NavDropDownLink href="/market">
                                            <Image src="/assets/images/icons/chart-histogram.png" alt="Ekonobi Logo" className='mr-[18px]' width={24} height={24} />
                                            Market Analysis
                                        </NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/easy-trade">Easy Trade</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/trade">Exchange</NavLink>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        All Services
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <div className="gap-1 columns-2">
                                            <div className="min-w-[170px]">
                                                <NavDropDownTitle>Services</NavDropDownTitle>
                                                <NavDropDownDivider />
                                                <NavDropDownLink href="#">Overview</NavDropDownLink>
                                                <NavDropDownLink href="#">Trade Basics</NavDropDownLink>
                                                <NavDropDownLink href="#">Easy Trade</NavDropDownLink>
                                                <NavDropDownLink href="#">Exchange</NavDropDownLink>
                                                <NavDropDownLink href="#">Platform Security</NavDropDownLink>
                                                <NavDropDownLink href="#">Account Security</NavDropDownLink>
                                                <NavDropDownLink href="#">Status</NavDropDownLink>
                                                <NavDropDownLink href="#" className="pointer-events-none !text-4b4f59">NFT (soon)</NavDropDownLink>
                                                <NavDropDownLink href="#" className="pointer-events-none !text-4b4f59">Proof of Reserves (soon)</NavDropDownLink>
                                            </div>
                                            <div className="min-w-[170px]">
                                                <NavDropDownTitle>Privileges</NavDropDownTitle>
                                                <NavDropDownDivider />
                                                <NavDropDownLink href="#">Referral</NavDropDownLink>
                                                <NavDropDownLink href="#">Ranking</NavDropDownLink>
                                                <NavDropDownLink href="#">Bitcoin Price Prediction</NavDropDownLink>
                                                <NavDropDownLink href="#">BTC Direction Prediction</NavDropDownLink>
                                                <NavDropDownLink href="#">Market Analysis</NavDropDownLink>
                                                <NavDropDownLink href="#">Auto-Invest</NavDropDownLink>
                                                <NavDropDownLink href="#">Twitter Sentiment</NavDropDownLink>
                                                <NavDropDownLink href="#">Fees &amp; Limits</NavDropDownLink>
                                                <NavDropDownLink href="#" className="pointer-events-none !text-4b4f59">Airdrops (soon)</NavDropDownLink>
                                            </div>
                                        </div>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        Wallet
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <NavDropDownTitle>Overall</NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="/deposit">Deposit</NavDropDownLink>
                                        <NavDropDownLink href="/withdraw">Withdraw</NavDropDownLink>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="#">Spot Wallet</NavDropDownLink>
                                        <NavDropDownLink href="#">Auto-Invest Wallet</NavDropDownLink>
                                        <NavDropDownLink href="#">Bank Accounts</NavDropDownLink>
                                        <NavDropDownLink href="#">Crypto Addresses</NavDropDownLink>
                                        <NavDropDownLink href="#">Transaction History</NavDropDownLink>
                                        <NavDropDownLink href="#">Distribution History</NavDropDownLink>
                                    </NavDropDown>
                                </NavItem>
                                <NavItem className="relative">
                                    <NavButton>
                                        <span>
                                            <Image className="mr-2" src="/assets/images/bitcoin.png" alt="Ekonobi Logo" width={30} height={30} />
                                            {session?.user?.email.split('@')[0]}
                                        </span>
                                        <FontAwesomeIcon icon={faAngleDown} className='text-base ml-1.5' />
                                    </NavButton>
                                    <NavDropDown isTransition={false}>
                                        <NavDropDownTitle className="flex">
                                            {session?.user?.email.split('@')[0].slice(0, 3)}***{session?.user?.email.split('@')[1]}
                                            <Image className="ml-auto self-center" src="/assets/images/icons/verify.png" alt="Verify" width={18} height={18} priority />
                                        </NavDropDownTitle>
                                        <NavDropDownDivider />
                                        <NavDropDownLink href="dashboard">Dashboard</NavDropDownLink>
                                        <NavDropDownLink href="#">Security</NavDropDownLink>
                                        <NavDropDownLink href="#">Verification</NavDropDownLink>
                                        <NavDropDownLink href="#">Referral</NavDropDownLink>
                                        <NavDropDownLink href="#">Rewards</NavDropDownLink>
                                        <NavDropDownLink href="#">Points</NavDropDownLink>
                                        <NavDropDownDivider className="lg:my-1.5" />
                                        <div className="dp-link cursor-pointer font-normal items-center py-4 px-5" onClick={logout}>Log Out</div>
                                    </NavDropDown>
                                </NavItem>
                            </NavList>
                        </div>
                    </>
                    }
                </div>
            </nav>
        </header>
    )
}
const mapStateToProps = (state: any) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn,
    }
}

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//         loginUser: (val: any) => dispatch(loginUser(val)),
//         loginSuccess: () => dispatch(loginSuccess())
//     }
// }
// isLoggedIn
// export default LoginPage;
export default connect(mapStateToProps, null)(Header)
// export default Header