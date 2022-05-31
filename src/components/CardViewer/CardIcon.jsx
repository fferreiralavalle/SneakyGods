import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  image: {
    height: "0.81em",
    marginTop: "0.1em",
    marginRight: "0.05em"
  }
}));

const CardIcon = props => {
  const classes = useStyles();

  return <img className={classes.image} {...props} alt="icon" />;
};

export default CardIcon;
