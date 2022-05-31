import React, { useState, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { ButtonBase } from "@material-ui/core";
import { Home, People } from "@material-ui/icons";

// Components
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

import Text from "../Text/Text";
import { logout } from "../../state/user/actions";
import LoginSocial from "../LoginSocial/LoginSocial";
import routes from "../../config/routes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    padding: theme.spacing(1, 2),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.background.default,
    borderBottom: "1px solid"
  },
  drawer: {
    "& .MuiDrawer-paper": {
      padding: theme.spacing(2),
      background: theme.palette.background.default
    }
  },
  loginIcon: {
    marginTop: "0.4em",
    marginRight: "0.4em"
  },
  login: {
    marginTop: theme.spacing(4)
  },
  userInfo: {
    display: "flex"
  },
  profileImg: {
    height: 40,
    borderRadius: "50%"
  },
  options: {
    display: "flex",
    alignItems: "center",
    color: "white"
  }
}));

const Header = ({ children, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        {currentUser ? (
          <React.Fragment>
            <div className={classes.userInfo}>
              <img className={classes.profileImg} src={currentUser.photoURL} />
              <Text>{currentUser.displayName}</Text>
            </div>

            <Button
              className={classes.login}
              variant="contained"
              color="primary"
              onClick={() => dispatch(logout())}
            >
              LOGOUT
            </Button>
          </React.Fragment>
        ) : (
          <Fragment>
            <Text>Inicie sesión con su cuenta de Google</Text>
            <LoginSocial />
          </Fragment>
        )}

        <Divider />
      </Drawer>
      <AppBar className={classes.root} position="fixed">
        <div className={classes.options}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Text>Card Creator</Text>
        </div>
        <div className={classes.options}>
          <ButtonBase
            edge="start"
            color="primary"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => history.push(routes.home)}
          >
            <Home />
            <Text>Home</Text>
          </ButtonBase>
          <ButtonBase
            edge="start"
            color="primary"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => history.push(routes.usersView)}
          >
            <People />
            <Text>Users</Text>
          </ButtonBase>
        </div>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
