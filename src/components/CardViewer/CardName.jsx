import React from "react";
import { makeStyles } from "@material-ui/styles";

import colors from "../../config/colors";
import { GetKeyword } from "../../config/keywords";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    position: "absolute",
    top: "0.75em",
    flexDirection: "column",
    width: "100%",
    color: ({ isToken, nameColor }) => {
      if (isToken) return GetKeyword("token").color;
      if (nameColor) return nameColor;
      return colors.white;
    }
  },
  textContainer: {
    fontFamily: "CardFont SemiBold",
    minHeight: "2em",
    display: "flex",
    marginLeft: "auto",
    padding: "3%",
    borderRadius: "0.5em  0 0 0.5em",
    background: "rgb(0 0 0 / 0.6)"
  }
}));

const CardName = ({ name, isToken, nameColor }) => {
  const classes = useStyles({ isToken, nameColor });

  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>{name}</div>
    </div>
  );
};

export default CardName;
