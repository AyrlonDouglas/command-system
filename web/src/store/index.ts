import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// sagas
import loginSaga from "./ducks/login/saga";
import itemsSaga from "./ducks/items/saga";
import categoriesSaga from "./ducks/categories/saga";
import employeesSaga from "./ducks/employees/saga";
import rolesSaga from "./ducks/roles/saga";
import commandsSaga from "./ducks/commands/saga";
import tablesSaga from "./ducks/tables/saga";

// reducers
import loginReducer from "./ducks/login/slice";
import itemsReducer from "./ducks/items/slice";
import categoriesReducer from "./ducks/categories/slice";
import employeesReducer from "./ducks/employees/slice";
import layoutReducer from "./ducks/layout/slice";
import rolesReducer from "./ducks/roles/slice";
import commandsReduder from "./ducks/commands/slice";
import tablesReduder from "./ducks/tables/slice";

const saga = createSagaMiddleware();

const store = configureStore({
	reducer: {
		login: loginReducer,
		items: itemsReducer,
		categories: categoriesReducer,
		employees: employeesReducer,
		layout: layoutReducer,
		roles: rolesReducer,
		commands: commandsReduder,
		tables: tablesReduder,
	},
	middleware: [saga],
	devTools: true,
});
saga.run(loginSaga);
saga.run(itemsSaga);
saga.run(categoriesSaga);
saga.run(employeesSaga);
saga.run(rolesSaga);
saga.run(commandsSaga);
saga.run(tablesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
