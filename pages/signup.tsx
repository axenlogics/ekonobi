import React, { Component } from "react";
import { Button, ButtonType } from '../components/button';
import { FormCard, FormCardBody, FormCardOuterText, FormCardOuterWrap, FormHeader, FormScreen, FormWrap } from '../components/form-card';
import Input from '../components/input';
import Link from "next/link";
import Checkbox from "../components/checkbox";
import InputPhone from "../components/input-phone";
import { ApiResponse, UserI } from "../helpers/interfaces";
import { UserService } from "../helpers/userservice";
import { SocialAuthButton } from "../components/social-auth";


interface Props {

}

interface State extends UserI {
    passwordShow: boolean,
    terms?: boolean,
    PDPAConsent?: boolean,
    promotionalMessages?: boolean,
}

class SignupPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);

        this.state = {
            passwordShow: false,
            mobile: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            referaCode: '',
        };
    }



    componentDidMount() {
    }

    handlePassword = () => {
        this.setState({
            passwordShow: !this.state.passwordShow
        })
    }
    changeValue(type: any, value: any) {
        this.setState({
            ...this.state,
            [type]: value
        });
    }
    createAccount = async () => {
        const model = {
            phone: this.state.mobile,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            passord: this.state.password,
            referalCode: this.state.referaCode,
        }
        const res: ApiResponse = await UserService.getInstance().createAccount(model);
        if (res.Status) {
           
        }
    }
    render() {
        return (
            <FormScreen>
                <FormWrap className="max-w-[600px]">
                    <FormHeader />
                    <FormCard>
                        <FormCardBody className="pt-[25px] sm:px-[30px] pb-[30px]">
                            <div className="grid sm:grid-cols-2 lg:gap-5">
                                <InputPhone
                                    value={this.state.mobile}
                                    onChange={(ev: any) => this.changeValue('mobile', ev.target.value)}
                                    label="Mobile" />
                                <Input label="E-mail Address" type="email" />
                            </div>
                            <div className="grid sm:grid-cols-2 lg:gap-5">
                                <Input
                                    label="First Name"
                                    value={this.state.firstName}
                                    onChange={(ev: any) => this.changeValue('firstName', ev.target.value)}
                                    type="text" />
                                <Input
                                    value={this.state.lastName}
                                    onChange={(ev: any) => this.changeValue('lastName', ev.target.value)}
                                    label="Last Name"
                                    type="text" />
                            </div>
                            <div className="grid sm:grid-cols-2 lg:gap-5">
                                <Input
                                    value={this.state.password}
                                    onChange={(ev: any) => this.changeValue('password', ev.target.value)}
                                    label="Password"
                                    type={this.state.passwordShow ? "text" : "password"}
                                    onClickIconRight={this.handlePassword} 
                                    iconRight={<i className={`las text-[20px] text-bbbbbb align-middle ${this.state.passwordShow ? 'la-eye' : 'la-eye-slash'}`}></i>} />
                                <Input label="Referral Code (Optional)" type="text" />
                            </div>
                            {/* <div className="flex items-center">
                                <input id="filter-mobile-color-2" name="color[]" value="blue" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor="filter-mobile-color-2" className="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
                            </div> */}
                            <div className="flex text-xs mb-2.5">
                                <Checkbox id="chk1" className="self-start" />
                                <p className="m-0 text-[rgb(23 26 30 / 50%)] mt-[-1px]"> I hereby declare that, I read and accept the <Link className="text-primary" href="/">Terms of Use </Link>, <Link className="text-primary" href="/">Privacy Policy</Link>, <Link className="text-primary" href="/">PDPA Explanatory Information Document</Link>,  and <Link className="text-primary" href="/">PDPA Explicit Consnet</Link>.</p>
                            </div>
                            <div className="flex text-xs mb-2.5">
                                <Checkbox id="chk2" className="self-start" />
                                <p className="m-0 text-[rgb(23 26 30 / 50%)] mt-[-1px]"> I hereby declare that, I read and examined the <Link className="text-primary" href="/">PDPA Explicit Consnet</Link> and hereby consent to processing and transferring of my personal data in accordance with the <Link className="text-primary" href="/">PDPA Explicit Consnet</Link>.</p>
                            </div>
                            <div className="flex text-xs mb-2.5">
                                <Checkbox id="chk3" className="self-start" />
                                <p className="m-0 text-[rgb(23 26 30 / 50%)] mt-[-1px]"> I hereby give my sonsent to receiving commercial electronic messages via phone, e-mail and other electronic communication channels regarding the products and services in accordance with the <Link className="text-primary" href="/">PDPA Explanatory Information Document</Link>.</p>
                            </div>
                            <Button className="mt-5 font-bold w-full text-lg leading-6" type={ButtonType.primary}>Sign Up</Button>
                            <SocialAuthButton className="gap-3 sm:grid-cols-2 grid-cols-1" btnClassName="sm:px-2" textGoogle="Continue with Google Account" textApple="Continue with Apple Account" />
                        </FormCardBody>
                    </FormCard>
                    <FormCardOuterWrap>
                        <FormCardOuterText>
                            Have an Account? <Link className="font-bold text-white hover:text-34345b" href="/login">Log In</Link>
                        </FormCardOuterText>
                    </FormCardOuterWrap>
                </FormWrap>
            </FormScreen>
        );
    }
}

export default SignupPage


