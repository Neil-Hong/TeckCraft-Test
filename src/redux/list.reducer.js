import { LIST_ACTION_TYPES } from "./list.type";

export const LIST_INITIAL_STATE = { listContent: [], isLoading: false, error: null, counts: 0 };

export const listReducer = (state = LIST_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case LIST_ACTION_TYPES.FETCH_LIST_START:
            return { ...state, isLoading: true };
        case LIST_ACTION_TYPES.FETCH_LIST_SUCCESS:
            return { ...state, listContent: payload, isLoading: false, counts: state.counts + 1 };
        case LIST_ACTION_TYPES.FETCH_LIST_FAILED:
            return { ...state, isLoading: false, error: payload };
        default:
            return state;
    }
};
