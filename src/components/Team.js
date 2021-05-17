import React, { Component } from 'react'
import { getCurrentlyComparing } from '../actions/clientActions';
import Player from './Player';
import { connect } from 'react-redux';

class Team extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            playersDisplayed: false,
            draggable: this.props.draggable
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

        const { currentlyComparing } = this.props;
        let classname = 'team';
        if(currentlyComparing === "team") {
            console.log('here');
            classname += " green"
        } else if (currentlyComparing === "player") {
            classname += " red"
        }

        const players = this.props.value.players.map(player => (
            <Player key={ player.player_id } value={ player }/>
        ))

        const display = this.state.playersDisplayed;

        return (
            <div>
                <div className={classname} 
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

const mapDispatchToProps = dispatch => ({
    getCurrentlyComparing: () => dispatch(getCurrentlyComparing())
})

function mapStateToProps(state) {
    const { currentlyComparing } = state.teams;
    return {
        currentlyComparing
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
