import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { tierbuilder } from './reducers';

const store = configureStore({ reducer: combineReducers({ tierbuilder }) });

export default store;
export { Provider as ReduxProvider } from 'react-redux';
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
