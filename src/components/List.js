import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchLeagues, fetchTeams, getCurrentlyComparing } from '../actions/clientActions';
import '../App.css';
import Team from './Team';
import League from './League';


class List extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { fetchLeagues, fetchTeams } = this.props;

        fetchLeagues();
        fetchTeams();

        const { teams } = this.props;
    }    

    render() {
       
        // const { teams } = this.props;
        // const menu = teams.map(team => (
        //     <Team key={team.team_id} value={team}/>
        // ));
        const { leagues } = this.props;

        const menu = leagues.map(league => (
            <League key={league.league_id} value = {league}/>
        ))

        return (
            <div className="nav">
                <div className="multi-level">
                    { menu }    
                </div>
                
            </div>           
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTeams: () => dispatch(fetchTeams()),
    fetchLeagues: () => dispatch(fetchLeagues())
})

function mapStateToProps(state) {
    const { leagues, teams } = state.teams;
    return {
        leagues,
        teams
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);