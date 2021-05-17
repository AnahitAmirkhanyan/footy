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
        this.dragOver = this.dragOver.bind(this); 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(itemID) {
        let leftDisplayed = this.state.leftDisplayed;
        let rightDisplayed = this.state.rightDisplayed;
        let displayedTypeTeam = this.state.displayedTypeTeam;

        if(itemID === rightDisplayed) {
            rightDisplayed = '';
        }

        if(itemID === this.state.leftDisplayed) {
            if(rightDisplayed){
                leftDisplayed = rightDisplayed;
                rightDisplayed = '';  
            } else {
                leftDisplayed = '';
            }
        }

        const { getPlayerOne, getPlayerTwo, getTeamOne, getTeamTwo, setCurrentlyComparing } =this.props;

      

        this.setState({
            leftDisplayed,
            rightDisplayed,
            displayedTypeTeam
        });
                
        if(!displayedTypeTeam) {
            leftDisplayed && getPlayerOne(leftDisplayed);
            rightDisplayed && getPlayerTwo(rightDisplayed);
        } else {
            leftDisplayed && getTeamOne(leftDisplayed);

            if(rightDisplayed) {
                getTeamTwo(rightDisplayed);
            }
        }

        if(!leftDisplayed && !rightDisplayed) {
            setCurrentlyComparing('');
            this.setState({
                displayedTypeTeam: ''
            })
            getTeamTwo('');
            getTeamOne('');
            getPlayerTwo('');
            getPlayerOne('');
        }
    }

    drop = e => {
        e.preventDefault();
        const itemID = e.dataTransfer.getData('item_id');
        const { setCurrentlyComparing } = this.props;

        const displayedTypeTeam = (itemID.charAt(0) === 't');

        if(this.state.displayedTypeTeam !== '') {
            if(displayedTypeTeam !== this.state.displayedTypeTeam) {
                return ;
            }        
        }
        

        if(displayedTypeTeam){
            this.setState({
                displayedTypeTeam: displayedTypeTeam
            }, () => setCurrentlyComparing("team"));
        } else {
            this.setState({
                displayedTypeTeam: displayedTypeTeam     
            }, () => setCurrentlyComparing("player"));
        }

        let leftDisplayed = this.state.leftDisplayed;
        let rightDisplayed = this.state.rightDisplayed;

        if(leftDisplayed) {
            if(leftDisplayed === itemID || rightDisplayed === itemID) {
                return;
            }
            
            if(rightDisplayed) {
                leftDisplayed = rightDisplayed;
                rightDisplayed = itemID;
            } else {
                rightDisplayed = itemID;
            }
        } else {
            leftDisplayed = itemID;
        }

        this.setState({
            leftDisplayed, 
            rightDisplayed
        });
        
        const {getPlayerOne, getPlayerTwo, getTeamOne, getTeamTwo } = this.props;
        
        if(!displayedTypeTeam) {
            leftDisplayed && getPlayerOne(leftDisplayed);
            rightDisplayed && getPlayerTwo(rightDisplayed);
        } else {
            leftDisplayed && getTeamOne(leftDisplayed);

            if(rightDisplayed) {
                getTeamTwo(rightDisplayed);
            }
        }
    }

    dragOver = e => {
        e.preventDefault();
    }

    objectCompareAndReturn(objOne, objTwo, propNames) {
        const leftProps = {};
        const rightProps = {};
        
        for(const propName of propNames) {
            if(objOne[propName] > objTwo[propName]) {
                leftProps[propName] = 'green';
                rightProps[propName] = 'red';
            } else if(objOne[propName] < objTwo[propName]) {
                rightProps[propName] = 'green';
                leftProps[propName] = 'red';
            } else if(objOne[propName] === objTwo[propName]) {
                rightProps[propName] = 'brown';
                leftProps[propName]  = 'brown';
            }
        }
        
        return {
            leftProps, rightProps
        }
    }

    render() {

        let leftItem, rightItem;
        if(this.state.displayedTypeTeam){
            const teamOneStats = {
                teamGoals: 0,
                teamTackle: 0
            };

            const teamTwoStats = {
                teamGoals: 0,
                teamTackle: 0
            }
            
            if(this.props.teamOne) {
                const team = this.props.teamOne;
                if(team.players){
                    team.players.forEach(player => {
                        teamOneStats.teamGoals += player.goals; 
                        teamOneStats.teamTackle += player.tackle
                    });
                    teamOneStats.teamGoals /= team.players.length;
                    teamOneStats.teamTackle /= team.players.length;
                }
            }

            if(this.props.teamTwo) {
                const team = this.props.teamTwo;
                if(team.players){
                    team.players.forEach(player => {
                        teamTwoStats.teamGoals += player.goals; 
                        teamTwoStats.teamTackle += player.tackle
                    });
                    teamTwoStats.teamGoals /= team.players.length;
                    teamTwoStats.teamTackle /= team.players.length;
                }
            }
            
            const {leftProps, rightProps} = this.objectCompareAndReturn(teamOneStats, teamTwoStats, [
                'teamGoals',
                'teamTackle'
            ]);

            leftItem = <TeamStats statProps={leftProps} value={this.props.teamOne} handleClick={this.handleClick}/>
            rightItem = <TeamStats statProps={rightProps} value={this.props.teamTwo} handleClick={this.handleClick}/>
        } else {
            const {leftProps, rightProps} = this.objectCompareAndReturn(this.state.leftDisplayed, this.state.rightDisplayed, [
                'goals',
                'appearances',
                'tackle'
            ])

            leftItem = <PlayerStats statProps={leftProps} value={this.props.playerOne} handleClick={this.handleClick}/>
            rightItem = <PlayerStats statProps={rightProps} value={this.props.playerTwo} handleClick={this.handleClick}/>
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