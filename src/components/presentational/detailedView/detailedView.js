import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ExtraAssets from "../extraAssets/extraAssets";
import { Container, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";

// Component to display detailed results of one single item within the API results depending on user choice.
// Shows Title, image, NASA ID, Center, Date Created and Description.
class DetailedView extends Component {
  render() {
    // Local variables to store props for readibility purposes
    const responseItems = this.props.location.state;
    let ID = responseItems.ID;
    let Title = responseItems.title;
    let Image = responseItems.Image;
    let Center = responseItems.Center;
    let DateCreated = responseItems.DateCreated;
    let Description = responseItems.Description;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <div style={holderDiv}>
                <Link to="/">
                  <Button color="danger" style={backButton}>
                    Back
                  </Button>
                </Link>
                <h3 style={title} className="text-center">
                  {Title}
                </h3>
                <img
                  alt="Image from NASA API"
                  align="center"
                  style={NASAImageDetailedView}
                  src={Image}
                />
                <br /> <br />
                <div style={itemDetail}>
                  <h6 style={itemHeading}>
                    NASA ID&nbsp;&nbsp;
                    <p style={detailAboutResponseItem}>
                      <em>{ID.toUpperCase()}</em>
                    </p>
                  </h6>
                  <p style={detailAboutResponseItem}>
                    <strong>Center:&nbsp;&nbsp;</strong>
                    {Center}
                  </p>
                  <p style={detailAboutResponseItem}>
                    <strong>Date Created:&nbsp;&nbsp;</strong>
                    {DateCreated}
                  </p>
                  <p style={detailAboutResponseItem}>
                    <strong>Description:&nbsp;&nbsp;</strong>
                    {Description}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <ExtraAssets nasaID={ID} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

DetailedView.propTypes = {
  location: PropTypes.object.isRequired
};

export default DetailedView;

// ************* CSS *****************//
const holderDiv = {
  paddingTop: "1em",
  color: "black",
  borderBottom: "rgb(247, 77, 105) 1px solid",
  paddingBottom: "2em"
};

const title = {
  color: "white",
  paddingBottom: "1em"
};

const detailAboutResponseItem = {
  fontSize: "13px",
  color: "white"
};

const itemHeading = {
  fontSize: "16px",
  color: "white"
};

const NASAImageDetailedView = {
  width: "40%",
  height: "50%",
  display: "block",
  margin: "auto",
  paddingTop: "3px",
  filter: "brightness(1.3)"
};

const itemDetail = {
  paddingLeft: "2em",
  paddingRight: "2em"
};

const backButton = {
  width: "100%",
  marginBottom: "2em"
};
