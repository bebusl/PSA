import { LOGIN, LOGOFF, UPDATE_USERDATA } from "./action";
import { UPDATE_LIKEKEYWORD, UPDATE_HATEKEYWORD, SETSEARCHITEM, SETPRODUCTLIST } from "./action";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const reducer = (
    state = { isLogin: false, userData: { name: "jinhee" }, likeKwd: [], hateKwd: [], productlists: [] },
    action
) => {
    switch (action.type) {
        case LOGOFF:
            return { ...state, isLogin: false, userData: {} };
        case LOGIN:
            return { ...state, isLogin: true, userData: action.userData };
        case UPDATE_USERDATA:
            return { ...state, userData: action.userData };
        case UPDATE_LIKEKEYWORD:
            return { ...state, likeKwd: action.keywords };
        case UPDATE_HATEKEYWORD:
            return { ...state, hateKwd: action.keywords };
        case SETSEARCHITEM:
            return { ...state, searchItem: action.searchItem };
        case SETPRODUCTLIST:
            return { ...state, productlists: action.productlists };
        default:
            return state;
    }
};

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
};

export default persistReducer(persistConfig, reducer);
