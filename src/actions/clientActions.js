import { FETCH_TEAMS, GET_TEAM_ONE_BY_ID, GET_TEAM_TWO_BY_ID, GET_PLAYER_ONE_BY_ID, GET_PLAYER_TWO_BY_ID, GET_CURRENTLY_COMPARING, SET_CURRENTLY_COMPARING } from './types';

export const fetchTeams = () => async dispatch => {
    const list = require('../data/data.json');
    dispatch({
      type: FETCH_TEAMS,
      payload: list.teams
    })
  };

export const getTeamOne = (team_id) => async dispatch => {
  dispatch({
    type: GET_TEAM_ONE_BY_ID,
    payload: team_id
  })
}

export const getTeamTwo = (team_id) => async dispatch => {
  dispatch({
    type: GET_TEAM_TWO_BY_ID,
    payload: team_id
  })
}

export const getPlayerOne = (player_id) => async dispatch => {
  dispatch({
    type: GET_PLAYER_ONE_BY_ID,
    payload: player_id
  })
}

export const getPlayerTwo = (player_id) => async dispatch => {
  dispatch({
    type: GET_PLAYER_TWO_BY_ID,
    payload: player_id
  })
}

export const getCurrentlyComparing = () => async dispatch => {
  dispatch({
    type: GET_CURRENTLY_COMPARING
  })
}

export const setCurrentlyComparing = (item_type) => async dispatch => {
  dispatch({
    type: SET_CURRENTLY_COMPARING,
    payload: item_type 
  })
}