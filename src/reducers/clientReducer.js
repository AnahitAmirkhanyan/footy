
import { FETCH_TEAMS, SET_CURRENTLY_COMPARING, GET_CURRENTLY_COMPARING, GET_PLAYER_ONE_BY_ID, GET_PLAYER_TWO_BY_ID, GET_TEAM_ONE_BY_ID, GET_TEAM_TWO_BY_ID } from '../actions/types';

const initialState = {
    teams: [],
    teamOne: {},
    teamTwo: {},
    playerOne: {},
    playerTwo: {},
    currentlyComparing: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_TEAMS:
            return {
                ...state,
                teams: action.payload
            };

        case GET_TEAM_ONE_BY_ID:
            const teamOneID = action.payload;
            const teamOne = state.teams.find(item => item.team_id == teamOneID);
            return {
                ...state, 
                teamOne
            }
        
        case GET_TEAM_TWO_BY_ID:
            const teamTwoID = action.payload;
            const teamTwo = state.teams.find(item => item.team_id == teamTwoID);
            return {
                ...state, 
                teamTwo
            }
        
        case GET_PLAYER_ONE_BY_ID:
            const playerOneID = action.payload;
            const playerOneData = state.teams.find(item => item.players.find(pl => pl.player_id == playerOneID));
            const playerOne = playerOneData.players.find(player => player.player_id === playerOneID);
            return {
                ...state,
                playerOne
            }
        
        case GET_PLAYER_TWO_BY_ID:
            const playerTwoID = action.payload;
            const playerTwoData = state.teams.find(item => item.players.find(pl => pl.player_id == playerTwoID));
            const playerTwo = playerTwoData.players.find(player => player.player_id === playerTwoID);
            
            return {
                ...state,
                playerTwo
            }
        
        case SET_CURRENTLY_COMPARING:
            return {
                ...state,
                currentlyComparing: action.payload
            }
        
        case GET_CURRENTLY_COMPARING:
            return {
                ...state
            }
        default:
            return state;
  }
}