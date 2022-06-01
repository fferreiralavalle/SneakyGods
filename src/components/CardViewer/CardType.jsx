import React from "react";
import { makeStyles } from "@material-ui/styles";

import colors from "../../config/colors";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    position: "absolute",
    top: "3.9em",
    flexDirection: "column",
    width: "100%",
    color: ({ color }) => {
      if (color) return color;
      return colors.white;
    },
  },
  textContainer: {
    fontFamily: "CardFont SemiBold",
    minHeight: "1em",
    fontSize: "80%",
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    padding: "3%",
    borderRadius: "0.5em  0 0 0.5em",
    background: "rgb(0 0 0 / 0.6)",
    letterSpacing: "0.1em"
  },
  icon: {
    height: "1.3em",
    marginLeft: "0.3em"
  }
}));

const CardType = ({ type }) => {
  const { typeColor, label, icon } = type;
  const classes = useStyles({ color: typeColor });

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        {label}
        {icon && <img className={classes.icon} src={icon}/>}
      </div>
    </div>
  );
};

export default CardType;
