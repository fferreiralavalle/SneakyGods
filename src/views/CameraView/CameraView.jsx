import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";

// Components
import CardEditor from "../../components/CardEditor";
import CardListViewer from "../../components/CardListViewer";
import { useEffect } from "react";
import { getCards, removeCard } from "../../state/cards/actions";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    paddingTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
}));

const CardCreatorView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { cards, isLoading, error } = useSelector(state => state.cards);
  const [card, setCard] = useState();

  useEffect(() => {
    if (currentUser && !isLoading && !cards && !error) {
      dispatch(getCards({ userId: currentUser.uid }));
    }
  }, [currentUser, isLoading, cards, error]);

  const onUpload = () => {
    dispatch(getCards({ userId: currentUser.uid }));
  };

  const onRemoveCard = cardId => {
    dispatch(removeCard({ userId: currentUser.uid, cardId }));
  };

  return (
    <div className={classes.root}>
      <CardEditor card={card} onUpload={onUpload} />
      {error}
      <CardListViewer
        cards={cards}
        canEdit
        onEdit={setCard}
        onRemove={onRemoveCard}
      />
    </div>
  );
};

export default CardCreatorView;
