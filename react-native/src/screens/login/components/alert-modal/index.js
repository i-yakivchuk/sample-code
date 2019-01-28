/**
 * Created by ivan on 02.04.18.
 */
import React from 'react';
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Variables from '../../../../constants/variables';


export default class AlertModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = { isVisible: true };
	}

	render() {
		return (
			<Modal animationType='fade' transparent={true} visible={this.state.isVisible} onRequestClose={() => { }}>
				<View style={styles.modal}>
					<View style={styles.content}>
						<View>
							<Text style={StyleSheet.flatten(styles.title)}>Wrong credentials</Text>
						</View>
						<View style={{ padding: 12 }}>
							<Text style={StyleSheet.flatten(styles.bodyText)}>Please check your email and password.</Text>
							<TouchableOpacity onPress={() => {}}>
								<Text style={StyleSheet.flatten(styles.bodyText)}>
									You could <Text style={StyleSheet.flatten(styles.link)}>reset</Text> your password or
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => { this.props.close(); this.props.goRegister(); }} >
								<Text style={StyleSheet.flatten(styles.bodyText)}><Text style={StyleSheet.flatten(styles.link)}>register</Text> the new account if you haven’t</Text>
							</TouchableOpacity>
							<Text style={StyleSheet.flatten(styles.bodyText)}>registered one before at Titus Global</Text>
						</View>
						<TouchableOpacity style={styles.btnContainer} onPress={this.props.close}>
							<Text uppercase={true} style={StyleSheet.flatten(styles.btnText)}>Try Again</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		top: 0,
		left: 0,
		position: 'absolute',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
		backgroundColor: 'hsla(0, 0%, 0%, 0.4)'
	},
	content: {
		maxWidth: 325,
		borderRadius: 20,
		padding: 0,
		maxHeight: 350,
		borderWidth: 0,
		width: '100%',
		alignItems: 'center',
		backgroundColor: Variables.baseOrangeColor
	},
	title: {
		marginTop: 10,
		color: Variables.white,
		fontSize: 24,
		fontFamily: Variables.baseFontSemiBold,
		lineHeight: 36
	},
	bodyText: {
		fontSize: 16,
		color: Variables.white,
		lineHeight: 20,
		textAlign: 'center',
		fontFamily: Variables.baseFontLight
	},
	btnContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.2)',
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	btnText: {
		padding: 15,
		fontSize: 20,
		width: '100%',
		textAlign: 'center',
		fontWeight: 'bold',
		color: Variables.white,
		fontFamily: Variables.baseFontLight
	},
	link: {
		padding: 5,
		textDecorationLine: 'underline',
		fontWeight: 'bold',
		color: Variables.white,
	}
});