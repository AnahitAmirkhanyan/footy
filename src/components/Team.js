import React, { Component } from 'react'
import Player from './Player';

export default class Team extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            playersDisplayed: false,
            draggable: this.props.draggable
        }

        this.displayPlayers = this.displayPlayers.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragOver = this.dragOver.bind(this);
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

        const players = this.props.value.players.map(player => (
            <Player key={ player.player_id } value={ player }/>
        ))

        const display = this.state.playersDisplayed;

        return (
            <div>
                <div className="team" 
                 id={this.props.value.team_id} 
                 onDragStart={this.dragStart} 
                 onClick={this.displayPlayers}
                 onDragOver={this.dragOver}
                 draggable="true"    
            >
                 { this.props.value.name } 
                
            </div>
            {display && 
                
                     players}
                
            </div>
        )    
    }


}
