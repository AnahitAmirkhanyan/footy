import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTeam } from '../actions/clientActions';

class TeamStats extends Component {

    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     const { getTeam, value } = this.props;
    //     getTeam(value);
    // }

    render() {
        
        const team = this.props.value;
        let teamGoals = 0;
        let teamTackle = 0;
        if(team.players){
            team.players.map(player => {teamGoals += player.goals; teamTackle += player.tackle});
            teamGoals /= team.players.length;
            teamTackle /= team.players.length;
        }
        
        

        return (
            <div id={team.team_id} className="stats">
                <h3>{team.name}</h3>
                <br/>
                <div>
                    <li>Goals: {teamGoals}</li>
                    <li>Tackle: {teamTackle}</li>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     const { team } = state.teams;
//     return {
//         team
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getTeamOne: (value) => dispatch(getTeam(value)),
//     }
// }


export default (TeamStats);