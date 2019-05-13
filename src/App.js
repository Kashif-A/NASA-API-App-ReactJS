import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Search from "./components/container/search/search";
import PageNotFound from "./components/pagenotfound";
import DetailView from "./components/presentational/detailedView/detailedView";

import { StateProvider } from "./stateContext";

// Divs for animated background. Also, router allows rendering of component, or give user
// PageNotFound
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responseItems: [],
      gotResults: false
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.setResponseItems = this.setResponseItems.bind(this);
  }

  setSearchTerm(searchTerm) {
    this.setState({
      searchTerm
    });
  }

  setResponseItems(responseItems, gotResults) {
    this.setState({
      responseItems: responseItems,
      gotResults: gotResults
    });
  }

  render() {
    return (
      <StateProvider
        value={{
          searchTerm: this.state.searchTerm,
          setSearchTerm: this.setSearchTerm,
          responseItems: this.state.responseItems,
          setResponseItems: this.setResponseItems,
          gotResults: this.state.gotResults
        }}
      >
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds">
          {/* React router set-up */}
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/details/id/*" component={DetailView} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </StateProvider>
    );
  }
}

export default App;
