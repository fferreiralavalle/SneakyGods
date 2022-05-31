import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Field, FieldArray, Form } from "formik";

// Material UI
import { TextField, Select } from "formik-material-ui";
import CancelIcon from "@material-ui/icons/Cancel";

// Components
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel
} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import { cardTypes, GetTypeData } from "../../utils/CardTypes";
import { keywords } from "../../config/keywords";
import KeywordHelp from "./KeywordHelp";
import { crystals } from "../../config/attributes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2)
  },
  form: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  addButton: {
    marginTop: theme.spacing(1)
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
  keywords: {
    display: "flex",
    flexDirection: "column"
  },
  keywordsTitle: {
    marginTop: 0
  },
  keywordsList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    maxWidth: 350
  }
}));

const CardEditorForm = ({ values, onSubmit, setFieldValue, ...props }) => {
  const classes = useStyles();
  const { statsInfo, canBeToken } = GetTypeData(values.type);
  const { hasPower, hasCost, hasAttributes } = statsInfo;
  return (
    <div className={classes.root}>
      <Form>
        <div className={classes.form}>
          <Field
            component={TextField}
            name="name"
            label="Name"
            value={values.name}
            InputLabelProps={{
              shrink: true
            }}
          />
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
            {Object.values(cardTypes).map(type => (
              <MenuItem
                selected={values.type === type.id}
                value={type.id}
                key={type.id}
              >
                <type.iconComponent className={classes.iconType} /> {type.label}
              </MenuItem>
            ))}
          </Field>
          <div className={classes.row}>
            <Field
              component={TextField}
              name="art"
              label="Art Url"
              value={values.art}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Field
              component={TextField}
              type="number"
              name="zoom"
              label="Zoom %"
              value={values.zoom}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className={classes.row}>
            <Field
              component={TextField}
              key="artPosition.x"
              type="number"
              name="artPosition.x"
              label="Art X%"
              value={values.artPosition.x}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Field
              component={TextField}
              key="artPosition.y"
              type="number"
              name="artPosition.y"
              label="Art Y%"
              value={values.artPosition.y}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <Field
            component={TextField}
            type="number"
            name="cost"
            label="Cost"
            value={values.cost}
            InputLabelProps={{
              shrink: true
            }}
            disabled={!hasCost}
          />
          {hasAttributes && (
            <div className={classes.rowStart}>
              {Object.values(crystals).map(crystal => (
                <Field
                  component={TextField}
                  key={crystal.id}
                  type="number"
                  name={`attributes.${crystal.id}`}
                  label={`${crystal.label}`}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              ))}
            </div>
          )}
          <div className={classes.rowStart}>
            <Field
              component={TextField}
              type="number"
              name="power"
              label="Power"
              value={values.power}
              InputLabelProps={{
                shrink: true
              }}
              disabled={!hasPower}
            />
            <Field
              component={FormControlLabel}
              name="isToken"
              label="Is Token?"
              onChange={() => setFieldValue("isToken", !values.isToken)}
              control={<Checkbox checked={values.isToken} color="primary" />}
              labelPlacement="end"
              disabled={!canBeToken}
            />
          </div>
          <Field
            component={TextField}
            name="flavourText"
            label="Flavour Text"
            value={values.flavourText}
            InputLabelProps={{
              shrink: true
            }}
          />
          <p>Effects</p>
          <FieldArray
            name="effects"
            render={arrayHelpers => (
              <div className={classes.fields}>
                {values.effects &&
                  values.effects.map((effect, index) => (
                    <div className={classes.input} key={index}>
                      <Field
                        className={classes.condition}
                        component={TextField}
                        name={`effects.${index}.condition.text`}
                        label="Condition"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <Field
                        className={classes.action}
                        component={TextField}
                        name={`effects.${index}.action.text`}
                        label="Action"
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <IconButton
                        className={classes.close}
                        onClick={() => arrayHelpers.remove(index)}
                      >
                        <CancelIcon color="error" />
                      </IconButton>
                    </div>
                  ))}
                <Button
                  variant="outlined"
                  color="primary"
                  disableElevation
                  onClick={() =>
                    arrayHelpers.push({
                      condition: { text: "" },
                      action: { text: "" }
                    })
                  }
                >
                  Add Effect
                </Button>
              </div>
            )}
          />
          <Button
            className={classes.addButton}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </div>
      </Form>
      <div className={classes.keywords}>
        <h2 className={classes.keywordsTitle}>Keywords for Effects</h2>
        <div className={classes.keywordsList}>
          {Object.values(keywords).map(keyword => (
            <KeywordHelp key={keyword.id} keyword={keyword} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardEditorForm;
