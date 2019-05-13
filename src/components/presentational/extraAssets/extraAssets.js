import React, { Component, Fragment } from "react";
import { Container, Row } from "reactstrap";
import PropTypes from "prop-types";
import fetchAPI from "../../../helperUtilities/fetchAPI";

// Component to show the links found within the /assets/{nasa_id} endpoint
class ItemLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hrefs: []
    };
    this.getAssetData = this.getAssetData.bind(this);
  }

  shouldComponentUpdate() {
    if (!this.state.hrefs.length) {
      return true;
    } else {
      return false;
    }
  }

  // Get asset data from /assets/{nasa_id} endpoint
  getAssetData() {
    return fetchAPI(
      "https://images-api.nasa.gov/asset/" + this.props.nasaID
    ).then(res => this.setState({ hrefs: res }));
  }

  render() {
    this.getAssetData();

    return (
      <Fragment>
        <Container>
          <Row>
            <div className="col-md-12 text-center">
              <h3 style={h3Style}>
                Extra assets from /asset/{"{"}nasa_id{"}"} endpoint
              </h3>
              <hr />
            </div>
            <div className="col-md-2" />
            <div className="col-md-8">
              {this.state.hrefs.map(item => (
                <p key={item.href} style={assetLinks}>
                  {item.href}
                </p>
              ))}
              <div className="col-md-2" />
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

ItemLinks.propTypes = {
  nasaID: PropTypes.string.isRequired
};
export default ItemLinks;

// ************* CSS *****************//
const assetLinks = {
  color: "white",
  fontSize: "9px"
};

const h3Style = {
  color: "white"
};
