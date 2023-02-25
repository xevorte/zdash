import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mainReducer from './bootstrapReducers';

let finalReducer: any = mainReducer;

const persistConfig = {
  active: true,
  config: {
    key: 'root',
    storage,
    whitelist: [
      'username',
      'profileName',
      'token',
      'sidebarToggle',
    ]
  }
}

if (persistConfig.active) {
  finalReducer = persistReducer(persistConfig.config, mainReducer);
};

export const store = createStore(finalReducer);

export const persistor = persistStore(store);