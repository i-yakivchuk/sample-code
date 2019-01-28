import React from 'react';
import {
	MobileMessageList,
	MobilePublishSettings,
	MobileMessageContent,
	MobileContentPreview
} from './components';


export default class Mobile extends React.Component {
	render() {
		return (
			<div className='mobile-page'>
				<div className='mobile-page__main-content'>
					<MobileMessageList />
					<div className='mobile-page__forms'>
						<MobileMessageContent />
						<MobilePublishSettings />
					</div>
				</div>
				<MobileContentPreview />
			</div>
		);
	}
}
