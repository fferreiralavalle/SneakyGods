import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose
} from "redux";
import thunkMiddleware from "redux-thunk";
import user from "./user/reducer";
import cards from "./cards/reducer";
import users from "./users/reducer";

const rootReducer = combineReducers({
  user,
  users,
  cards,
});

const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

export default createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);