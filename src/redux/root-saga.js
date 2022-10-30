import { all, call } from "redux-saga/effects";
import { listSaga } from "./list.saga";

export function* rootSaga() {
    yield all([call(listSaga)]);
}
