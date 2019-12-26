import { connect } from "react-redux";
import { compose } from "redux";
import LandingPage from "./LandingPage";

export default compose(connect(state => ({ user: state.user })))(LandingPage);
