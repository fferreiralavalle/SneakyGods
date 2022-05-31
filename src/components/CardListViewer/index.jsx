import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Formik } from "formik";

import CardViewer from "../CardViewer";
import CardListElement from "./CardListElement";
import CardViewerForm from "./CardViewerForm";

import { saveCard } from "../../utils/CardViewer";
import { cardTypes, GetTypeData } from "../../utils/CardTypes";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    color: "white"
  },
  cardList: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap"
  }
}));

const initialValues = {
  name: "",
  type: "All",
  costMin: 0,
  costMax: 12,
  powerMin: 0,
  powerMax: 12,
  width: 250
};

const getCost = ({ type }) => {
  const { statsInfo, priority } = GetTypeData(type);
  return priority;
};

const CardListViewer = ({
  cards = [],
  canEdit,
  onEdit,
  onRemove,
  ...props
}) => {
  const classes = useStyles();
  const [filteredCards, setFilteredCards] = useState(cards);
  const [lastFilter, setLastFilter] = useState(initialValues);

  const sort = cardsToSort =>
    cardsToSort.sort((ca, cb) => {
      const costA = getCost(ca);
      const costb = getCost(cb);
      if (costA > costb) return -1;
      if (costA < costb) return 1;
      return 0;
    });

  const filter = formFilter => {
    const newFilteredCards = cards.filter(c => {
      const containsName = (c.name || "")
        .toLowerCase()
        .includes(formFilter.name.toLowerCase());
      const containsType =
        formFilter.type === "All" || formFilter.type === c.type;
      return containsName && containsType;
    });
    setLastFilter(formFilter);
    setFilteredCards(sort(newFilteredCards));
  };

  const downloadViewed = () => {
    filteredCards.forEach(fc => {
      saveCard(fc.id, fc.name);
    });
  };

  useEffect(() => {
    if (cards) filter(lastFilter);
  }, [cards]);

  return (
    <div className={classes.root} {...props}>
      <div className={classes.root}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            filter(values);
            setSubmitting(false);
          }}
          validateOnBlur={false}
        >
          {({ values }) => (
            <React.Fragment>
              <CardViewerForm values={values} onDownload={downloadViewed} />
              <span>Card Count: {filteredCards && filteredCards.length}</span>
              <div className={classes.cardList}>
                {filteredCards &&
                  filteredCards.map(card => (
                    <CardListElement
                      onEdit={() => onEdit(card)}
                      onRemove={() => onRemove(card.id)}
                      key={card.id}
                      canEdit={canEdit}
                    >
                      <CardViewer
                        card={card}
                        width={values.width}
                        id={card.id}
                      />
                    </CardListElement>
                  ))}
              </div>
            </React.Fragment>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CardListViewer;
