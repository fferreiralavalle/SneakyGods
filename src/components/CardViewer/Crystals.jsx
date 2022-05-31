import React from "react";
import { makeStyles } from "@material-ui/styles";

import styles from "../../config/styles";

// Assets
import colors from "../../config/colors";

const useStyles = makeStyles(() => ({
  circle: {
    display: "flex",
    color: colors.white,
    borderRadius: "50%",
    fontSize: "140%",
    justifyContent: "space-between",
    alignItems: "center",
    width: "2em",
    height: "2em"
  },
  crystal: {
    ...styles.imageBackgroud,
    backgroundImage: ({ icon }) => `url(${icon})`,
    backgroundSize: "contain",
    width: "1em",
    height: "1em",
    marginRight: "8%"
  }
}));

const Crystal = ({ crystal = {}, amount }) => {
  const { icon } = crystal;
  const classes = useStyles({ icon });

  return (
    <div className={classes.circle}>
      <div className={classes.crystal} />
      {amount}
    </div>
  );
};

export default Crystal;
