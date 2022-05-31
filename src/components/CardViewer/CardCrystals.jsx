import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import Crystal from "./Crystals";
import { GetAttribute } from "../../config/attributes";

const useStyles = makeStyles(() => ({
  crystalList: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "0.75em",
    left: "0%",
    padding: "0% 2% 0% 2%",
    background: "rgb(0 0 0 / 0.6)",
    borderRadius: "0 0.5em 0.5em 0"
  }
}));

const CardCrystals = ({ crystals = {} }) => {
  const classes = useStyles();

  useEffect(() => {}, [crystals]);

  const crystalList = [];

  Object.keys(crystals).forEach(ck => {
    if (crystals[ck] !== "")
      crystalList.push(
        <Crystal crystal={GetAttribute(ck)} amount={crystals[ck]} />
      );
  });

  return <div className={classes.crystalList}>{crystalList}</div>;
};

export default CardCrystals;
