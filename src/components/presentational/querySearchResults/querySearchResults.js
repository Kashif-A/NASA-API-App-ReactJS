import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./querySearchResults.css";

import PropTypes from "prop-types";

// Component to display search results in a user friendly way
// API data is passed as props.itemsList
class QuerySearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseItems: this.props.responseItems,
      currentPage: 1,
      responseItemsPerPage: 30
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  render() {
    const { responseItems, currentPage, responseItemsPerPage } = this.state;

    const indexOfLastItem = currentPage * responseItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - responseItemsPerPage;
    const currentresponseItems = responseItems.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    {
      /* Loop through the response items to populate image list */
    }
    const renderresponseItems = currentresponseItems.map(item => {
      // Check to ensure property exists in JSON response
      let linkToImage = item.hasOwnProperty("links")
        ? item.links[0].href
        : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
      let descriptionIfExists = item.hasOwnProperty("description")
        ? item.data[0].description
        : "NO DESCRIPTION AVAILABLE";
      return (
        <Link
          key={item.data[0].nasa_id}
          to={{
            pathname: "/details/id/" + item.data[0].nasa_id,
            state: {
              ID: item.data[0].nasa_id,
              title: item.data[0].title,
              Image: linkToImage,
              Center: item.data[0].center,
              DateCreated: item.data[0].date_created,
              Description: descriptionIfExists.trim()
            }
          }}
        >
          <div className="itemContainer text-center">
            <img
              alt=""
              key={item.data[0].nasa_id}
              className="NASAApiImage"
              src={linkToImage}
            />
            <p>{item.data[0].title}</p>
          </div>
        </Link>
      );
    });

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(responseItems.length / responseItemsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          <b>{number}</b>
        </li>
      );
    });

    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <div id="pageNumbersWrapper">
                <ul id="pageNumbers">{renderPageNumbers}</ul>
              </div>
              <div id="itemsHolder">
                {renderresponseItems || <p>Loading...</p>}
              </div>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

QuerySearchResults.propTypes = {
  location: PropTypes.object,
  responseItems: PropTypes.array.isRequired
};

export default QuerySearchResults;
