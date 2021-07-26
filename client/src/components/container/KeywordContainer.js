import { connect } from "react-redux";
import { updateLikeKeyword, updateHateKeyword } from "../../redux/action";

const mapStateToProps = (state) => ({
  selectKeywords: [state.likeKwd, state.hateKwd],
});
const mapDispatchToProps = (dispatch) => ({
  updateLikeKeyword: (keywords) => dispatch(updateLikeKeyword(keywords)),
  updateHateKeyword: (keywords) => dispatch(updateHateKeyword(keywords)),
});
export default function KeywordContainer(wrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
