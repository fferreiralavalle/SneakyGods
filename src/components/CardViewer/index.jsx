import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import colors from "../../config/colors";
import { cardViewer } from "../../config/styles";
import { cardTypes, GetTypeData } from "../../utils/CardTypes";
import Cost from "./Cost";
import Art from "./Art";
import EffectContainer from "./EffectContainer";
import Power from "./Power";
import CardName from "./CardName";
import CardCrystals from "./CardCrystals";
import CardType from "./CardType";

const useStyles = makeStyles(() => ({
  background: {
    display: "flex",
    flexDirection: "column",
    width: ({ width }) => Number(width),
    height: ({ width, heightRatio }) => width * heightRatio,
    borderRadius: cardViewer.outterBorderRadius,
    backgroundColor: colors.black,
    border: `1px solid black`,
    padding: ({ width }) => width * 0.03,
    fontFamily: "CardFont",
    fontSize: ({ width }) => width * 0.055
  },
  container: {
    borderRadius: cardViewer.innerBorderRadius,
    backgroundColor: colors.cardBackground,
    width: "100%",
    height: "100%",
    position: "relative"
  }
}));

const CardViewer = ({ width = 480, card = {}, ...props }) => {
  const {
    art,
    zoom,
    artPosition,
    cost,
    power,
    isToken,
    name,
    type,
    effects,
    attributes,
    flavourText
  } = card;
  const typeData = GetTypeData(type);
  const { statsInfo, heightRatio, nameColor, canBeToken } = typeData;
  const { hasPower, powerTopLeftPosition, hasCost, hasAttributes } = statsInfo;
  const classes = useStyles({ width, heightRatio });

  useEffect(() => {}, [width, card, effects, hasPower]);

  return (
    <div className={classes.background} {...props}>
      <div className={classes.container}>
        <Art src={art} zoom={zoom} position={artPosition}>
          <EffectContainer
            effects={effects}
            flavourText={flavourText}
            rightSpace={hasPower && !powerTopLeftPosition}
          />
        </Art>
        {hasCost && !isToken && <Cost number={cost} />}
        {hasPower && (
          <Power number={power} topLeftPosition={powerTopLeftPosition} />
        )}
        {hasAttributes && <CardCrystals crystals={attributes} />}
        <CardName
          name={name}
          isToken={isToken && canBeToken}
          nameColor={nameColor}
        />
        <CardType type={typeData} />
      </div>
    </div>
  );
};

export default CardViewer;
