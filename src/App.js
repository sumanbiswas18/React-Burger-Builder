import React, { Component } from "react";
import Layout from "./components/layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import css from "./App.css";

class App extends Component {
  render() {
    return (
      <div className={css.aux}>
        <Layout>
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
