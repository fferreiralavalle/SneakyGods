import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";

// Icons
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import NoteIcon from "@material-ui/icons/Note";
import ErrorIcon from "@material-ui/icons/Error";
import LinkedCameraIcon from "@material-ui/icons/LinkedCamera";

// Components
import CircularProgress from "@material-ui/core/CircularProgress";
import Text from "../Text/Text";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";
import OptionsButton from "../OptionsButton/OptionsButton";
import { useDispatch } from "react-redux";
import { deleteCamera } from "../../state/cameras/actions";
import { useSelector } from "react-redux/lib/hooks/useSelector";
import { pyhtonServer } from "../../config/firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    position: "relative"
  },
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.primary.main,
    borderColor: ({ camError, loaded }) =>
      camError
        ? theme.palette.error.main
        : loaded && theme.palette.success.light,
    border: "1px solid",
    minHeight: 100
  },
  frame: {
    width: "100%"
  },
  moreOptions: {
    right: 0,
    bottom: -48,
    position: "absolute",
    minWidth: 20
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  cameraData: {
    padding: theme.spacing(1)
  },
  error: {
    color: theme.palette.error.main
  }
}));

const VideoFrames = ({
  width,
  src = "http://0.0.0.0:6969/video_feed",
  title,
  cameraId,
  onLog,
  ...rest
}) => {
  const dispatch = useDispatch();
  const securityUrl = `${pyhtonServer}video_feed?id=${cameraId}&ip=${src}`;
  const { currentUser } = useSelector(state => state.user);
  const [loaded, setLoaded] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const classes = useStyles({ camError: serverError || cameraError, loaded });
  const [url, setUrl] = useState(securityUrl);

  useEffect(() => {
    if (!loaded && serverError) {
      setUrl(src);
    }
    console.log(serverError);
  }, [serverError, loaded]);

  return (
    <div className={classes.root} style={{ width }} {...rest}>
      <div className={classes.container}>
        <img
          className={classes.frame}
          src={url}
          onLoad={() => setLoaded(true)}
          onError={() =>
            serverError ? setCameraError(true) : setServerError(true)
          }
          alt=""
          style={{ display: loaded && "block" }}
        />
        {cameraError ? (
          <Text className={classes.error}>
            <ErrorIcon className={classes.icon} />
            Error obteniendo video de camara. Verifique que la IP ingresada es
            correcta y que su camara esta actualmente transimitendo
          </Text>
        ) : (
          !loaded && <CircularProgress size={50} />
        )}
        {cameraId && (
          <OptionsButton className={classes.moreOptions}>
            <MenuItem onClick={() => onLog && onLog()}>
              <ListItemIcon className={classes.icon}>
                <NoteIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Ver Logs" />
            </MenuItem>
            <MenuItem
              onClick={() =>
                dispatch(deleteCamera({ id: currentUser.uid, cameraId }))
              }
            >
              <ListItemIcon className={classes.icon}>
                <DeleteOutlinedIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Borrar" />
            </MenuItem>
          </OptionsButton>
        )}
      </div>
      <div className={classes.cameraData}>
        <Text>
          <LinkedCameraIcon className={classes.icon} />
          {title}
        </Text>
        {serverError && (
          <Text className={classes.error}>
            <ErrorIcon className={classes.icon} />
            Servidor de detección no disponible
          </Text>
        )}
      </div>
    </div>
  );
};

export default VideoFrames;
