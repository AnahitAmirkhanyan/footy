import React, { Component } from 'react'

class TeamStats extends Component {

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
                <button className="button" onClick={()=> this.props.handleClick(team.team_id)}> X </button>
                <h3>{team.name}</h3>
                <br/>
                <div>
                    <li>Goals: 
                        <span className={this.props.statProps.teamGoals}>
                            {teamGoals}
                        </span>    
                    </li>
                    <li>Tackle: 
                        <span className={this.props.statProps.teamTackle}>
                            {teamTackle}
                        </span>

                    </li>
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