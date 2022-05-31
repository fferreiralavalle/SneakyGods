import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  }
}));

const LoadingCircle = ({ ...rest }) => {
  const classes = useStyles();

  return <CircularProgress className={classes.root} {...rest} />;
};

export default LoadingCircle;
