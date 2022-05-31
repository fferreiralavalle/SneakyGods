import React from "react";
import { makeStyles } from "@material-ui/styles";

import { renderFormattedEffect } from "../../utils/CardViewer";
import CardIcon from "./CardIcon";

const useStyles = makeStyles(() => ({
  background: {
    display: "flex",
    whiteSpace: "pre-wrap",
    lineHeight: 1.1,
    minHeight: "0.5em"
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    flexWrap: "wrap"
  },
  conditionText: {
    display: "flex",
    textAlign: "left",
    fontFamily: "CardFont SemiBold"
  }
}));

export const defaultEffect = {
  condition: {
    text: "Chaos"
  },
  action: {
    text: "My [pow] can't go below 1."
  }
};

const EffectAction = props => {
  const classes = useStyles();
  return <div className={classes.textContainer} {...props} />;
};

const EffectCondition = props => {
  const classes = useStyles();
  return <div className={classes.conditionText} {...props} />;
};

const Effect = ({ effect = defaultEffect }) => {
  const classes = useStyles();
  const { condition, action } = effect;
  return (
    <div className={classes.background}>
      {renderFormattedEffect(condition.text, EffectCondition, CardIcon)}
      {condition.text !== "" ? <span>: </span> : null}
      {renderFormattedEffect(action.text, EffectAction, CardIcon)}
    </div>
  );
};

export default Effect;
