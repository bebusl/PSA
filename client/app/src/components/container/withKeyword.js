import { connect } from "react-redux";
import { updateLikeKeyword, updateHateKeyword, setSearchItem, setProductlist } from "../../redux/action";

const mapStateToProps = (state) => ({
    selectKeywords: [state.likeKwd, state.hateKwd],
    likeWrd: state.likeKwd,
    hateWrd: state.hateKwd,
    searchItem: state.searchItem,
    productlists: state.productlists,
});
const mapDispatchToProps = (dispatch) => ({
    updateLikeKeyword: (keywords) => dispatch(updateLikeKeyword(keywords)),
    updateHateKeyword: (keywords) => dispatch(updateHateKeyword(keywords)),
    setSearchItem: (searchItem) => dispatch(setSearchItem(searchItem)),
    setProductlist: (productlists) => dispatch(setProductlist(productlists)),
});
export default function KeywordContainer(wrappedComponent, props, socket) {
    const Keyword = connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
    return <Keyword {...props} socket={socket}></Keyword>;
}
