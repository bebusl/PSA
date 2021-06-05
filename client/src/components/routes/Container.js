import { connect } from "react-redux";
import { login } from "../../redux/reducer";

const mapStateToProps = (state) => ({ states: state });
const mapDispatchToProps = (dispatch) => ({
  login: (userData) => dispatch(login(userData)),
});
export default function Container(wrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps)(wrappedComponent);
}
