/**
 * Created by ivan on 15.03.18.
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { Button, Text } from 'native-base';
import { login } from '../../../../actions/users';
import { IconTextInput } from '../../../../components';
import { isEmailValid, isPasswordValid } from '../../../../models/validation';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import Variables from '../../../../constants/variables';


const validate = values => {
	const errors = {};
	if (!values.email) errors.email = 'Required';
	if (values.email && !isEmailValid(values.email)) errors.email = 'Invalid email format';
	if (!values.password) errors.password = 'Required';
	if (values.password && !isPasswordValid(values.password))
		errors.password = 'Password is not valid (min 3 characters)';

	return errors
};

class LoginForm extends PureComponent {
	constructor(props) {
		super(props);

		this.onLogin = this.onLogin.bind(this);
	}

	componentWillMount() {
		this.props.initialize({ email: '', password: '' });
	}

	onLogin(values) {
		Keyboard.dismiss();
		this.props.login(values.email, values.password)
	}

	render() {
		const { handleSubmit, submitting, invalid } = this.props;
		const colorGreen = (submitting || invalid ? 'rgba(92, 177, 69, 0.6)' : 'rgba(92, 177, 69, 1)');
		const colorWhite = (submitting || invalid ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 1)');


		return (
			<View style={StyleSheet.flatten(styles.container)} >
				<Field
					regular
					name="email"
					placeholder="Email"
					keyboardType='email-address'
					icon="at-sign"
					component={IconTextInput}
					autoCapitalize={'none'}
				/>
				<View style={StyleSheet.flatten([styles.section])}>
					<Field
						regular
						name="password"
						icon="lock"
						placeholder="Password"
						secureTextEntry={true}
						component={IconTextInput}
						autoCapitalize={'none'}
					/>
				</View>
				<View rounded style={StyleSheet.flatten([styles.section, styles.btnSection])}>
					<TouchableOpacity disabled={submitting || invalid } style={StyleSheet.flatten([styles.loginBtn, { backgroundColor: colorGreen }])} onPress={handleSubmit(this.onLogin)}>
						<Text uppercase={true} style={StyleSheet.flatten([styles.loginBtnText, { color: colorWhite }])}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		paddingHorizontal: 25,
		width: '100%'
	},
	section: {
		marginTop: 0
	},
	btnSection: {
		marginTop: 15,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginBtn: {
		width: 170,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		elevation: 1
	},
	loginBtnText: {
		textAlign: 'center',
		fontSize: 20,
		paddingTop: 3,
		fontFamily: Variables.baseFontSemiBold,
		color: Variables.white,
		lineHeight: 20
	}
});


const select = (state) => ({ });
export default compose(connect(select, { login }), reduxForm({ form: 'loginForm', validate }))(LoginForm);
