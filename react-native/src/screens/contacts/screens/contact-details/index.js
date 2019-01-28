/**
 * Created by ivan on 14.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Content,  Input, List, ListItem } from 'native-base';
import { ContactDetailsNavigationBar } from '../../../../components';
import { StyleSheet, View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import Variables from '../../../../constants/variables';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { getSelectedContact } from '../../../../selectors/contacts';
import { createCall } from '../../../../actions/call';
import { createConversation, createConversationSuccess, selectConversation, createConversationError } from '../../../../actions/chat';
import {  } from '../../../../actions/talks';
const emptyAvatar = require('../../../../assets/images/user_icon.png');
import { getCurrent } from '../../../../selectors/users';
import { getConversationsList } from '../../../../selectors/talks';
import { normalize } from 'normalizr';
import { conversationsSchema } from '../../../../normalizr';
import { deleteContact, addContact, addContactSuccess, getMyContacts } from '../../../../actions/contacts';
import R from 'ramda';


class ContactDetails extends React.Component {

	static defaultProps = {
		contact: {
			id: '',
			first_name: '',
			last_name: '',
			username: '',
			avatar: '',
			mobile_number: '',
			email: '',
			isNewContact: false
		}
	};

	constructor(props) {
		super(props);

		this.state = { disableOnMessageBtn: false };

		this.onCall = this.onCall.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.onCallVideo = this.onCallVideo.bind(this);
		this.onDeleteContact = this.onDeleteContact.bind(this);
		this.onBackTap = this.onBackTap.bind(this);
		this.onSaveTap = this.onSaveTap.bind(this);
		this.renderHeader = this.renderHeader.bind(this);
		this.renderDetails = this.renderDetails.bind(this);
		this.renderActionButton = this.renderActionButton.bind(this);
	}

	componentDidMount() {
		this.updateNavigationHeader();
		this.setState({ disableOnMessageBtn: false });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.contact && nextProps.contact && !R.equals(this.props.contact, nextProps.contact)) {
			const { contact, currentUser } = nextProps;
			const isNewContact = contact.isNewContact && (currentUser.mobile_number !== contact.mobile_number);

			this.props.navigation.setParams({
				onBackTap: this.onBackTap,
				rightTitle:	isNewContact ? 'Save' : null,
				onSaveTap: isNewContact ? this.onSaveTap : null
			});
		}
	}

	onBackTap() {
		this.props.navigation.goBack(null);
	}

	updateNavigationHeader = () => {
		const { contact, currentUser } = this.props;
		const isNewContact = contact.isNewContact && (currentUser.mobile_number !== contact.mobile_number);

		this.props.navigation.setParams({
			onBackTap: this.onBackTap,
			rightTitle:	isNewContact ? 'Save' : null,
			onSaveTap: isNewContact ? this.onSaveTap : null
		});
	};

	async onSaveTap() {
		const { contact } = this.props;
		if (!contact.id) return true;

		await this.props.addContact(contact.id).then(() => {
			this.props.addContactSuccess();
			this.props.navigation.pop(2);
		}).catch(() => {
			Alert.alert(
				"Error",
				"System error. Please try again later.",
				[
					{ text: 'OK', onPress: () => {}, style: 'cancel' },
				], { cancelable: false });
		});
	}

	onCall() {
		const { contact, pending } = this.props;

		if (pending) return true;

		this.props.createCall(contact, false);
	}

	onCallVideo() {
		const { contact, pending } = this.props;

		if (pending) return true;

		this.props.createCall(contact, true);
	}

	async onMessage() {
		const { contact } = this.props;

		if (!contact.id)
			return false;

		this.setState({ disableOnMessageBtn: true });

		await this.props.createConversation(contact.id).then(resp => {
			const conversationsNorm = normalize(resp, conversationsSchema);
			this.props.createConversationSuccess(conversationsNorm);

			this.props.selectConversation(resp.id);
			this.props.navigation.navigate({ key: 'Chat', routeName: 'Chat' });

			this.setState({ disableOnMessageBtn: false });
		}).catch(() => {
			this.setState({ disableOnMessageBtn: false });
			this.props.createConversationError();
		});
	}

	confirmContactDelete = () => {
		Alert.alert(
		'Confirmation',
		'Are you sure you want to delete this contact?',
		[
			{ text: 'Cancel', onPress: () => {}, style: 'cancel' },
			{ text: 'Delete', onPress: () => { this.onDeleteContact() }},
		], { cancelable: false });
	};

	async onDeleteContact() {
		const { contact: { id } } = this.props;
		if (!id) return false;

		await this.props.deleteContact(id).then(() => {
			this.props.getMyContacts(true, true);
			this.props.navigation.navigate({ key: 'Contacts', routeName: 'Contacts' });
		}).catch(() => {
			Alert.alert(
				"Error",
				"System error. Please try again later.",
				[
					{ text: 'OK', onPress: () => {}, style: 'cancel' },
				], { cancelable: false });
		});
	}

	renderHeader() {
		const { contact } = this.props;

		return(
			<View style={StyleSheet.flatten(styles.headerContainer)}>
				<View>
					<Text style={StyleSheet.flatten(styles.name)}>{ contact ? contact.first_name || '': '' }{' '}{ contact ? contact.last_name || '': '' }</Text>
					<Text style={StyleSheet.flatten(styles.nickName)}>{contact && contact.username ? '@' + contact.username : ''}</Text>
				</View>
				<View>
					<Image style={ styles.image } source={(contact && contact.avatar ? { uri: contact.avatar } : emptyAvatar)}/>
				</View>
			</View>
		)
	}

	renderActionButton() {
		const { pending } = this.props;

		return(
			<View style={StyleSheet.flatten(styles.buttonContainer)}>
				<TouchableOpacity disabled={this.state.disableOnMessageBtn} onPress={this.onMessage} style={StyleSheet.flatten(styles.iconContainer)}>
					<IonicIcon name={'md-mail-open'} size={30} color={Variables.primaryColor} />
				</TouchableOpacity>
				<TouchableOpacity disabled={pending} onPress={this.onCall} style={StyleSheet.flatten(styles.iconContainer)}>
					<IonicIcon name={'md-call'} size={30} color={Variables.primaryColor} />
				</TouchableOpacity>
				<TouchableOpacity disabled={pending} onPress={this.onCallVideo} style={StyleSheet.flatten(styles.iconContainer)}>
					<IonicIcon name={'ios-videocam'} size={31} style={{marginBottom: 1, marginLeft: 3}} color={Variables.primaryColor} />
				</TouchableOpacity>
			</View>
		)
	}

	renderDetails() {
		const { contact, currentUser } = this.props;

		return(
			<View style={StyleSheet.flatten(styles.detailsContainer)}>
				<List>
					<ListItem>
						<View style={styles.row}>
							<Text style={StyleSheet.flatten(styles.label)}>phone</Text>
							<Text style={StyleSheet.flatten(styles.input)}>{contact ? contact.mobile_number: ''}</Text>
						</View>
					</ListItem>
					<ListItem>
						<View style={styles.row}>
							<Text style={StyleSheet.flatten(styles.label)}>email</Text>
							<Text style={StyleSheet.flatten(styles.input)}>{contact ? contact.email: ''}</Text>
						</View>
					</ListItem>
					{ currentUser.mobile_number !== contact.mobile_number && !contact.isNewContact ?
						(
							<ListItem>
								<TouchableOpacity onPress={this.confirmContactDelete} style={styles.row}>
									<View style={StyleSheet.flatten(styles.rowItemButton)}>
										<Text style={StyleSheet.flatten(styles.redItem)}>Delete Contact</Text>
									</View>
								</TouchableOpacity>
							</ListItem>
						) : null
					}
				</List>
			</View>
		);
	}


	render() {
		const { currentUser, contact } = this.props;

		return (
			<Content style={StyleSheet.flatten(styles.container)}>
				<View>
					{ this.renderHeader() }
					{ currentUser.mobile_number !== contact.mobile_number && !contact.isNewContact ? this.renderActionButton() : null }
					{ this.renderDetails() }
				</View>
			</Content>
		);
	}
}

ContactDetails.navigationOptions = ContactDetailsNavigationBar;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Variables.white
	},
	row: {
		flex: 1,
		marginLeft: 2
	},
	rowItemButton: {
		flex: 1,
		justifyContent: 'space-between',
		marginTop: 35,
		flexDirection: 'row'
	},
	rowItemButtonSub: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignContent: 'center',
		alignItems: 'center'
	},
	headerContainer: {
		flex: 1,
		marginTop: 10,
		paddingVertical: 8,
		paddingHorizontal: 18,
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	buttonContainer: {
		flex: 1,
		paddingHorizontal: 17,
		justifyContent: 'flex-start',
		flexDirection: 'row'
	},
	detailsContainer: {
		paddingTop: 20
	},
	iconContainer: {
		alignSelf: 'center',
		marginRight: 16,
		justifyContent: 'center',
		alignItems: 'center',
		height: 48,
		width: 48,
		borderRadius: 50,
		backgroundColor: 'rgba(228,228,232,1)'
	},
	name: {
		fontWeight: '500',
		fontFamily: Variables.baseFontSemiBold,
		color: Variables.black,
		fontSize: 20,
		lineHeight: 24,
		width: '100%',
		textAlign: 'left'
	},
	nickName: {
		fontFamily: Variables.baseFontSemiBold,
		fontSize: 17,
		lineHeight: 20,
		color: '#8E8E93',
		width: '100%',
		textAlign: 'left'
	},
	image: {
		height: 88,
		width: 88,
		borderRadius: 44
	},
	label: {
		color: Variables.primaryColor,
		fontFamily: Variables.baseFontRegular,
		fontSize: 14,
		lineHeight: 16,
		paddingBottom: 5
	},
	input: {
		color: Variables.black,
		fontFamily: Variables.baseFontRegular,
		fontSize: 17,
		lineHeight: 20
	},
	redItem: {
		color: '#F91048',
		fontFamily: Variables.baseFontRegular,
		fontSize: 17,
		lineHeight: 20
	},
	item: {
		color: Variables.black,
		fontFamily: Variables.baseFontRegular,
		fontSize: 17,
		lineHeight: 20
	}
});


const select = (state) => ({
	contact: getSelectedContact(state) || state.ui.contacts.addContact || undefined,
	list: getConversationsList(state),
	pending: state.ui.call.pending,
	currentUser: state.ui.app.rehydrated ? getCurrent(state) : null
});

export default connect(select, { createCall, createConversationSuccess, selectConversation,
	createConversationError, createConversation,
	addContactSuccess, deleteContact, addContact, getMyContacts })(ContactDetails);
