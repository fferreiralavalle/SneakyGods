import React from "react";
import { makeStyles } from "@material-ui/styles";

import styles from "../../config/styles";

const useStyles = makeStyles(theme => ({
  userInfo: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    margin: theme.spacing(2),
    maxWidth: 200,
    cursor: "pointer"
  },
  icon: {
    ...styles.imageBackgroud,
    width: 200,
    height: 200,
    borderRadius: "50%",
    backgroundImage: ({ profileUrl }) => `url(${profileUrl})`,
    backgroundColor: "rgb(0 0 0 / 0.5)"
  },
  name: {
    width: "100%",
    marginTop: theme.spacing(1),
    borderRadius: theme.spacing(1),
    backgroundColor: "rgb(0 0 0 / 0.5)",
    padding: theme.spacing(2),
    color: "white"
  }
}));

const UserPreview = ({ user, children, ...props }) => {
  const { profileUrl, name = "???" } = user;
  const classes = useStyles({ profileUrl });

  return (
    <div className={classes.userInfo} {...props}>
      <div className={classes.icon} />
      <div className={classes.name}>{name}</div>
    </div>
  );
};

export default UserPreview;
