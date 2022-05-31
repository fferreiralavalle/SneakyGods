import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import Effect, { defaultEffect } from "./Effect";
import colors from "../../config/colors";

const useStyles = makeStyles(theme => ({
  background: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "auto",
    position: "relative",
    width: "100%",
    minHeight: "30%",
    color: theme.palette.primary.main,
    padding: "6% 2% 1% 2%",
    paddingRight: ({ rightSpace }) => (rightSpace ? "21%" : "2%"),
    background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 100%)"
  },
  textContainer: {
    textAlign: "left"
  },
  flavourText: {
    marginTop: "2%",
    textAlign: "left",
    color: colors.flavourText,
    fontSize: "70%"
  }
}));

const defaultEffectList = [defaultEffect];

const EffectContainer = ({
  effects = defaultEffectList,
  flavourText,
  rightSpace = false
}) => {
  const classes = useStyles({ rightSpace });

  useEffect(() => {}, [effects, flavourText, rightSpace]);

  return (
    <div className={classes.background}>
      {effects.map(e => (
        <Effect effect={e} />
      ))}
      <div className={classes.flavourText}>{flavourText}</div>
    </div>
  );
};

export default EffectContainer;
