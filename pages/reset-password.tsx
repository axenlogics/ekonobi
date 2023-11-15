import React, { Component } from "react";
import { Button, ButtonType } from '../components/button';
import { FormCard, FormCardBody, FormCardHeader, FormCardOuterText, FormCardOuterWrap, FormCardTitle, FormHeader, FormScreen, FormWrap } from '../components/form-card';
import Input from '../components/input';
import { Notification } from '../components/notification';
import InputPhone from "../components/input-phone";


interface Props {
  
}

interface State {
  
}

class ResetPasswordPage extends Component<Props, State> {
    constructor(props: Props) {

        super(props);
        
        this.state = {
            
        };
    }

    
    
    componentDidMount() {
    }

    render() {
        return (
            <FormScreen>
                <FormWrap>
                    <FormHeader />
                    <FormCard>
                        <FormCardHeader>
                            <FormCardTitle>Password Reset</FormCardTitle>
                        </FormCardHeader>
                        <FormCardBody className="pt-4">
                            <Notification className="mb-9" icon="/assets/images/icons/info.png" text="In password renewal processes, withdrawal requests are disabled for 24 hours for security." />
                            <InputPhone label="Mobile" />
                            <Input label="E-mail Address" type="email" />
                            <Button className="mt-5 font-bold w-full text-lg leading-6" type={ButtonType.primary}>Reset my password</Button>
                        </FormCardBody>
                    </FormCard>
                    <FormCardOuterWrap>
                        <FormCardOuterText>
                            You can create a new password by clicking the link sent to your e-mail address.
                        </FormCardOuterText>
                    </FormCardOuterWrap>
                    
                </FormWrap>
            </FormScreen>
        );
    }

}

export default ResetPasswordPage



