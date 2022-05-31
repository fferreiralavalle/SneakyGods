import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Close, Edit } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    margin: theme.spacing(1),
    flexDirection: "column",
    alignItems: "center"
  },
  row: {
    display: "flex",
    marginTop: theme.spacing(0.5),
    width: "80%",
    justifyContent: "space-evenly"
  }
}));

const CardListElement = ({ onEdit, canEdit, onRemove, children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...props}>
      {children}
      {canEdit && (
        <div className={classes.row}>
          <Button variant="contained" onClick={onEdit}>
            <Edit />
          </Button>
          <Button variant="contained" onClick={onRemove}>
            <Close />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CardListElement;
