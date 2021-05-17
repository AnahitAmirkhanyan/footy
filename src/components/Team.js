import React, { Component } from 'react'
import { getCurrentlyComparing } from '../actions/clientActions';
import Player from './Player';
import { connect } from 'react-redux';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            playersDisplayed: false
        }

        this.displayPlayers = this.displayPlayers.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
        getCurrentlyComparing();
    }

    dragStart = e => {
        const target = e.target;
        e.dataTransfer.setData('item_id', target.id);
    }

    dragOver = e => {
        e.stopPropagation();
    }


    displayPlayers() {
        this.setState(state => ({
            playersDisplayed: !state.playersDisplayed
        }));
    }

    render() {

        const { currentlyComparing, teamOne, teamTwo } = this.props;
        const id = this.props.value.team_id;
        let classname = 'team';
        let draggable = true;
        if(currentlyComparing === "team") {
            classname += " green";
            draggable = true;
        } else if (currentlyComparing === "player") {
            classname += " red";
            draggable = false;
        }

        if((teamOne && teamOne.team_id === id) || (teamTwo && teamTwo.team_id === id)) {
            classname += " red";
            draggable = false;
        }

        const players = this.props.value.players.map(player => (
            <Player key={ player.player_id } value={ player }/>
        ))

        const display = this.state.playersDisplayed;

        return (
            <div>
                <div className={classname} 
                 id={id} 
                 onDragStart={this.dragStart} 
                 onClick={this.displayPlayers}
                 onDragOver={this.dragOver}
                 draggable={draggable}   
            >
                <i className={this.state.playersDisplayed ? "arrowDown" : "arrowUp"}></i>
                 { this.props.value.name } 
                
            </div>
            {display && 
                
                     players}
                
            </div>
        )    
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentlyComparing: () => dispatch(getCurrentlyComparing())
})

function mapStateToProps(state) {
    const { currentlyComparing, teamOne, teamTwo } = state.teams;
    return {
        currentlyComparing,
        teamOne,
        teamTwo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
