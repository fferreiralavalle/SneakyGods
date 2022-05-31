import React from "react";
import { makeStyles } from "@material-ui/styles";

// Components
import Text from "../../components/Text/Text";
import styles from "../../config/styles";
import LoginSocial from "../../components/LoginSocial/LoginSocial";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.background.default
  },
  section: {
    padding: `100px ${styles.sectionMargins}`,
    display: "flex",
    flexDirection: "column",
    width: 500
  },
  cameraList: {
    display: "flex",
    flexWrap: "wrap"
  }
}));

const LoginView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Text>Sistema de Detección de Movimientos Siniestros</Text>
        <Text>Inicie sesión con su cuenta de Google</Text>
        <LoginSocial />
      </div>
    </div>
  );
};

export default LoginView;
