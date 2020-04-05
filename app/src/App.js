import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import { theme } from "./theme";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./config/apollo";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import ListUsers from "./components/ListUsers";
import AddUser from "./components/AddUser";

const App = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/list-users" component={ListUsers} />
            <Route path="/add-user" component={AddUser} />
            <Route path="/edit-user/:id" component={AddUser} />
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  </ThemeProvider>
);

export default App;
