//write global states and switch state to set state here
//import {combineReducers} from 'redux';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
//import hardSet from "redux-persist/lib/stateReconciler/hardSet";

const initialState = {
  isAuth: false,
  betaShow: true,
  userData: {},
  loading: false,
  guestUserModelId: [],
  footerShow: true,
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["isAuth", "userData", "guestUserModelId"], //it will  save in persist load from initial state object
};
/*
only use one at time
blacklist: ['state1','state2','state3',...] // navigation will not be persisted
   whitelist: ['state1','state2','state3',...] // only navigation will be persisted
*/

const _update = (key, value, state) => {
  let t = { ...state };
  t[key] = value;
  return t;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case "setFooterShow": {
      // append to array
      let t = { ...state };
      t.footerShow = action.value;
      return t;
    }

    case "setBetaShow": {
      // append to array
      let t = { ...state };
      t.betaShow = action.value;
      return t;
    }


    case "clearGuestUserModelId": {
      // clear array
      let t = { ...state };
      t.guestUserModelId = [];
      return t;
    }

    case "setGuestUserModelId": {
      // append to array
      console.log('hiiiii');
      let t = { ...state };
      t.guestUserModelId = [...state.guestUserModelId, action.value];
      return t;
    }

    case "SET_USER":
      return _update("userData", action.value, state);
    case "SET_AUTH":
      return _update("isAuth", action.value, state);
    case "setLoading":
      return _update("loading", action.value, state);

    default:
      break;
  }
  return state;
};

export default persistReducer(persistConfig, userReducer);
//export default combineReducers({user: userReducer});
