import React from 'react';
import { connect } from 'react-redux';
import { Loader } from '../../components';
import { getTranslate } from 'react-localize-redux';

import {
	PlayerList,
	PlayerIframe
} from './components';

class PlayerPreview extends React.Component {

  render() {
	  const { loading, translate} = this.props;

    return (
      <div>
        <div className='container-fluid main-container-page'>
          <div className='row'>
            <div className='col-md-12 top-margin'>
              <div className='card player-preview-content'>
                <div className="content-template__title">{translate('TITLE_DSPLAYERPREVIEW')}</div>
	              { loading && (<Loader margin={'15% auto'} />) }
                <div className='row'>
                  <div className='col-md-3'>
                    <PlayerList translate={translate} />
                  </div>
                  <div className='col-md-9'>
                    <PlayerIframe />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const select = (state) => {
	return {
		loading: state.playerPreview.loading,
		translate: getTranslate(state.locale)
	}
};

export default connect(select, { })(PlayerPreview);
