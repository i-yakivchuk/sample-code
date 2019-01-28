import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Agents from '../containers/Agents';

const AgentsPage = props => (
    <Root>
        <Header />
        <Agents {...props} />
        <Footer />
    </Root>
);

export default connectStore(AgentsPage);
