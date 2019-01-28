/**
 * Created by ivan on 14.03.18.
 */
import React from 'react';
import Contacts from './index';
import { ContactDetails, AddContact } from './screens';
import { defaultHeaderConfig } from '../../router';
import { StackNavigator  } from 'react-navigation';


const ContactsStack = StackNavigator({
	Contacts: {
		screen: Contacts,
		navigationOptions: ({ navigation }) => ({
			title: 'Contacts',
			...defaultHeaderConfig
		})
	},
	ContactDetails: {
		screen: ContactDetails,
		navigationOptions: ({ navigation }) => ({
			title: '',
			...defaultHeaderConfig
		})
	},
	AddContact: {
		screen: AddContact,
		navigationOptions: ({ navigation }) => ({
			title: '',
			...defaultHeaderConfig
		})
	}
}, {
	headerMode: 'screen'
});

export default ContactsStack;
