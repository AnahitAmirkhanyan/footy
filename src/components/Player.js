import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCurrentlyComparing } from '../actions/clientActions';

class Player extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false
        }
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
    render() {    
        const { currentlyComparing, playerOne, playerTwo } = this.props;
        const id = this.props.value.player_id;
        let classname = 'player';
        let draggable = true;
        if(currentlyComparing === "player") {
            classname += " green";
            draggable = true;
        } else if (currentlyComparing == "team") {
            classname += " red";
            draggable =false;
        }

        if(playerOne && playerOne.player_id === id || playerTwo && playerTwo.player_id === id) {
            classname += " red";
            draggable =false;
        }

        return (
            <div
                id={id}
                className={classname}
                onDragStart={this.dragStart} 
                onDragOver={this.dragOver}
                draggable={draggable}
                >
                { this.props.value.name }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getCurrentlyComparing: () => dispatch(getCurrentlyComparing())
})

function mapStateToProps(state) {
    const { currentlyComparing, playerOne, playerTwo } = state.teams;
    return {
        currentlyComparing,
        playerOne,
        playerTwo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);