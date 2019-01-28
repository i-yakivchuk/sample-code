/**
 * Created by ivan on 20.03.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import { View,  Left, Body, Right, Text } from 'native-base';
import Variables from '../../../../constants/variables';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const emptyAvatar = require('../../../../assets/images/user_icon.png');


class CallLogItem extends React.Component {

	constructor(props) {
		super(props);

		this.renderCallIcon = this.renderCallIcon.bind(this);
		this.renderCallTime = this.renderCallTime.bind(this);
		this.renderCallStatusInfo = this.renderCallStatusInfo.bind(this);
	}

	pad(num) {
		return ('' + num).slice(-2);
	}

	hhmmss(secs) {
		let minutes = Math.floor(secs / 60);
		secs = secs%60;
		let hours = Math.floor(minutes/60);
		minutes = minutes%60;

		let time = '';
		time += hours ? this.pad(hours) + "h " : '';
		time += minutes ? this.pad(minutes) + "mim " : '';
		time += secs ? this.pad(secs) + 's ' : '';

		return time;
	}

	renderCallIcon() {
		const { item } = this.props;
		const name = item.type === 'INCOMING' ? 'phone-incoming' : (item.type === 'OUTCOMING' ? 'phone-outgoing' : 'phone-missed');
		const color = item.status === 'MISSED' ? 'transparent' : '#8E8E93';

		return (<MaterialCommunityIcons name={name} size={15} style={{marginRight: 6 }} color={color} />);
	}

	renderCallStatusInfo() {
		const { item } = this.props;
		const status = item.type === 'INCOMING' ? 'Incoming -' : (item.type === 'OUTCOMING' ? 'Outgoing -' : '');
		const time = (item.duration ? this.hhmmss(item.duration) : '');

		return (
			<View style={styles.bottomSection}>
				{item.status === 'MISSED' ? <Text style={StyleSheet.flatten(styles.missed)}>Missed call</Text> :
					<Text style={StyleSheet.flatten(styles.status)}>{ time ? status + ' ' + time : null}</Text>
				}
			</View>
		);
	}

	renderCallTime() {
		const { item } = this.props;
		let isToday = moment().isSame(moment(item.date), 'day');

		return (
			<View style={StyleSheet.flatten(styles.detailsSection)}>
				<Text style={StyleSheet.flatten(styles.date)}>{isToday ? moment(item.date).format('HH:mm') : moment(item.date).format('DD/MM/YYYY')}</Text>
				<IonicIcon name={'ios-information-circle-outline'} size={24} color={'#60BA46'}/>
			</View>
		);
	}

	renderAvatar = () => {
		const { item } = this.props;
		const contact = item.to || item.from;

		return(
			<View style={StyleSheet.flatten(styles.itemLeft)}>
				{ this.renderCallIcon() }
				<TouchableHighlight style={ styles.imageContainer }>
					<Image style={ styles.image } source={(contact.avatar ? { uri: contact.avatar } : emptyAvatar)}/>
				</TouchableHighlight>
			</View>
		);
	};

	render() {
		const { item, onPress } = this.props;
		const contact = item.to || item.from;

		return (
			<TouchableOpacity style={[styles.container]} onPress={onPress}>
				<View style={StyleSheet.flatten(styles.item)}>
					{ this.renderAvatar() }
					<View style={StyleSheet.flatten(styles.row)}>
						<View style={StyleSheet.flatten(styles.topSection)}>
							<Text ellipsizeMode='tail' numberOfLines={1} style={StyleSheet.flatten(styles.name)}>{ contact.first_name || '' }{' '}{ contact.last_name || '' }</Text>
							{ this.renderCallTime() }
						</View>
						{ this.renderCallStatusInfo() }
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	item: {
		flex: 1,
		paddingVertical: 5,
		paddingLeft: 12,
		alignItems: 'center',
		flexDirection: 'row'
	},
	itemLeft: {
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
		textAlign: 'left',
		flexGrow: 1,
		flexShrink: 1,
		width: 'auto',
		paddingRight: 12,
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		justifyContent: 'flex-start',
		fontFamily: Variables.baseFontSemiBold,
		fontSize: 17,
		color: Variables.black
	},
	row: {
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		justifyContent: 'space-between',
		borderBottomColor: 'rgba(228,228,232,1)',
		borderBottomWidth: 1,
		borderStyle: 'solid',
		paddingBottom: 10,
		//backgroundColor: 'red',
		flex: 1
	},
	date: {
		color: '#8E8E93',
		fontSize: 15,
		paddingRight: 10,
		fontFamily: Variables.baseFontRegular
	},
	status: {
		width: '100%',
		fontFamily: Variables.baseFontRegular,
		fontSize: 15,
		color: 'rgba(142,142,147,1)'
	},
	missed: {
		width: '100%',
		fontFamily: Variables.baseFontRegular,
		fontSize: 15,
		color: '#F91048'
	},
	topSection: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
		paddingBottom: 5
	},
	detailsSection: {
		alignSelf: 'center',
		overflow: 'hidden',
		flexGrow: 0,
		flexShrink: 0,
		width: 'auto',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		alignContent: 'center',
		justifyContent: 'center',
		paddingRight: 12
	},
	bottomSection: {
		flex: 1,
		alignItems: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
	}
});


const select = (state) => ({});
export default connect(select, { })(CallLogItem);
