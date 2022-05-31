import { createAction } from "@reduxjs/toolkit";
import { baseServerUrl, pyhtonServer } from "../../config/firebase";

export const ADD_CAMERA_REQUEST = "cameras/ADD_CAMERA_REQUEST";
export const ADD_CAMERA_SUCCESS = "cameras/ADD_CAMERA_SUCCESS";
export const ADD_CAMERA_FAILURE = "cameras/ADD_CAMERA_FAILURE";

export const GET_CAMERAS_REQUEST = "cameras/GET_CAMERAS_REQUEST";
export const GET_CAMERAS_SUCCESS = "cameras/GET_CAMERAS_SUCCESS";
export const GET_CAMERAS_FAILURE = "cameras/GET_CAMERAS_FAILURE";

export const DEL_CAMERAS_REQUEST = "cameras/DEL_CAMERAS_REQUEST";
export const DEL_CAMERAS_SUCCESS = "cameras/DEL_CAMERAS_SUCCESS";
export const DEL_CAMERAS_FAILURE = "cameras/DEL_CAMERAS_FAILURE";

export const RESET_CAMERAS = "cameras/RESET_CAMERAS";

export const addCameraRequest = createAction(ADD_CAMERA_REQUEST);
export const addCameraSuccess = createAction(ADD_CAMERA_SUCCESS);
export const addCameraFailure = createAction(ADD_CAMERA_FAILURE);

export const getCamerasRequest = createAction(GET_CAMERAS_REQUEST);
export const getCamerasSuccess = createAction(GET_CAMERAS_SUCCESS);
export const getCamerasFailure = createAction(GET_CAMERAS_FAILURE);

export const delCamerasRequest = createAction(DEL_CAMERAS_REQUEST);
export const delCamerasSuccess = createAction(DEL_CAMERAS_SUCCESS);
export const delCamerasFailure = createAction(DEL_CAMERAS_FAILURE);

export const resetCameras = createAction(RESET_CAMERAS);

export const addCamera = ({ id, cameraUrl, cameraName }) => async dispatch => {
  dispatch(addCameraRequest());

  const response = await fetch(`${baseServerUrl}cameras`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      url: cameraUrl,
      name: cameraName
    })
  }).catch(error => {
    dispatch(addCameraFailure(error));
  });

  if (response && response.ok) {
    const { data } = await response.json();
    dispatch(addCameraSuccess(data));
  } else {
    dispatch(addCameraFailure("error"));
  }
};

export const getCameras = ({ id }) => async dispatch => {
  dispatch(getCamerasRequest());

  const response = await fetch(`${baseServerUrl}cameras?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).catch(error => {
    dispatch(getCamerasFailure(error));
  });

  if (response && response.ok) {
    const { data } = await response.json();
    console.log(data);
    dispatch(getCamerasSuccess(data));
  } else {
    dispatch(getCamerasFailure("error"));
  }
};

export const deleteCamera = ({ id, cameraId }) => async dispatch => {
  dispatch(delCamerasRequest());

  const response = await fetch(`${baseServerUrl}cameras`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      cameraId
    })
  }).catch(error => {
    dispatch(delCamerasFailure(error));
  });

  if (response && response.ok) {
    dispatch(delCamerasSuccess());
    dispatch(getCameras({ id }));
  } else {
    dispatch(delCamerasFailure("error"));
  }
};

export const getSecurityCamera = async ({
  id,
  cameraId,
  url,
  onSuccess,
  onFail
}) => {
  const response = await fetch(
    `${pyhtonServer}video_feed?id=${cameraId}&ip=${url}`
  ).catch(error => {
    onFail(error);
  });

  if (response && response.ok) {
    const image = await response.blob();
    console.log({ message: "preUrl;", image });
    const url = URL.createObjectURL(image);
    onSuccess(url);
  } else {
    onFail("Error");
  }
};
