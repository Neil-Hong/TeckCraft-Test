import { LIST_ACTION_TYPES } from "./list.type";
import { createAction } from "./reducer.utils";

export const fetchListStart = () => createAction(LIST_ACTION_TYPES.FETCH_LIST_START);

export const fetchListSuccess = (listData) => createAction(LIST_ACTION_TYPES.FETCH_LIST_SUCCESS, listData);

export const fetchListFailed = (error) => createAction(LIST_ACTION_TYPES.FETCH_LIST_FAILED, error);
