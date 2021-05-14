import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getTeam } from '../actions/clientActions';

class Stats extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { getTeam, value } = this.props;
        getTeam(value);
    }

    render() {
        
        const { team } = this.props;
        let players = '';
        if(team.players){
            players = team.players.map(player => (<li>{player.name}</li>));
        }
        // console.log(team);
        
        return (
            <div id={team.team_id} className="stats">
                {team.name}
                <p>Players in this team:</p>
                {players}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { team } = state.teams;
    return {
        team
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTeam: (value) => dispatch(getTeam(value)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Stats);