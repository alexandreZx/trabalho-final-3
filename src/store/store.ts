
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import userSlice from './features/UserSlice';
import RootReducer from './features/RootReducer';

const persistConfig = {
  key: 'users',
  storage,
};

const persistedReducers = persistReducer(persistConfig, userSlice);
//store disponibiliza as reducers
const store = configureStore({
	reducer: {
		userReducer: persistedReducers 
	}
});


/*export const store = configureStore({
  reducer: {
    PerReducer:persistedReducer,
    UserSlice:UserSlice

  }
});*/

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



export const persistor = persistStore(store);