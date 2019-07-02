import React, { Component } from "react";
import Layout from "./components/layout/Layout";

class App extends Component {
  render() {
    return (
      <div>
        <h1>hello</h1>
        <Layout>
          <p>Layout component</p>
        </Layout>
      </div>
    );
  }
}

export default App;
