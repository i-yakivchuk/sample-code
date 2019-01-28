import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import AdminAgentArea from '../containers/AdminAgentArea';
import Header from '../component/Header';
import { actions as adminActions } from '../store/modules/Admin';

const AdminAgentAreaPage = props => (
    <Root style={{ backgroundColor: '#f0f4f9', display: 'flex', flexDirection: 'column' }}>
		    <Header />
		    <div style={{ padding: '5px 15px', backgroundColor: '#44484C' }}>
				    <AdminAgentArea {...props} />
		    </div>
    </Root>
);

AdminAgentAreaPage.getInitialProps = async ({ isSever, store, req, query }) => {
		if (query.agent) {
				store.dispatch(adminActions.setActiveAgent({ agent: query.agent }));
		}

		return { statusCode: 200 };
};

export default connectStore(AdminAgentAreaPage);
