/**
 * Created by ivan on 14.03.18.
 */
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Content, Container } from 'native-base';
import { StyleSheet, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import Variables from '../../constants/variables';
import { ScrollKeyboardContent } from '../../components';
import LoginForm from './components/login-form';
import AlertModal from './components/alert-modal';
import { ModalLoader } from '../../components/modal-loader';
const logoUrl = require('../../assets/login_logo.png');


class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = { showModal: false };

		this.go2faRequest = this.go2faRequest.bind(this);
		this.goRegister = this.goRegister.bind(this);
		this.onCloseAlertModal = this.onCloseAlertModal.bind(this);
	}

	componentWillReceiveProps(props) {
		if (props.loginError && !this.props.loginError)
			this.setState({ showModal: true });

		if (props.is2faRequired) this.go2faRequest();
	}

	onCloseAlertModal() {
		this.setState({ showModal: false });
	}

	goRegister() {
		const { navigate } = this.props.navigation;
		navigate('Register');
	}

	go2faRequest() {
		const { navigate } = this.props.navigation;
		navigate('Request2FA');
	}

	render() {
		return (
			<ScrollKeyboardContent style={styles.full} scrollEnabled={false} keyboardShouldPersistTaps='handled'>
				<ModalLoader loading={this.props.loading} />
				<Container>
					{ this.state.showModal && <AlertModal goRegister={this.goRegister} close={this.onCloseAlertModal} />}
					<LinearGradient colors={Variables.baseLinearGradientColor} style={styles.full}>
						<View style={styles.center}>
							<Image source={logoUrl} style={{ width: 120, height: 120 }} resizeMode="contain" />
							<Text style={styles.title}>Log In</Text>
							<Text style={styles.text}>Welcome to the Titus Talk, please use your Titus Global or Titus Community login to enter</Text>
							<LoginForm />
						</View>
						<View style={styles.bottomContainer}>
							<Text style={styles.text}>Do you have an account yet?</Text>
							<TouchableOpacity onPress={this.goRegister}>
								<Text style={styles.linkText}>Register an account</Text>
							</TouchableOpacity>
						</View>
					</LinearGradient>
				</Container>
			</ScrollKeyboardContent>
		);
	}
}

const styles = StyleSheet.create({
	full: {
		flex: 1
	},
	container: {
		flex: 1,
		backgroundColor: Variables.lightGray
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	bottomContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 15
	},
	title: {
		marginTop: 20,
		paddingBottom: 2,
		fontSize: 30,
		justifyContent: 'center',
		alignItems: 'center',
		color: Variables.white,
		fontFamily: Variables.baseFontSemiBold
	},
	text: {
		width: '75%',
		textAlign: 'center',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 16,
		lineHeight: 16,
		color: Variables.white,
		fontFamily: Variables.baseFontLight
	},
	linkText: {
		color: Variables.baseGreenColor,
		fontFamily: Variables.baseFontSemiBold,
		fontSize: 16,
		lineHeight: 16,
		textDecorationLine: 'underline',
		padding: 5
	}
});

const select = (state) => ({
	loginError: state.ui.users.loginError,
	loading: state.ui.users.loading,
	is2faRequired: state.ui.users.is2faRequired
});
export default connect(select, {})(Login);
