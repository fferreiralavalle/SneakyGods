import React, { useEffect, Fragment } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./App.css";

import * as firebase from "firebase/app";
import store from "./state/store";

import CameraView from "./views/CameraView/CameraView";
import colors from "./config/colors";
import routes from "./config/routes";
import Header from "./components/Header/Header";
import LoginView from "./views/LoginScreen/LoginView";
import { login } from "./state/user/actions";
import UsersView from "./views/UsersView";
import UserCards from "./views/UserCards";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(",")
  },
  palette: {
    common: {
      black: colors.riverBed
    },
    primary: {
      main: colors.mystic
    },
    secondary: {
      main: colors.black,
      contrastText: colors.riverBed
    },
    text: {
      primary: colors.mystic
    },
    background: {
      default: colors.tuna
    }
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          content: "none"
        }
      }
    },
    MuiSelect: {
      select: {
        alignItems: "center",
        display: "flex"
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: colors.riverBed
      }
    },
    MuiFormLabel: {
      root: {
        color: colors.mystic
      }
    },
    MuiAlert: {
      root: {
        opacity: 0.9
      },
      standardInfo: {
        backgroundColor: `${colors.pictonBlue}90`,
        color: colors.white,

        "& .MuiAlert-icon": {
          color: colors.white
        }
      },
      standardSuccess: {
        backgroundColor: `${colors.pictonBlue}90`,
        color: colors.white,

        "& .MuiAlert-icon": {
          color: colors.white
        }
      }
    },
    MuiPickerDTTabs: {
      tabs: {
        "& .MuiSvgIcon-root": {
          color: colors.white
        },
        "& .MuiTabs-indicator": {
          backgroundColor: colors.white,
          height: 3
        }
      }
    }
  }
});

const App = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      dispatch(login(user));
      console.log(user);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            {" "}
            {currentUser ? (
              <Fragment>
                <Route exact path={routes.userView} component={UserCards} />
                <Route exact path={routes.usersView} component={UsersView} />
                <Route exact path={routes.home} component={CameraView} />
                <Redirect to={routes.home} />
              </Fragment>
            ) : (
              <Fragment>
                <Route path={routes.login} component={LoginView} />
                <Redirect to={routes.login} />
              </Fragment>
            )}
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

const UserDataProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default UserDataProvider;
