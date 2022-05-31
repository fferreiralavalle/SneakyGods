import React from "react";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.primary.main,
    margin: "0.5em",
    textAlign: "left"
  }
}));

const Text = ({ children, className, ...rest }) => {
  const classes = useStyles();

  return (
    <p className={`${classes.root} ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default Text;
