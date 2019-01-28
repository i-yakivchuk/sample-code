/**
 * Created by ivan on 14.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import {Content, Input, List, ListItem, Spinner} from 'native-base';
import {StyleSheet, View, Text, Alert, TouchableOpacity, Image, FlatList} from 'react-native';
import Variables from '../../../../constants/variables';
import { ContactDetailsNavigationBar } from "../../../../components";
import Contact from "../../components/contact";
import { getUserContacts } from "../../../../selectors";
import { searchContact } from '../../../../actions/contacts';


class AddContact extends React.Component {

	constructor(props) {
		super(props);

		this.state = { search: '' };
		this.inputChangeTimer = null;
	}

	componentDidMount() {
		this.props.navigation.setParams({
			onBackTap: this.onBackTap
		});
	}

	onBackTap = () => {
		this.setState({ search: '' });
		this.props.navigation.goBack(null);
	};

	inputChangeHandler = (search) => {
		clearTimeout(this.inputChangeTimer);

		this.setState({ search });

		this.inputChangeTimer = setTimeout(() => {
			this.props.searchContact(search);
		}, 700);
	};

	keyExtractor = (item, index) => item.id;

	renderFooter = () => {
		if (this.props.loading) return (<Spinner size="small" color={Variables.primaryColor} />);

		return null;
	};

	renderItem = (item) => {
		return <Contact isNewContact={true} navigation={this.props.navigation} key={item.item.id} contact={item.item} />
	};

	renderFlatList = () => {
		const { contacts } = this.props;

		return (
			<List style={StyleSheet.flatten(styles.container)}>
				<FlatList
					style={{padding: 0}}
					data={!this.state.search ? [] : contacts}
					keyExtractor={this.keyExtractor}
					onEndReachedThreshold={0.5}
					renderItem={this.renderItem}
					ListHeaderComponent={this.renderSearch}
					ListFooterComponent={this.renderFooter}
				/>
			</List>
		);
	};

	renderSearch = () => {
		return (
			<View style={StyleSheet.flatten(styles.searchHeader)}>
				<View>
					<Text style={StyleSheet.flatten(styles.title)}>Add Contact</Text>
				</View>
				<View>
					<Input
						onChangeText={(e) => { this.inputChangeHandler(e); }}
						value={this.state.search}
						style={StyleSheet.flatten(styles.searchInput)}
						placeholder='Type username or phone number' placeholderTextColor={'rgba(142,142,147,1)'} />
				</View>
			</View>
		);
	}

	render() {
		return this.renderFlatList();
	}
}

AddContact.navigationOptions = ContactDetailsNavigationBar;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Variables.white
	},
	searchHeader: {
		marginTop: 5,
		paddingBottom: 10,
		paddingHorizontal: 15
	},
	title: {
		marginBottom: 10,
		fontFamily: Variables.baseFontSemiBold,
		color: Variables.black,
		fontSize: 30,
		width: '100%',
		textAlign: 'left'
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
	}
});


const select = (state) => ({
	contacts: state.ui.contacts.search,
	loading: state.ui.contacts.searchLoading
});

export default connect(select, { searchContact })(AddContact);
