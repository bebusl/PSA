import { connect } from "react-redux";
import { login, logoff, updateLikeKeyword, updateHateKeyword, setSearchItem, setProductlist } from "../../redux/action";

const mapStateToProps = (state) => ({
    isLogin: state.isLogin,
    userData: state.userData,
    selectKeywords: [state.likeKwd, state.hateKwd],
    likeWrd: state.likeKwd,
    hateWrd: state.hateKwd,
    searchItem: state.searchItem,
    productlists: state.productlists,
});
const mapDispatchToProps = (dispatch) => ({
    login: (userData) => dispatch(login(userData)),
    logoff: () => dispatch(logoff()),
    updateLikeKeyword: (keywords) => dispatch(updateLikeKeyword(keywords)),
    updateHateKeyword: (keywords) => dispatch(updateHateKeyword(keywords)),
    setSearchItem: (searchItem) => dispatch(setSearchItem(searchItem)),
    setProductlist: (productlists) => dispatch(setProductlist(productlists)),
});

export default function Container(wrappedComponent) {
    return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
