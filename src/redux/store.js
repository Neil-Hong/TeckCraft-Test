import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { listReducer } from "./list.reducer";
import { rootSaga } from "./root-saga";

const SagaMiddleware = createSagaMiddleware();
export const rootReducer = combineReducers({ list: listReducer });

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(SagaMiddleware);
    },
});

SagaMiddleware.run(rootSaga);
