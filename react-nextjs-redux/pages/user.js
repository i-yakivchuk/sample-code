import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import Header from '../component/Header';
import Footer from '../component/Footer';
import UserArea from '../containers/UserArea';

const UserAreaPage = props => (
    <Root>
        <Header />
        <UserArea {...props} />
        <Footer />
    </Root>
);

export default connectStore(UserAreaPage);
