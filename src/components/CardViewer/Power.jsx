import React from "react";
import { makeStyles } from "@material-ui/styles";

import styles from "../../config/styles";

// Assets
import costCircle from "../../assets/cardviewer/CircleRed.png";
import { GetIcon } from "../../config/icons";
import colors from "../../config/colors";

const useStyles = makeStyles(() => ({
  circle: {
    display: "flex",
    position: "absolute",
    ...styles.imageBackgroud,
    backgroundImage: `url(${costCircle})`,
    backgroundColor: "rgb(0 0 0 / 20%)",
    color: colors.power,
    borderRadius: "50%",
    bottom: ({ topLeftPosition }) => (topLeftPosition ? "none" : "2%"),
    right: ({ topLeftPosition }) => (topLeftPosition ? "none" : "2%"),
    top: ({ topLeftPosition }) => (topLeftPosition ? "2%" : "none"),
    left: ({ topLeftPosition }) => (topLeftPosition ? "2%" : "none"),
    width: "1.6em",
    height: "1.6em",
    fontSize: "200%",
    justifyContent: "center",
    alignItems: "center"
  },
  chaos: {
    position: "absolute",
    ...styles.imageBackgroud,
    backgroundImage: `url(${GetIcon(0).icon})`,
    backgroundColor: "rgb(0 0 0 / 20%)",
    borderRadius: "50%",
    bottom: "-10%",
    width: "30%",
    height: "30%"
  }
}));

const Power = ({ number, topLeftPosition = false }) => {
  const classes = useStyles({
    topLeftPosition
  });

  return (
    <div className={classes.circle}>
      {number}
      <div className={classes.chaos} />
    </div>
  );
};

export default Power;
