import React from 'react';
import { SystemStatusList } from './components';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';


class SystemStatus extends React.Component {

  render() {
    const { translate } = this.props;

    return (
      <div className='container-fluid main-container-page'>
        <div className='row'>
          <div className='col-md-12 top-margin'>
            <div className='card system-status-content'>
              <div className='page-title'>{translate('TITLE_DSSYSTEMSTATUS')}</div>
              <SystemStatusList translate={translate} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const select = (state) => {
	return {
		translate: getTranslate(state.locale)
	}
};

export default connect(select, { })(SystemStatus);
