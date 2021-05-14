import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTeams, getCurrentlyComparing } from '../actions/clientActions';
import '../App.css';
import Team from './Team';


class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comparePlayer: ''
        }
    }

    componentDidMount() {
        const { fetchTeams } = this.props;

        fetchTeams();
        getCurrentlyComparing();
        const { teams } = this.props;
        const { currentlyComparing } = teams;
        if(currentlyComparing === "player") {
            this.setState({
                comparePlayer: true
            });
        }
        else {
            this.setState({
                comparePlayer: false
            });
        }
    }    

    render() {
        getCurrentlyComparing();
       
        const { teams } = this.props;
        const menu = teams.teams.map(team => (
            <Team key={team.team_id} value={team}/>
        ));

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
    getCurrentlyComparing: () => dispatch(getCurrentlyComparing())
})

function mapStateToProps(state) {
    const { teams } = state;
    const { currentlyComparing } = teams;
    return {
        teams,
        currentlyComparing
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(List);