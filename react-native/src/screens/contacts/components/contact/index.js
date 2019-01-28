/**
 * Created by ivan on 20.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { View,  Left, Body, Right, Text } from 'native-base';
import Variables from '../../../../constants/variables';
import { createCall } from '../../../../actions/call';
import { selectContact, addNewContact } from '../../../../actions/contacts';
import Icon from 'react-native-vector-icons/FontAwesome';
const emptyAvatar = require('../../../../assets/images/user_icon.png');
import moment from 'moment';


class Contact extends React.Component {

	constructor(props) {
		super(props);

		this.onViewDetailsClick = this.onViewDetailsClick.bind(this);
	}

	onViewDetailsClick = () => {
		const { contact } = this.props;
		const isNewContact = this.props.isNewContact;

		if (!isNewContact) {
			this.props.selectContact(contact.id);
		} else {
			this.props.addNewContact(contact);
		}

		this.props.navigation.navigate({
			key:'ContactDetails',
			routeName: 'ContactDetails',
			params: { isNewContact: isNewContact }
		});
	};

	render() {
		const { contact } = this.props;
		const onlineDuration =  contact && contact.lastActivity ? moment(contact.lastActivity).fromNow() : null;

		return (
			<TouchableOpacity style={[styles.container]}  onPress={this.onViewDetailsClick}>
				<View style={StyleSheet.flatten(styles.item)}>
						<TouchableHighlight style={ styles.imageContainer }>
							<Image style={ styles.image } source={(contact.avatar ? { uri: contact.avatar } : emptyAvatar)}/>
						</TouchableHighlight>
					<View style={StyleSheet.flatten(styles.row)}>
						<Text style={StyleSheet.flatten(styles.name)}>{ contact.first_name || '' }{' '}{ contact.last_name || '' }</Text>
						{contact.is_online
							? <Text style={StyleSheet.flatten([styles.status, {color: 'rgba(10, 92, 170, 0.8)'}])}><Icon name={'circle'} size={10} color={'rgba(96,186,70,1)' }/> Online</Text>
							: <Text style={StyleSheet.flatten(styles.status)}>{onlineDuration ? `Last seen ${onlineDuration}` : ''}</Text>
						}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white'
	},
	item: {
		paddingVertical: 5,
		paddingLeft: 15,
		alignItems: 'center',
		flexDirection: 'row'
	},
	imageContainer: {
		height: 48,
		width: 60,
		borderRadius: 24
	},
	image: {
		height: 48,
		width: 48,
		borderRadius: 24
	},
	name: {
		width: '100%',
		fontFamily: Variables.baseFontSemiBold,
		fontSize: 17,
		color: Variables.black
	},
	row: {
		alignItems: 'center',
		alignContent: 'center',
		borderBottomColor: 'rgba(228,228,232,1)',
		borderBottomWidth: 1,
		borderStyle: 'solid',
		width: '100%',
		paddingBottom: 10,
		flex: 1
	},
	status: {
		width: '100%',
		fontFamily: Variables.baseFontRegular,
		fontSize: 15,
		color: 'rgba(142,142,147,1)'
	}
});


const select = (state) => ({});
export default connect(select, { createCall, selectContact, addNewContact })(Contact);
