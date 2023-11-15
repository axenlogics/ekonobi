import React, { Component, Fragment, useState } from "react";
import { Button, ButtonType } from '../../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardText, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../../components/form-card';
import Input from '../../components/input';
import Link from "next/link";
import cx from "classnames";
import { connect } from "react-redux";
import { loginSuccess, loginUser } from "../../redux/actions/auth";
import InputPhone from "../../components/input-phone";
import { ApiResponseI, LoginEmails, UserI } from "../../helpers/interfaces";
import { store } from "../../redux/Store";
import { UserService } from "../../helpers/userservice";
import { NextResponse } from "next/server";
import { Router, useRouter, withRouter } from "next/router";
import ButtonLoader from "../../components/laoders/btnloader";
// import { useAuth } from "../../components/auth/authprovider";
import { SocialAuthButton } from "../../components/social-auth";
import { signIn, useSession } from "next-auth/react";


interface Props {
    isLoggedIn: boolean,
    dispatch: any,
    router: any,
}

interface State extends UserI {
    loginMobile: boolean,
    passwordShow: boolean,
    loading: boolean,
}

function LoginPage(props: Props) {
    // constructor(props: Props) {

    //     super(props);

    //     this.state = {
    //         loginMobile: false,
    //         passwordShow: false,
    //         email: '',
    //         mobile: '',
    //         password: '',
    //         loading: false,
    //     };
    // }
    // const { auth, initializing, getRedirect, clearRedirect, user, error } =
    //     useAuth()
    const [loginMobile, setloginMobile] = useState<boolean>(false);
    const [loginEmail, setloginEmail] = useState<boolean>(true);
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    const { data: session, status } = useSession();








    const handleTab = (tb: string) => {
        if (tb === 'mobile') {
            if (!loginMobile) {
                setloginMobile(true);
            }
            if (loginEmail) {
                setloginEmail(false);
            }
        } else {
            if (!loginEmail) {
                setloginEmail(true);
            }
            if (loginMobile) {
                setloginMobile(false);
            }
        }
        // setloginMobile(true)
        // this.setState({ loginMobile: tb })
    }

    const handlePassword = () => {
        // this.setState({
        //     passwordShow: !this.state.passwordShow
        // })
        setPasswordShow(!passwordShow);
    }
    // const changeValue(type: any, value: any) {
    //     this.setState({
    //         ...this.state,
    //         [type]: value
    //     });
    // }
    const loginNow = async () => {

        const modal: UserI = { email: email, password: password };
        // const res = await signIn("credentials", {
        //     email: email,
        //     password: password,
        //     callbackUrl: `${router.query.callbackUrl
        //             ? router.query.callbackUrl
        //             : window.location.origin+'/trade'
        //         }`,
        //     redirect: true,
        // });
        // console.log('user response login', res)
        const res = await UserService.getInstance().loginNow(modal);
        // this.setState({ loading: true });
        console.log('res', res)
        setLoading(true);
        if (!res?.error) {

            store.dispatch({ type: 'ISLOGGED_IN', payload: true });
            // await auth.signIn(email,password);
            // const redirect = getRedirect()

            // if (router.query.returnUrl !== undefined) {

            //     let returnurl: any = router.query.returnUrl;

            //     router.push(returnurl);
            // } else {
            //     router.push("/trade") // go to default protected page
            // }
            // 
            // this.props.router.push('/trade');
            // const router = withRouter()
            // const { pathname } = Router
            // Router.apply('/trade')
            //    const route =  useRouter();
            //    route.push('trade')
            // Router('/templates/mainpage1')
            // const ro = new Router()
            // ;
            // const navigate = navigator();
            // const goToLoginPage = () => navigator('/login');
            // const handleClick = e => {
            // e.preventDefault()
            // router.push('/trade')
            // NextResponse.rewrite('trade');
        } else {
            console.log('response', res);
            alert(res?.error);
            setLoading(false);
            // this.setState({ loading: false });

            store.dispatch({ type: 'ISLOGGED_IN', payload: false });
        }

        // const account = LoginEmails[0];
        // this.props.dispatch({ type: 'ISLOGGED_IN', payload: true });
        // if (this.state.email === account.email && this.state.password === account.password) {
        //     this.props.dispatch({ type: 'ISLOGGED_IN', payload: true });
        // } else {
        //     this.props.dispatch({ type: 'ISLOGGED_IN', payload: false });

        // }

        //   this.props.dispatch()
    }
    return (
        // 

        
            <FormScreen>
                <FormWrap>
                    <FormHeader />
                    <FormCard>
                        <FormCardHeader>
                            <FormCardTitle className="flex justify-between">
                                <button type="button" className={cx('bg-none border-0 text-sm font-sans font-medium text-acacac', { '!text-34345b': loginMobile })} onClick={() => handleTab('mobile')}>Log in with Mobile</button>
                                <button type="button" className={cx('bg-none border-0 text-sm font-sans font-medium text-acacac', { '!text-34345b': loginEmail })} onClick={() => handleTab('email')}>Log in with E-mail</button>
                            </FormCardTitle>
                        </FormCardHeader>
                        <FormCardBody>
                            {loginMobile && <>
                                <FormCardText className='mb-8'>
                                    A one-time password (OTP) will be sent to the mobile phone for verification.
                                </FormCardText>
                                <InputPhone
                                    value={mobile}
                                    onChange={(ev: any) => setMobile(ev.target?.value)}
                                    label="Mobile" />
                                <Input
                                    value={password}
                                    onChange={(ev: any) => setPassword(ev.target.value)}
                                    label="Password"
                                    type={passwordShow ? "text" : "password"}
                                    labelRight={<Link href="/reset-password" className="hover:text-34345b">Forget Password?</Link>}
                                    onClickIconRight={handlePassword}
                                    iconRight={<i className={`las text-[20px] text-bbbbbb align-middle ${passwordShow ? 'la-eye' : 'la-eye-slash'}`}></i>} />
                                <Button
                                    className='w-full font-bold text-lg leading-6'
                                    onClick={loginNow}
                                    type={ButtonType.primary}> {loading ? <ButtonLoader /> : 'Log In'} </Button>
                                <SocialAuthButton textGoogle="Google" textApple="Apple" />

                            </>}
                            {!loginMobile && <>
                                <FormCardText className='mb-8'>
                                    A one-time password (OTP) will be sent to the email for verification.
                                </FormCardText>
                                <Input
                                    label="Email"
                                    value={email}
                                    onChange={(ev: any) => setEmail(ev.target.value)}
                                    type="email" />
                                <Input
                                    value={password}
                                    onChange={(ev: any) => setPassword(ev.target.value)}
                                    label="Password"
                                    type={passwordShow ? "text" : "password"}
                                    labelRight={<Link href="/reset-password" className="hover:text-34345b">Forget Password?</Link>}
                                    onClickIconRight={handlePassword} 
                                    iconRight={<i className={`las text-[20px] text-bbbbbb align-middle ${passwordShow ? 'la-eye' : 'la-eye-slash'}`}></i>} />
                                <Button onClick={loginNow}
                                    className='w-full font-bold text-lg leading-6 mt-1'
                                    type={ButtonType.primary}>{loading ? <ButtonLoader /> : 'Log In'}</Button>
                                    <SocialAuthButton textGoogle="Google" textApple="Apple" />
                            </>}
                        </FormCardBody>
                    </FormCard>
                    <FormCardOuterWrap>
                        <FormCardOuterText>
                            Do not have an account? <Link className="font-bold text-white hover:text-34345b" href="/signup">Sign Up</Link>
                        </FormCardOuterText>
                    </FormCardOuterWrap>
                </FormWrap>
            </FormScreen>
        
    );


}


// export default LoginPage
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
export default connect(mapStateToProps, null)(withRouter(LoginPage as any))



