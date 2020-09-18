import React, { useCallback, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Apollo from "src/routes/Apollo";
import Home from "src/routes/Home";
import Relay from "src/routes/Relay";

import { DRAWER_WIDTH } from "./modules/constants";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -DRAWER_WIDTH,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  appBarGap: {
    ...theme.mixins.toolbar,
  },
  container: {
    flex: 1,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery("only screen and (max-width: 812px)");

  const [isSideBarVisible, setSideBarVisible] = useState(!isMobile);

  const openSideBar = useCallback(() => setSideBarVisible(true), []);
  const closeSideBar = useCallback(() => setSideBarVisible(false), []);

  return (
    <div className={classes.root}>
      <SideBar
        isMobile={isMobile}
        isVisible={isSideBarVisible}
        onClose={closeSideBar}
      />

      <NavBar isSideBarVisible={isSideBarVisible} openSideBar={openSideBar} />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isMobile || isSideBarVisible,
        })}
      >
        <div className={classes.appBarGap} />

        <Container className={classes.container}>
          <Switch>
            <Route path="/apollo">
              <Apollo />
            </Route>
            <Route path="/relay">
              <Relay />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>

        <Footer />
      </main>
    </div>
  );
};

export default DashboardLayout;
