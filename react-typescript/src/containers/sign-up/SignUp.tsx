import * as React from 'react';
import SignUpForm from './components/sign-up-form';
import { AuthFormsReduxSelectors } from '../../types';

export interface ILoginProps extends AuthFormsReduxSelectors {
    loading: boolean;
}

export default class SignUp extends React.Component<ILoginProps> {

    public static defaultProps = {
        loading: false,
    };

    constructor(props: Readonly<ILoginProps>) {
        super(props);
    }

    public render() {
        const { isValid, submitFailed } = this.props;

        return <SignUpForm submitFailed={submitFailed}
                           isValid={isValid}
                />
    }
}
