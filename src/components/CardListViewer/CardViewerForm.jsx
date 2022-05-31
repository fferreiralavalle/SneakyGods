import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CloudDownload, Search } from "@material-ui/icons";
import { Field, Form } from "formik";

// Material UI
import { TextField, Select } from "formik-material-ui";

// Components
import { Button, FormControl, InputLabel } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { cardTypes } from "../../utils/CardTypes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2)
  },
  form: {
    display: "flex",
    flexDirection: "row",
    textAlign: "left"
  },
  addButton: {
    height: "80%",
    margin: "auto 0px"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowStart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  iconType: {
    marginRight: "0.5em"
  },
  condition: {
    width: "30%"
  },
  action: {
    width: "55%"
  },
  input: {
    width: 120,
    marginRight: theme.spacing(1)
  }
}));

const CardViewerForm = ({
  values,
  onSubmit,
  setFieldValue,
  onDownload,
  ...props
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Form>
        <div className={classes.form}>
          <Field
            component={TextField}
            type="number"
            name="width"
            label="Card Width"
            InputLabelProps={{
              shrink: true
            }}
          />
          <Field
            component={TextField}
            name="name"
            label="Name"
            value={values.name}
            InputLabelProps={{
              shrink: true
            }}
          />
          <FormControl className={classes.input}>
            <InputLabel htmlFor="type-simple">Card Type</InputLabel>
            <Field
              component={Select}
              name="type"
              label="Card Type"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                id: "type-simple"
              }}
            >
              {[{ id: "All", label: "All" }, ...Object.values(cardTypes)].map(
                type => (
                  <MenuItem
                    selected={values.type === type.id}
                    value={type.id}
                    key={type.id}
                  >
                    {type.iconComponent && (
                      <type.iconComponent className={classes.iconType} />
                    )}{" "}
                    {type.label}
                  </MenuItem>
                )
              )}
            </Field>
          </FormControl>
          <Button
            className={classes.addButton}
            variant="contained"
            type="submit"
          >
            <Search />
          </Button>
          <Button
            className={classes.addButton}
            variant="contained"
            type="submit"
            onClick={onDownload}
          >
            <CloudDownload />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CardViewerForm;
