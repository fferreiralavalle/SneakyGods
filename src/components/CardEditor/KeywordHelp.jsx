import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: theme.spacing(1),
    alignItems: "center",
    color: ({ color }) => color
  },
  title: {
    display: "flex"
  },
  icon: {
    height: "1em"
  },
  alias: {
    marginTop: theme.spacing(1),
    marginBottom: 0
  }
}));

const KeywordHelp = ({ keyword, ...props }) => {
  const classes = useStyles({ color: keyword.color });

  return (
    <div className={classes.root} {...props}>
      <div className={classes.title}>
        {keyword.icon && (
          <img
            className={classes.icon}
            src={keyword.icon}
            alt={keyword.label}
          />
        )}
        {keyword.label}
      </div>
      <ul className={classes.alias}>
        {keyword.alias.map(a => (
          <li key={a}>[{a}]</li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordHelp;
