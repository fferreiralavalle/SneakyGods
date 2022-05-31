import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/styles";

// Material UI
import { Refresh } from "@material-ui/icons";
import { Button, CircularProgress, Input } from "@material-ui/core";
import GetAppRoundedIcon from "@material-ui/icons/GetAppRounded";
import PublishRoundedIcon from "@material-ui/icons/PublishRounded";

// Components
import CardViewer from "../CardViewer";
import CardEditorForm from "./CardEditorForm";
import { getCardId, saveCard, saveCardFormated } from "../../utils/CardViewer";
import { addCard, updateCard } from "../../state/cards/actions";
import colors from "../../config/colors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: theme.spacing(2)
  },
  online: {
    color: colors.successColor
  }
}));

const baseCardData = {
  name: "Yxagor",
  type: "minion",
  cost: 3,
  power: 2,
  isToken: false,
  flavourText: "I eat children",
  art: "",
  zoom: 100,
  artPosition: { x: 0, y: 0 },
  effects: []
};

const CardEditor = ({ card: cardProps = baseCardData, onUpload }) => {
  const classes = useStyles();
  const [width, setWidth] = useState(450);
  const [card, setCard] = useState(cardProps);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { isUploading } = useSelector(state => state.cards);

  useEffect(() => {
    setCard(cardProps);
  }, [cardProps]);

  const uploadToCloud = () => {
    if (currentUser) {
      const { uid: userId } = currentUser;
      if (card.id) {
        dispatch(updateCard({ cardId: card.id, card }, onUpload));
      } else {
        dispatch(addCard({ userId, card }, onUpload));
      }
    }
  };

  const openCardReader = () => {
    const cardInput = document.getElementById("card-input");
    cardInput.click();
  };

  const loadJson = (e, setFieldValues) => {
    const reader = new FileReader();
    reader.onload = event => {
      if (event.target) {
        const jsonObject = JSON.parse(event.target.result);
        const cardData = { ...baseCardData, ...jsonObject };
        setCard(cardData);
        setFieldValues(cardData);
      }
    };
    if (e.target) reader.readAsText(e.target.files[0]);
  };

  return (
    <div className={classes.root}>
      <Formik
        initialValues={card}
        onSubmit={(values, { setSubmitting }) => {
          setCard(values);
          setSubmitting(false);
        }}
        validateOnBlur={false}
        key={`${card.name}-${card.id}`}
      >
        {({ setValues, ...props }) => (
          <React.Fragment>
            <div className={classes.row}>
              <Input
                type="number"
                value={width}
                onChange={({ target }) => setWidth(target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  delete card.id;
                  setCard({ ...card, name: "" });
                }}
              >
                <Refresh /> New
              </Button>
              <Button variant="contained" onClick={() => uploadToCloud()}>
                {isUploading ? (
                  <CircularProgress color="secondary" size="1em" />
                ) : (
                  <GetAppRoundedIcon className={card.id && classes.online} />
                )}{" "}
                Cloud
              </Button>
              <Button
                variant="contained"
                onClick={() => saveCard(getCardId(card.name), card.name)}
              >
                <GetAppRoundedIcon /> Img
              </Button>
              <Button
                variant="contained"
                onClick={() => saveCardFormated(card)}
              >
                <GetAppRoundedIcon /> Json
              </Button>
              <Button variant="contained" onClick={openCardReader}>
                <PublishRoundedIcon /> Json
              </Button>
              <input
                id="card-input"
                onChange={e => loadJson(e, setValues)}
                type="file"
                name="name"
                style={{ display: "none" }}
              />
            </div>
            <div className={classes.row}>
              <CardViewer width={width} card={card} id={getCardId(card.name)} />
              <CardEditorForm
                onSubmit={values => {
                  setCard(values);
                }}
                initialData={card}
                {...props}
              />
            </div>
          </React.Fragment>
        )}
      </Formik>
    </div>
  );
};

export default CardEditor;
