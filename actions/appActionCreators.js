import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_SERVER } from "@env";
import { setInitializeError } from  "../actions/errorActionCreators";
import * as actionTypes from "../actions/actionTypes";

const getMatch = (location, sports, year, month, date) => async (dispatch) => {
  // console.log(location, sports, year, month, date)
  console.log(location)
  try {
    const token = await AsyncStorage.getItem("token");
    const { province, city, district } = location;
    const res = await fetch(`${API_SERVER}/match?province=${province}&city=${city}&district=${district}&sports=${sports}&year=${year}&month=${month}&date=${date}`, {
      method: "GET",
      headers: { "Authorization": token },
    });

    const result = await res.json();
    const { message, data, error } = result;

    if (error) { throw new Error() }

    const matches = data;

    dispatch({
      type: "LOAD_MATCH_SUCCESS",
      payload: matches,
    });
  } catch (err) {
    dispatch({ type: "LOAD_MATCH_FAIL" });
  }
};

const getPlayground = (province, city, district) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${API_SERVER}/playground?province=${province}&city=${city}&district=${district}`, {
      method: "GET",
      headers: { "Authorization": token },
    });

    const result = await res.json();
    const { message, data, error } = result;

    if (error) { throw new Error() }

    const playgrounds = data;

    dispatch({
      type: "LOAD_PLAYGROUNDS_SUCCESS",
      payload: playgrounds,
    });
  } catch (err) {
    dispatch({ type: "LOAD_PLAYGROUNDS_FAIL" });
  }
};

const getMyTeam = (team) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(`${API_SERVER}/team/my-team/${team.id}`, {
      method: "GET",
      headers: { "Authorization": token },
    });

    const result = await res.json();
    const { message, data, error } = result;

    if (error) { throw new Error() }

    const myTeam = data;

    dispatch({
      type: "LOAD_MY_TEAM_SUCCESS",
      payload: myTeam,
    });
  } catch (err) {
    dispatch({ type: "LOAD_MY_TEAM_FAIL" });
  }
};

const setInitialize = () => async (dispatch) => {
  try {
    const res = await fetch(`${API_SERVER}/application`, {
      method: "GET",
    });

    const result = await res.json();
    const { message, data, error } = result;

    if (error) { throw new Error() }

    const initialState = data;

    dispatch({
      type: actionTypes.INITIALIZE_APP_SUCCESS,
      payload: initialState,
    });
  } catch (err) {
    dispatch({ type: actionTypes.INITIALIZE_APP_FAIL });
    dispatch(setInitializeError());
  }
};

export {
  getMatch,
  getPlayground,
  getMyTeam,
  setInitialize,
};
