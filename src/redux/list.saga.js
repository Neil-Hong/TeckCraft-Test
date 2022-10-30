import { takeLatest, all, call, put } from "redux-saga/effects";
import { fetchListFailed, fetchListSuccess } from "./list.action";

import { LIST_ACTION_TYPES } from "./list.type";

export const fetchData = async () => {
    // try {
    //     const response = await fetch("https://catfact.ninja/fact");
    //     const data = await response.json();
    //     return data;
    // } catch (error) {
    //     alert(error.message);
    //     throw new Error(`${error}`);
    // }
    const response = await fetch("https://catfact.ninja/fact");
    if (!response.ok) {
        throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data;
};

export function* fetchListAsync() {
    try {
        const list = yield call(fetchData);
        yield put(fetchListSuccess(list));
    } catch (error) {
        yield put(fetchListFailed(error));
    }
}

export function* onFetchList() {
    yield takeLatest(LIST_ACTION_TYPES.FETCH_LIST_START, fetchListAsync);
}

export function* listSaga() {
    yield all([call(onFetchList)]);
}
