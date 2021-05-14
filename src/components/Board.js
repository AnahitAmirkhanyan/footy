import React, { Component }  from 'react';
import TeamStats from './TeamStats';
import PlayerStats from './PlayerStats';
import { connect } from 'react-redux';
import { getPlayerOne, getPlayerTwo, getTeamOne, getTeamTwo, setCurrentlyComparing } from '../actions/clientActions';


class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leftDisplayed: '',
            rightDisplayed: '',
            displayedTypeTeam: ''
        }

        this.drop = this.drop.bind(this);
        this.dragOver =this.dragOver.bind(this); 
    }

    componentDidUpdate() {
        const {getPlayerOne, getPlayerTwo, getTeamOne, getTeamTwo } = this.props;
        if(!this.state.displayedTypeTeam) {
            this.state.leftDisplayed && getPlayerOne(this.state.leftDisplayed);
            this.state.rightDisplayed && getPlayerTwo(this.state.rightDisplayed);
        } else {
            this.state.leftDisplayed && getTeamOne(this.state.leftDisplayed);
            this.state.rightDisplayed && getTeamTwo(this.state.rightDisplayed);
        }
    }

    drop = e => {
        e.preventDefault();
        const itemID = e.dataTransfer.getData('item_id');
        const { setCurrentlyComparing } = this.props;

        if(itemID.charAt(0) === 't'){
            this.setState({
                displayedTypeTeam: true
            }, () => setCurrentlyComparing("team"));
        } else {
            this.setState({
                displayedTypeTeam: false     
            }, () => setCurrentlyComparing("player"));
        }

        if(this.state.leftDisplayed) {
            if(this.state.leftDisplayed === itemID || this.state.rightDisplayed === itemID) {
                return;
            }
            if(this.state.rightDisplayed) {
                this.setState({
                    leftDisplayed: this.state.rightDisplayed,
                    rightDisplayed: itemID
                });
            } else {
                this.setState({
                    rightDisplayed:itemID
                });
            }
        } else {
            this.setState ({
                leftDisplayed: itemID,
             });
        }    
    }

    dragOver = e => {
        e.preventDefault();
    }

    render() {

        let leftItem, rightItem;
        if(this.state.displayedTypeTeam){
            leftItem = <TeamStats value={this.props.teamOne}/>
            rightItem = <TeamStats value={this.props.teamTwo}/>
        } else {
            leftItem = <PlayerStats value={this.props.playerOne}/>
            rightItem = <PlayerStats value={this.props.playerTwo}/>
        }

        

        return (
            <div
                id={this.props.id}
                onDrop={this.drop}
                onDragOver={this.dragOver}
                className={this.props.className}    
            >
                {this.state.leftDisplayed && leftItem}
                {this.state.rightDisplayed && rightItem}
            </div>
        )
    }  
}

function mapStateToProps(state) {
    const { playerOne, playerTwo, teamOne, teamTwo } = state.teams;
    return {
        playerOne,
        playerTwo,
        teamOne,
        teamTwo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPlayerOne: (value) => dispatch(getPlayerOne(value)),
        getPlayerTwo: (value) => dispatch(getPlayerTwo(value)),
        getTeamOne: (value) => dispatch(getTeamOne(value)),
        getTeamTwo: (value) => dispatch(getTeamTwo(value)),
        setCurrentlyComparing: (value) => dispatch(setCurrentlyComparing(value))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Board);