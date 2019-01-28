const primaryColor = '#0A5CAA';
export default {
  callRingTimeout: 5000,
	callIterationCount: 9,

  primaryColor,
  lightBlue: '#2E82C3',
  disablePrimaryColor: 'rgba(10, 92, 170, 0.3)',
  tintColor: primaryColor,
  lightGray: '#F6F6F6',
  gray: '#B3B9B8',
  darkGray: '#687471',
  leadGray: '#4b5351',
  black: '#272933',
  white: '#FFFFFF',
  red: '#FF3B30',
  green: '#58C726',
  darkGreen: '#27B99A',
  facebookBlue: '#4267B2',
  twitterBlue: '#00aced',
  background: '#F2F2F2',
  borderColor: '#4267B2',
	transparent: 'transparent',
  blackOverlayColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  getMessageIconColor: (isAuthor) => isAuthor ? '#40c337' : '#007ee5',
	getMessageFileNameColor: (isAuthor) => isAuthor ? 'rgba(96, 186, 70, 1)' : '#2E82C3',
	getMessageFileSizeColor: (isAuthor) => isAuthor ? 'rgba(96, 186, 70, 1)' : 'rgba(142, 142, 147, 1)',

  errorColor: '#B00020',
  errorColorLighten: 'rgba(176,0,32, 0.8)',

  //text color
  darkGrayText: 'rgba(142, 142, 147, 1)',
  lightGrayText: 'rgba(216, 216, 216, 1)',
  checkDoneText: 'rgba(96, 186, 70, 1)',


  // background color
  grayBackground: 'rgba(228,228,232,1)',

  baseLinearGradientColor: ['#1895D4', '#0A5CAA'],
	baseGreenColor: '#5CB145',
  baseOrangeColor: '#F47F00',

  // Text
  textColor: '#272933',
  secondaryTextcolor: '#687471',
  textGray: '#95989A',
  baseFont: "SFProText-Regular",
  baseFontSemiBold: "SFProText-Semibold",
  baseFontMedium: "SFProText-Medium",
  baseFontRegular: "SFProText-Regular",
  baseFontLight: "SFProText-Light",

  // Profile
  iconColor: '#B3B9B8',
  iconSize: 26,
  profileIconSize: 48,
  signOutTextColor: '#FF3B30',

  // Tabs
  tabIconDefault: '#687471',
  tabBgColor: '#F8F8F8',
  tabIconSelected: primaryColor,

  // Icons
  iconOnBackground: 'rgba(255, 255, 255, 0.9)',
	iconOfBackground: 'rgba(0, 0, 0, 0.6)',

  baseBorderColor: 'rgba(182,186,191,1)',
};
