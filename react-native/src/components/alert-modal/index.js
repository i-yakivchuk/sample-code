/**
 * Created by ivan on 10.05.18.
 */
/**
 * Created by ivan on 02.04.18.
 */
import React from 'react';
import { StyleSheet, Modal, View, TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Variables from '../../constants/variables';


export default class AlertModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = { show: false };
		this.close = this.close.bind(this);
	}

	componentWillReceiveProps(props) {
		this.setState({ show: props.show });
	}

	close() {
		this.setState({ show: false });
		const onClose = this.props.onClose;

		if (onClose) onClose()
	}

	render() {
		const { title, text, btnText } = this.props;
		const { show } = this.state;

		return show ? (
				<Modal animationType='fade' transparent={true} visible={show} onRequestClose={this.close}>
					<View style={styles.modal}>
						<View style={styles.content}>
							<View>
								<Text style={StyleSheet.flatten(styles.title)}>{title || 'Wrong credentials'}</Text>
							</View>
							<View style={{ padding: 12 }}>
								<Text style={styles.bodyText}>{text}</Text>
							</View>
							<TouchableOpacity style={{width: '100%'}} onPress={this.close}>
								<View style={styles.btnContainer}>
									<Text uppercase={true} style={StyleSheet.flatten(styles.btnText)}>{btnText || 'Try Again'}</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			): null;
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
		paddingHorizontal: 60,
		backgroundColor: 'hsla(0, 0%, 0%, 0.4)'
	},
	content: {
		maxWidth: 325,
		borderRadius: 20,
		padding: 0,
		maxHeight: 280,
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
		height: 40
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
});