/**
 * Created by ivan on 16.03.18.
 */
import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Image, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, Button } from 'native-base';
import Swiper from 'react-native-swiper';
import Variables from '../../constants/variables';
import { closeSlideShow } from '../../actions/app';


class SlideShow extends React.PureComponent {
	static navigationOptions = {
		header: {
			visible: false,
		}
	};

	constructor(props) {
		super(props);
	}

	render() {
		const width = Dimensions.get('window').width;
		return (
			<View style={StyleSheet.flatten(styles.container)}>
				<View style={StyleSheet.flatten(styles.swiperView)}>
					<Swiper containerStyle={{width}} dot={<View style={StyleSheet.flatten(styles.dot)} />} activeDot={<View style={StyleSheet.flatten(styles.activeDot)} />} loop={false}>
						<View style={StyleSheet.flatten(styles.cardView)}>
							<View style={StyleSheet.flatten(styles.card)}>
								<Text style={StyleSheet.flatten(styles.cardTitle)}>
									Lorem ipsum dolor sit amet
								</Text>
								<Image source={require('../../assets/logo.png')} style={{ width: 176, height: 176 }} resizeMode="contain" />
								<Text style={StyleSheet.flatten(styles.cardText)}>
									Lorem ipsum dolor sit amet, timeam veritus sapientem
								</Text>
							</View>
						</View>
						<View style={StyleSheet.flatten(styles.cardView)}>
							<View style={StyleSheet.flatten(styles.card)}>
								<Text style={StyleSheet.flatten(styles.cardTitle)}>
									Lorem ipsum dolor sit amet
								</Text>
								<Image source={require('../../assets/logo.png')} style={{ width: 176, height: 176 }} resizeMode="contain" />
								<Text style={StyleSheet.flatten(styles.cardText)}>
									Lorem ipsum dolor sit amet, timeam veritus sapientem
									Lorem ipsum dolor sit amet, timeam veritus sapientem
								</Text>
							</View>
						</View>
						<View style={StyleSheet.flatten(styles.cardView)}>
							<View style={StyleSheet.flatten(styles.card)}>
								<Text style={StyleSheet.flatten(styles.cardTitle)}>
									Welcome to Titus Talk
								</Text>
								<Image source={require('../../assets/logo.png')} style={{ width: 176, height: 176 }} resizeMode="contain" />
								<Text style={StyleSheet.flatten(styles.cardText)}>
									Free secure messaging platform for Titus Community
								</Text>
							</View>
						</View>
					</Swiper>
				</View>
				<View style={StyleSheet.flatten(styles.skipView)}>
					<TouchableOpacity  style={StyleSheet.flatten(styles.cardButton)}  onPress={() => { this.props.closeSlideShow()}}>
						<Text style={StyleSheet.flatten(styles.cardButtonText)}>Start messaging</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		width: '100%',
		height: '100%',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	swiperView: {
		width: '100%',
		height: '80%',
		alignItems: 'center',
	},
	skipView: {
		width: '100%',
		marginBottom: 25,
		flexDirection: 'column',
		alignItems: 'center',
	},
	cardView: {
		flex: 1,
		width: '100%',
		height: '100%',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center'
	},
	card: {
		top: '0%',
		width: '85%',
		height: '80%',
		backgroundColor: 'white',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 25
	},
	cardTitle: {
		width: '70%',
		textAlign: 'center',
		fontSize: 34,
		fontFamily: Variables.baseFontLight,
		color: Variables.black
	},
	cardText: {
		width: '90%',
		textAlign: 'center',
		marginTop: 15,
		fontSize: 17,
		fontFamily: Variables.baseFontRegular,
		color: Variables.black
	},
	cardButton: {
		width: '75%',
		height: 44,
		top: '5%',
		backgroundColor: '#0A5CAA',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 7,
		elevation: 1
	},
	cardButtonText: {
		width: '90%',
		textAlign: 'center',
		fontSize: 19,
		fontFamily: Variables.baseFontMedium,
		color: Variables.white
	},
	dot: {
		backgroundColor: '#E4E4E8',
		width: 7,
		height: 7,
		borderRadius: 7,
		marginLeft: 5,
		marginRight: 5
	},
	activeDot: {
		backgroundColor: '#0A5CAA',
		width: 7,
		height: 7,
		borderRadius: 7,
		marginLeft: 5,
		marginRight: 5
	}
});

const select = (state) => ({ });
export default compose(connect(select, { closeSlideShow }))(SlideShow);
