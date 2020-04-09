import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MenuAfterLogin from "./MenuAfterLogin";
import MenuBeforeLogin from "./MenuBeforeLogin";

const mapStateToProps = (state) => ({ ...state });

class BurgerMenu extends Component {
  render() {
    return this.props.user ? (
      <MenuAfterLogin setShowMenu={this.props.setShowMenu} />
    ) : (
      <MenuBeforeLogin setShowMenu={this.props.setShowMenu} />
    );
  }
}

export default connect(mapStateToProps, null)(withRouter(BurgerMenu));
