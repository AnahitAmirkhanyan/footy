import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeagues, fetchTeams, getCurrentlyComparing } from '../actions/clientActions';
import Team from './Team';

class League extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            teamsDisplayed: false
        }

        this.displayTeams = this.displayTeams.bind(this);
    }

    displayTeams() {
        this.setState(state => ({
            teamsDisplayed: !state.teamsDisplayed
        }));
    }

    componentDidMount() {
        const { fetchTeams } = this.props;

        fetchTeams();

        const { teams } = this.props;
    }  
    
    render() {

        let teamsArr = [];
        let leagueteams = this.props.value.teams;
        let teams = this.props.teams;

       leagueteams.forEach((element =>{
        for(let j = 0; j < teams.length; j++ ) {
            if(element === teams[j].team_id) {
                teamsArr.push(teams[j]);
            }
        }
       }));

        const teamItems = teamsArr.map(team => (
            <Team key={team.team_id} value={team}/>
        ));
        const display = this.state.teamsDisplayed;

        return (
            <div>
                <div className="league"
                     onClick={this.displayTeams}
                     id={this.props.value.league_id}  
                >
                <i className={this.state.teamsDisplayed ? "arrowDown" : "arrowUp"}></i>
                 { this.props.value.name } 
                
            </div>
            {display && teamItems}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchTeams: () => dispatch(fetchTeams())
})

function mapStateToProps(state) {
    const { teams } = state.teams;
    return {
        teams
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(League);
