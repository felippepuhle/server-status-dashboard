import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { ApolloProvider } from "@apollo/client";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { client as apolloClient } from "src/apollo";
import { DashboardLayout } from "src/layouts";
import { environment as relayEnvironment } from "src/relay";

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "html, body, #root": {
          width: "100%",
          height: "100%",
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <RelayEnvironmentProvider environment={relayEnvironment}>
      <ApolloProvider client={apolloClient}>
        <Router basename={process.env.PUBLIC_URL}>
          <Route component={DashboardLayout} />
        </Router>
      </ApolloProvider>
    </RelayEnvironmentProvider>
  </ThemeProvider>
);

export default App;
