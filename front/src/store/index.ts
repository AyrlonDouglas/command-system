import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// sagas
import loginSaga from "./ducks/login/saga";
import itemsSaga from "./ducks/items/saga";
import categoriesSaga from "./ducks/categories/saga";

// reducers
import loginReducer from "./ducks/login/slice";
import itemsReducer from "./ducks/items/slice";
import categoriesReducer from "./ducks/categories/slice";

const saga = createSagaMiddleware();

const store = configureStore({
	reducer: {
		login: loginReducer,
		items: itemsReducer,
		categories: categoriesReducer,
	},
	middleware: [saga],
	devTools: true,
});
saga.run(loginSaga);
saga.run(itemsSaga);
saga.run(categoriesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
