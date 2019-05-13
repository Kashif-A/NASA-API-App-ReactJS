import React, { Component, Fragment } from "react";
import fetchAPI from "../../../helperUtilities/fetchAPI";
import PropTypes from "prop-types";
import QuerySearchResults from "../../presentational/querySearchResults/querySearchResults";
import LoadingWidget from "../../presentational/loadingWidget/loadingWidget";
import { StateConsumer } from "../../../stateContext";
import { Row, Col } from "reactstrap";
import "./search.css";

// Initial homepage with search input field to allow user to query the NASA API
// Endpiont: https://images-api.nasa.gov/search?q=
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSearchInputString: "",
      isFetchingResults: false, // Hold user input
      autoSearch: false,
      responseItems: [],
      currentPage: 1
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toSearch = this.renderSearchForm.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  // Store user input as they are entering it
  handleChange(event, value) {
    value.setResponseItems([]);
    this.setState({
      userSearchInputString: event.target.value,
      currentPage: 1,
      responseItems: []
    });
    if (this.state.userSearchInputString.length > 1) {
      setTimeout(() => {
        document.getElementById("searchInput").disabled = true;
        this.setState({
          autoSearch: true
        });
      }, 2000);
      setTimeout(() => {
        this.handleSubmit(event, value);
      }, 3000);
    }
  }

  // Handle submission of form. Featch API to get NASA data, then store it in state.items
  handleSubmit(event, value) {
    if (event) {
      event.preventDefault();
      this.setState({
        isFetchingResults: true
      });
    }
    console.log(
      "https://images-api.nasa.gov/search?q=" +
        this.state.userSearchInputString +
        "&page=" +
        this.state.currentPage
    );
    this.state.userSearchInputString
      ? fetchAPI(
          "https://images-api.nasa.gov/search?q=" +
            this.state.userSearchInputString +
            "&page=" +
            this.state.currentPage
        ).then(resp => {
          document.getElementById("searchInput").disabled = false;
          if (Object.values(resp).length > 0) {
            value.setResponseItems(Object.values(resp), true);

            this.setState({
              autoSearch: false,
              responseItems: resp
            });
            return resp;
          } else {
            document.getElementById("errorMessage").innerHTML =
              "No results found...";
            setTimeout(() => {
              document.getElementById("errorMessage").innerHTML = "";
              this.setState({
                autoSearch: false
              });
            }, 3000);
          }
        })
      : null;
  }

  // Calling a method that changes context directly within the Render() method causes
  // instability, crashes and unnecessary renders. Therefore, using a function to delegate
  // the call. This solves the issue.
  clickedDelegate(style, text) {
    return (
      <StateConsumer>
        {value => (
          <button
            className="btn btn-danger"
            style={style}
            onClick={event => {
              text === "Next Page"
                ? this.changePage(value, "next")
                : this.changePage(value, "previous");
            }}
          >
            {text}
          </button>
        )}
      </StateConsumer>
    );
  }

  changePage(value, nextOrPrevious) {
    nextOrPrevious === "next"
      ? this.setState({
          currentPage: this.state.currentPage + 1,
          autoSearch: true
        })
      : this.setState({
          currentPage: this.state.currentPage - 1,
          autoSearch: true
        });
    value.setResponseItems([], false);
    setTimeout(() => {
      this.handleSubmit(null, value);
    }, 3000);
  }

  // If there are results, then show them, else ask for search. If user clicks 'Home', it resets the state
  render() {
    return (
      <StateConsumer>
        {value => (
          <Fragment>
            <Row>
              <Col sm="1">
                {this.clickedDelegate(previousPageButton, "Previous Page")}
              </Col>
              <Col sm="8"> {this.renderSearchForm(this.state.autoSearch)}</Col>
              <Col sm="1">
                {this.clickedDelegate(nextPageButton, "Next Page")}
              </Col>
            </Row>
          </Fragment>
        )}
      </StateConsumer>
    );
  }

  // Return form to allow user to query the API
  renderSearchForm(autoSearch) {
    return (
      <StateConsumer>
        {value => (
          <Fragment>
            <div style={homeSearchForm} className="text-center">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="searchInput">
                    <h4> Enter query...! </h4>
                    <hr />
                    <p>Page To Search For: {this.state.currentPage}</p>
                  </label>
                  <br />
                  <div id="errorMessage" /> <br />
                  <input
                    required
                    type="text"
                    value={this.state.userSearchInputString}
                    onChange={event => this.handleChange(event, value)}
                    className="form-control"
                    style={searchFormInput}
                    id="searchInput"
                    aria-describedby="emailHelp"
                  />
                </div>
              </form>
            </div>
            {autoSearch ? (
              <LoadingWidget margin={{ marginTop: "16em" }} />
            ) : null}
            {value.gotResults ? (
              <QuerySearchResults responseItems={value.responseItems} />
            ) : null}
          </Fragment>
        )}
      </StateConsumer>
    );
  }
}
Search.propTypes = {
  responseItems: PropTypes.array,
  resetReduxStoreToInitialState: PropTypes.func
};

export default Search;

// ************* CSS *****************//
const homeSearchForm = {
  paddingTop: "7em",
  height: "8vh" /* Magic here */,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  marginBottom: "5em"
};

const searchFormInput = {
  width: "600px"
};

const nextPageButton = {
  width: "7em",
  height: "4em",
  border: "1px white solid"
};

const previousPageButton = {
  width: "7em",
  height: "4em",
  border: "1px white solid"
};
