import React from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import * as firebase from "firebase/app";
import "firebase/auth";

// Material
import { Button, createMuiTheme, Icon, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

// Icons
import googleIcon from "../../assets/icons/google-icon.svg";
//import { requestLogin } from "../../../state/user/actions";

const useStyles = makeStyles(theme => ({
  googleLogin: {
    margin: theme.spacing(2, 0),
    width: "100%"
  },
  facebookLogin: {
    width: "100%",

    margin: theme.spacing(2, 0)
  },
  icon: {
    fontSize: 18,
    margin: "0 10px 0 0"
  }
}));

const themes = {
  facebook: createMuiTheme({
    palette: {
      primary: { main: "#4267B2" }
    }
  }),
  google: createMuiTheme({
    palette: {
      primary: { main: "#FFF" }
    }
  })
};

const providers = {
  facebook: firebase.auth.FacebookAuthProvider,
  google: firebase.auth.GoogleAuthProvider
};

const LoginSocial = ({ ...rest }) => {
  const classes = useStyles();

  const loginWith = network => () => {
    const provider = new providers[network]();
    //dispatch(requestLogin());
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error;
        // The firebase.auth.AuthCredential type that was used.
        const { credential } = error;
        console.log({
          errorCode,
          errorMessage,
          email,
          credential
        });
      });
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={themes.google}>
        <div {...rest}>
          <Button
            variant="contained"
            color="primary"
            onClick={loginWith("google")}
            className={classes.googleLogin}
          >
            <img
              className={classes.icon}
              src={googleIcon}
              alt="google"
              height="18px"
            />
            Continuar con Google
          </Button>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default LoginSocial;
