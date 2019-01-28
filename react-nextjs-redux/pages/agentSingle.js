import React from 'react';
import connectStore from '../store/connectStore';
import Root from '../containers/Root';
import Header from '../component/Header';
import Error from './_error';
import AgentSingleScreen from '../containers/AgentSingle';
import { actions as agentActions, selectors as agentSelectors } from '../store/modules/Agent';
import { actions as propertiesActions, selectors as propertiesSelectors } from '../store/modules/Properties';
import promiseReturner from '../store/utils/promiseReturner';

const AgentSinglePage = props => (
    props.statusCode === 404 ? (
        <Error />
    ) : (
        <Root style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <AgentSingleScreen {...props} />
        </Root>
    )
);

AgentSinglePage.getInitialProps = async ({ store, req, res, query }) => {
    let statusCode = 200;
    const id = (query && query.slug) || (req && req.params && req.params.idOrSlug);

    if (id) {
        // Get agent
        const action = promiseReturner(agentActions.getAgent)({ id });
        try {
            const agent = await store.dispatch(action);

            if (agent.status !== 'success') {
                statusCode = 404;
            } else {
                // Agent
                const agentId = agent.payload.id;
                await store.dispatch(agentActions.setActiveAgentId({ id: agent.payload.id }));
                await store.dispatch(propertiesActions.setFilter({ id: 'userId', value: agentId }));

                // Coords
                const hasCoords = (agent.payload.lat !== null && agent.payload.lng !== null);
                const lat = hasCoords ? agent.payload.lat : 54.03269571795111;
                const lng = hasCoords ? agent.payload.lng : -3.8699356;
                await store.dispatch(agentActions.setCoords({ lat, lng }));

                // Radius/Zoom
                const radius = hasCoords ? 16000 : 502045;
                const zoom = hasCoords ? 11 : 6;
                await store.dispatch(agentActions.setRadius({ radius }));
                await store.dispatch(agentActions.setMapZoom({ zoom }));

                // Search properties
                await store.dispatch(promiseReturner(propertiesActions.searchProximity)({ page: 1, lat, lng, radius, filters: { userId: agentId } }));
            }
        } catch (e) {
            if (res) {
                res.statusCode = statusCode = 404;
            }
        }
    }

    return { statusCode };
};

export default connectStore(AgentSinglePage);
