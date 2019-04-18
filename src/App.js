import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Search from "./components/search/search";
import PageNotFound from "./components/pagenotfound";

// Divs for animated background. Also, router allows rendering of component, or give user
// PageNotFound
class App extends Component {
  render() {
    return (
      <>
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds">
          <Switch>
            <Route exact path="/" component={Search} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
