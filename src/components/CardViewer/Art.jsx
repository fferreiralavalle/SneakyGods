import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import styles, { cardViewer } from "../../config/styles";

const getWidthUsed = zoom => `${zoom}%`;

const useStyles = makeStyles(theme => ({
  background: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: cardViewer.innerBorderRadius,
    ...styles.imageBackgroud,
    backgroundImage: ({ src }) => `url(${src})`,
    backgroundSize: ({ zoom }) => getWidthUsed(zoom),
    backgroundPosition: ({ position: { x, y } }) =>
      `${getWidthUsed(x)} ${getWidthUsed(y)}`,
    boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.7)"
  }
}));

const Art = ({
  src = "https://i.imgur.com/58t6RNW.jpg",
  children,
  zoom = 100,
  position = { x: 0, y: 0 }
}) => {
  const classes = useStyles({ src, zoom, position });

  return <div className={classes.background}>{children}</div>;
};

export default Art;
