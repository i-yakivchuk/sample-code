/**
 * Created by ivan on 14.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Content, Spinner, Item, Input, List } from 'native-base';
import { StyleSheet, View, Text, Alert, FlatList, TouchableHighlight, TouchableOpacity, Image} from 'react-native';
import { ContactsNavigationBar } from '../../components';
import { loadContacts, getMyContacts } from '../../actions/contacts';
import { getUserContacts } from '../../selectors';
import Variables from '../../constants/variables';
import Contact from './components/contact';
import { IconIcoMoon, ShareButton } from '../../components';


class Contacts extends React.Component {

	constructor(props) {
		super(props);


		this.onRefresh = this.onRefresh.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.renderEmptyContacts = this.renderEmptyContacts.bind(this);
	}

	async componentDidMount() {
		this.props.navigation.setParams({
			onAddTap: this.navigateAddContact
		});

		await this.props.loadContacts(true);
	}

	navigateAddContact = () => {
		this.props.navigation.navigate({ key: 'AddContact', routeName: 'AddContact' });
	};

	keyExtractor = (item, index) => item.id;

	renderEmptyContacts = () => {
		return (
			<View style={StyleSheet.flatten([styles.column])}>
				<View style={StyleSheet.flatten([styles.center])}>
					<Text style={styles.emptyTitle}>Empty contacts</Text>
					<IconIcoMoon name={'birthday-card'} size={90} color={Variables.black} />
					<Text style={StyleSheet.flatten([styles.emptyMsg, { marginTop: 40 }])}>Your contacts may register soon - </Text>
          <Text style={styles.emptyMsg}>help them out, invite to the app</Text>
					<View rounded style={StyleSheet.flatten([styles.section, styles.btnSection])}>
						<ShareButton text={'Share link'}/>
					</View>
				</View>
			</View>
		);
	};

	onRefresh() {
		this.props.getMyContacts(true);
	}

	renderFooter = () => {
		if (!this.props.loading) return null;

		return (
			<Spinner size="small" color={Variables.primaryColor} />
		);
	};

	renderItem = (item) => {
		return <Contact navigation={this.props.navigation} key={item.item.id} contact={item.item} />
	};

	renderFlatList = () => {
		const { contacts, refreshing } = this.props;

		return (
			<List style={StyleSheet.flatten(styles.container)}>
				<FlatList
					style={{padding: 0}}
					data={contacts}
					keyExtractor={this.keyExtractor}
					refreshing={refreshing}
					onRefresh={this.onRefresh}
					onEndReachedThreshold={0.5}
					renderItem={this.renderItem}
					ListHeaderComponent={this.renderSearch}
					ListFooterComponent={this.renderFooter}
				/>
			</List>
		);
	};

	renderSearch = () => {
		if (!this.props.searchLoading) {
			return (
				<View style={StyleSheet.flatten(styles.searchHeader)}>
					{/*<View><Text style={StyleSheet.flatten(styles.title)}>Contacts</Text></View>*/}
					<View>
						{/*<Input style={StyleSheet.flatten(styles.searchInput)} placeholder='Search' placeholderTextColor={'rgba(142,142,147,1)'} />*/}
					</View>
				</View>
			)
		} else {
			return (<Spinner size="small" color={Variables.primaryColor} />);
		}
	};

	render() {
		const isEmpty = (!this.props.contacts.length && !this.props.loading);
		return isEmpty ? this.renderEmptyContacts() : this.renderFlatList();
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Variables.white
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Variables.white
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	searchHeader: {
		paddingBottom: 10,
		paddingHorizontal: 15
	},
	searchInput: {
		flex: 1,
		height: 36,
		fontSize: 13,
		padding: 0,
		borderColor: 'rgba(228,228,232,1)',
		borderWidth: 1,
		textAlign: 'center',
		color: 'rgba(142,142,147,1)',
		backgroundColor: 'rgba(228,228,232,1)',
		borderRadius: 5
	},
	title: {
		marginBottom: 10,
		fontFamily: Variables.baseFontSemiBold,
		color: Variables.black,
		fontSize: 30,
		width: '100%',
		textAlign: 'left'
	},
	emptyTitle: {
		marginBottom: 40,
		fontFamily: Variables.baseFontSemiBold,
		color: Variables.black,
		fontSize: 30,
		textAlign: 'center'
	},
	emptyMsg: {
		marginTop: 1,
		fontFamily: Variables.baseFontSemiBold,
		color: Variables.black,
		fontSize: 17,
		width: '95%',
		paddingHorizontal: 25,
		textAlign: 'center'
	},
	btnSection: {
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

Contacts.navigationOptions = ContactsNavigationBar;

const select = (state) => ({
	contacts: getUserContacts(state),
	loading: state.ui.contacts.loading,
	refreshing: state.ui.contacts.refreshing,
	searchLoading: state.ui.contacts.searchLoading
});

export default connect(select, { loadContacts, getMyContacts })(Contacts);
