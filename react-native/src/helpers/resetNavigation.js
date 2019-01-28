/**
 * Created by ivan on 16.03.18.
 */
import { NavigationActions } from 'react-navigation';


function reset(navigation, rootScreen, firstChild) {
	if (firstChild) {
		const navigateAction = NavigationActions.navigate({
			routeName: firstChild,
			params: {},
		});

		navigation.dispatch(navigateAction);
	}

	const resetAction = NavigationActions.reset({ index: 0, actions: [{type: NavigationActions.NAVIGATE, routeName: rootScreen}], key: null });
	navigation.dispatch(resetAction);
};


export const resetUserRoute = function(navigation, jumpToIndex, index) {
	const { state } = navigation;

	if (state.index === index) {
		if (index === 0) {
			reset(navigation, 'Calls');
		} else if (index === 1) {
			reset(navigation, 'Talks');
		} else if (index === 2) {
			reset(navigation, 'Contacts');
		} else if (index === 3) {
			reset(navigation, 'Settings');
		}
	} else {
		jumpToIndex(index);
	}
};
