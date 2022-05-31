import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

// Components
import { getUserCards } from "../../state/users/actions";
import CardListViewer from "../../components/CardListViewer";
import routes from "../../config/routes";

const useStyles = makeStyles(() => ({
  root: {
    minHeight: "100vh",
    paddingTop: 100,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "start",
    justifyContent: "center"
  }
}));

const UserCards = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { userCards, isLoadingCards } = useSelector(state => state.users);

  useEffect(() => {
    if (!userId) history.push(routes.usersView);
    else {
      dispatch(getUserCards({ userId }));
    }
  }, []);

  return (
    <div className={classes.root}>
      {isLoadingCards && <CircularProgress size={50} />}
      <CardListViewer cards={userCards} />
    </div>
  );
};

export default UserCards;
