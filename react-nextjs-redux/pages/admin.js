import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import AdminArea from '../containers/AdminArea';

const AdminAreaPage = props => (
    <Root style={{ backgroundColor: '#f0f4f9', display: 'flex', flexDirection: 'column' }}>
        <AdminArea {...props} />
    </Root>
);

export default connectStore(AdminAreaPage);
