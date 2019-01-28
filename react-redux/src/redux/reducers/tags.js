import * as ActionTypes from '../../constants/actions';
import createReducer from '../createReducer';
import {select, selectGroup} from '../tools/select'

const initialState = {
  list: {},
  types: [],
  selected: []
};

export const tags = createReducer(initialState, {
  [ActionTypes.GET_TAG_TYPES](state, action) {
    return Object.assign({}, state, { error: null, loading: true })
  },
  [ActionTypes.GET_TAG_TYPES_ERROR](state, action) {
    return Object.assign({}, state, { error: true, loading: false })
  },
  [ActionTypes.GET_TAG_TYPES_SUCCESS](state, action) {
    return Object.assign({}, state, { types: action.payload, loading: false })
  },
  [ActionTypes.GET_TAG](state, action) {
    return Object.assign({}, state, { error: null, loading: true })
  },
  [ActionTypes.GET_TAG_SUCCESS](state, action) {
    return Object.assign({}, state, { list: {...state.list, ...action.payload.tags}, loading: false })
  },
  [ActionTypes.GET_TAG_ERROR](state, action) {
    return Object.assign({}, state, { error: true, loading: false })
  },
  [ActionTypes.SELECT_TAG](state, action) {
    let selected = state.selected;
    if(action.payload.typeId) {
      selected = selectGroup(selected, state.list[action.payload.typeId], action.payload.select);
    } else {
      selected = select(selected, action.payload.tagId);
    }

    return Object.assign({}, state, { selected: selected })
  },
  [ActionTypes.SELECTED_TAGS](state, action) {
    return Object.assign({}, state, { selected: action.payload })
  },
});