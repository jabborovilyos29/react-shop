import { createStore } from "redux";
import rootReducers from "./reducer/reducer";

const store = createStore(rootReducers);

export default store;