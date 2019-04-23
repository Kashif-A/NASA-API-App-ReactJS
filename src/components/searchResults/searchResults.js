import React from "react";
import "../searchResults/searchResult.css";
import { Link } from "react-router-dom";

// Component to display search results in a user friendly way
// API data is passed as props.itemsList
class SearchResults extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Home button */}
              <Link to="/">
                <button
                  className="btn btn-danger btnNotMain"
                  onClick={() => {
                    window.location.reload();
                  }}
                >
                  Home
                </button>
              </Link>

              {/* Loop through the props to populate image list selection */}
              {this.props.itemsList.map(item => (
                <Link
                  key={item.data[0].nasa_id}
                  to={{
                    pathname: "/details/id/" + item.data[0].nasa_id,
                    state: { data: item }
                  }}
                >
                  <img
                    alt="Nasa Img"
                    key={item.data[0].nasa_id}
                    className="NASAImage"
                    src={"" + item.links[0].href.toString()}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResults;
