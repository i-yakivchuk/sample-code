/**
 * Created by ivan on 22.11.17.
 */
import React from 'react';
import {
	ArchiveMessageList,
	ArchiveMessagePreview
} from './components';


export default class Archive extends React.Component {

	render() {
		return (
			<div>
				<div className='main-header-after'></div>
				<div className='container-fluid home-page'>
					<div className='row'>
						<div className='col-md-6 top-margin'>
							<ArchiveMessageList />
						</div>
						<div className='col-md-6 top-margin'>
							<ArchiveMessagePreview />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
