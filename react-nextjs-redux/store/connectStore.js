import React from 'react';
import withRedux from 'next-redux-wrapper';
import store from './createStore';
import initialRenderSetup from './initialRenderSetup';

// Connect a page to the store
// and pre-populate any app-wide state
export default (Component) => {
    const WrappedComponent = props => (
        <Component {...props} />
    );

    WrappedComponent.getInitialProps = async (ctx) => {
        if (ctx.isServer) {
            await initialRenderSetup(ctx);
        }

        if (Component.getInitialProps) {
            return await Component.getInitialProps(ctx);
        }

        return {};
    };

    return withRedux(store, null)(WrappedComponent);
};
