import React, { Component } from "react";
import "./search.css";
import SearchResults from "../searchResults/searchResults";

// Save state to allow preservation of state
let state = { value: "", items: [] };

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toSearch = this.toSearch.bind(this);
    this.toResult = this.toResult.bind(this);
  }

  // Stop auto rendering
  shouldComponentUpdate() {
    if (this.state.items.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  // Preserve state
  componentWillUnmount() {
    state = this.state;
  }

  // Store user input as they are entering it
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Handle submission of form. Featch API to get NASA data, then store it in state.items
  handleSubmit(event) {
    event.preventDefault();
    fetch("https://images-api.nasa.gov/search?q=" + this.state.value)
      .then(res => res.json())
      .then(
        result => {
          if (!result.collection.items.length) {
            document.getElementById("errorMessage").innerHTML =
              "No results found...";
            setTimeout(() => {
              document.getElementById("errorMessage").innerHTML = "";
            }, 3000);
          }
          this.setState({
            items: result.collection.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          console.log(error);
          alert("Something went wrong. Please try again!");
        }
      );
  }

  // If there are results, then show then, else ask for search. If user clicks 'Home', it resets the state
  render() {
    return this.state.items.length ? this.toResult() : this.toSearch();
  }

  // Return form to allow user to query the API
  toSearch() {
    return (
      <div className="searchForm text-center">
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label htmlFor="searchInput">
              {" "}
              <h4> Enter query...! </h4>{" "}
            </label>
            <br />
            <div id="errorMessage" /> <br />
            <input
              required
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              class="form-control searchQueryInput"
              id="searchInput"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" class="btn btn-danger">
            {" "}
            Submit{" "}
          </button>
        </form>
      </div>
    );
  }

  // Function renders SearchResults
  toResult() {
    return <SearchResults itemsList={this.state.items} />;
  }
}

export default Search;
