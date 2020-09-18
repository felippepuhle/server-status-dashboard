import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import { DashboardLayout } from "src/layouts";

const App = () => (
  <>
    <CssBaseline />

    <Router basename={process.env.PUBLIC_URL}>
      <Route component={DashboardLayout} />
    </Router>
  </>
);

export default App;
