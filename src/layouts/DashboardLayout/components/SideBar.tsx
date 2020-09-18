import React from "react";
import { useHistory } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { makeStyles } from "@material-ui/core/styles";

import { DRAWER_WIDTH } from "../modules/constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
  },
}));

type Props = {
  isMobile: boolean;
  isVisible: boolean;
  onClose: () => void;
};

const SideBar: React.FC<Props> = ({ isMobile, isVisible, onClose }) => {
  const classes = useStyles();

  const history = useHistory();

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      open={isVisible}
      onClose={onClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          button
          selected={history.location.pathname === "/"}
          onClick={() => history.push("/")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem
          button
          selected={history.location.pathname === "/apollo"}
          onClick={() => history.push("/apollo")}
        >
          <ListItemIcon>
            <SentimentVerySatisfiedIcon />
          </ListItemIcon>
          <ListItemText primary="Apollo" />
        </ListItem>

        <ListItem
          button
          selected={history.location.pathname === "/relay"}
          onClick={() => history.push("/relay")}
        >
          <ListItemIcon>
            <SentimentVerySatisfiedIcon />
          </ListItemIcon>
          <ListItemText primary="Relay" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default SideBar;
