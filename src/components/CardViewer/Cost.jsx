import React from "react";
import { makeStyles } from "@material-ui/styles";

import styles from "../../config/styles";

// Assets
import costCircle from "../../assets/cardviewer/CirclePurple.png";
import { GetIcon } from "../../config/icons";
import colors from "../../config/colors";

const useStyles = makeStyles(() => ({
  circle: {
    display: "flex",
    position: "absolute",
    ...styles.imageBackgroud,
    backgroundImage: `url(${costCircle})`,
    backgroundColor: "rgb(0 0 0 / 30%)",
    borderRadius: "50%",
    top: "2%",
    left: "2%",
    width: "1.6em",
    height: "1.6em",
    color: colors.flavourText,
    fontSize: "200%",
    justifyContent: "center",
    alignItems: "center"
  },
  chaos: {
    position: "absolute",
    ...styles.imageBackgroud,
    backgroundImage: `url(${GetIcon(1).icon})`,
    bottom: "-10%",
    width: "30%",
    height: "30%"
  }
}));

const Cost = ({ number }) => {
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      {number}
      <div className={classes.chaos} />
    </div>
  );
};

export default Cost;
