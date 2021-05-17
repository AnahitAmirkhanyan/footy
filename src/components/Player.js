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
        const { currentlyComparing } = this.props;
        let classname = 'player';
        if(currentlyComparing === "player") {
            classname += " green"
        } else if (currentlyComparing == "team") {
            classname += " red"
        }

        return (
            <div
                id={this.props.value.player_id}
                className={classname}
                onDragStart={this.dragStart} 
                onDragOver={this.dragOver}
                draggable={!this.state.disabled}
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
    const { currentlyComparing } = state.teams;
    return {
        currentlyComparing
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);