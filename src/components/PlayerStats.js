import React, { Component } from 'react'

class PlayerStats extends Component {

    render() {
        const player = this.props.value;
        return (
            <div id={player.player_id} className="stats">
                <h3>{player.name}</h3>
                <br/>
                <div>
                    <li >Goals: &nbsp;
                        <span className={this.props.statProps.goals}>
                            {player.goals}
                        </span>
                    </li>
                    <li>Appearances: 
                        <span className={this.props.statProps.appearances}>
                            {player.appearances}
                        </span>
                    </li>
                    <li>Tackle: 
                        <span className={this.props.statProps.tackle}>
                            {player.tackle}
                        </span>    
                    </li>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     const { player } = state.teams;
//     return {
//         player
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getPlayer: (value) => dispatch(getPlayer(value)),
//     }
// }


export default PlayerStats;