import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./loadingWidget.css";

class LoadingWidget extends Component {
  render() {
    return (
      <Fragment>
        <div className="wrap" style={this.props.margin}>
          <div className="loading">
            <div className="bounceball" />
            <div className="text">LOADING RESULTS FROM NASA API</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoadingWidget;
LoadingWidget.propTypes = {
  margin: PropTypes.object.isRequired
};
