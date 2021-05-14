import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getPlayer, getTeam } from '../actions/clientActions';

class PlayerStats extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const { getPlayer, value } = this.props;
        // getPlayer(value);
        
    }

    render() {
        
        console.log(this.props);
        // const { team } = this.props;
        // // let players = '';
        // // if(team.players){
        // //     players = team.players.map(player => (<li>{player.name}</li>));
        // // }
        // console.log(team);
        // let teamGoals = 0;
        // let team
        // if(team.players){
        //     team.players.map(player => {teamGoals += player.goals});
        // console.log(teamGoals);
        // }
        const player = this.props.value;
        return (
            <div id={player.player_id} className="stats">
                <h3>{player.name}</h3>
                <br/>
                <div>
                    <li>Goals: {player.goals}</li>
                    <li>Appearances: {player.appearances}</li>
                    <li>Tackle: {player.tackle}</li>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     const { player } = state.teams;
//     return {
//         player
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getPlayer: (value) => dispatch(getPlayer(value)),
//     }
// }


export default PlayerStats;