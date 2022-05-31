import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

// Components
import getUsers from "../../state/users/actions";
import UserPreview from "./UserPreview";
import routes, { getRoute } from "../../config/routes";

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

const UsersView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { users, isLoading, error } = useSelector(state => state.users);

  useEffect(() => {
    if (!users && !isLoading && !error) {
      dispatch(getUsers());
    }
  }, [users, isLoading, error]);

  return (
    <div className={classes.root}>
      {isLoading && <CircularProgress size={50} />}
      {users &&
        users.map(user => (
          <UserPreview
            user={user}
            key={user.id}
            onClick={() =>
              history.push(getRoute(routes.userView, { userId: user.id }))
            }
          />
        ))}
    </div>
  );
};

export default UsersView;
