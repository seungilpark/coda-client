// react component card

import React, { Component } from "react";
import "./App.css";
// import Card from "./card.js";
// import _ from "lodash";
/* GameStatus Component which shows status msg, controllers, and pool status */
class GameStatus extends Component {
  renderBeginning = () => {
    return 
  };

  render() {
    // FIXME else if the turn finished - 
    if (this.props.turn === 0) {
      return (
        <div className="gameStatusContainer">
          <div className="statusTurn">{this.props.turnMessage}</div>
          <div className="statusMessage">{this.props.statusMessage}</div>
          <button className="black">
            {
              this.props.deck.filter(cardName => cardName.slice(0, 1) === "B")
                .length
            }
          </button>
          <button className="white">
            {
              this.props.deck.filter(cardName => cardName.slice(0, 1) === "W")
                .length
            }
          </button>
          <input
            className="textInput"
            placeholder="Guess a number {0-11} or joker e.g. 8 or j"
            type="text"
          />
          <button onClick={() => this.props.gameBegin()} className="main-btn">
            {this.props.btnName}
          </button>
          <button className="next-btn"></button>
        </div>
      );
    } else if (this.props.finished){
      return (
        <div className="gameStatusContainer">
          <div className="statusTurn">{this.props.turnMessage}</div>
          <div className="statusMessage">{this.props.statusMessage}</div>
          <button 
          className="black">
            {
              this.props.deck.filter(cardName => cardName.slice(0, 1) === "B")
                .length
            }
          </button>
          <button 
          className="white">
            {
              this.props.deck.filter(cardName => cardName.slice(0, 1) === "W")
                .length
            }
          </button>
          <input
            className="textInput"
            placeholder="guess the number here"
            type="text"
            onChange={this.props.guessNum}
          />
          <button  
          onClick = {()=>this.props.reset()}
          className="main-btn">
            {this.props.btn1}
          </button>
          <button  
          onClick = {()=>this.props.save()}
          className="next-btn">
            {this.props.btn2}
          </button>
        </div>
      );
    } else {
      return (
        <div className="gameStatusContainer">
          <div className="statusTurn">{this.props.turnMessage}</div>
          <div className="statusMessage">{this.props.statusMessage}</div>
          <button 
          onClick = {()=> this.props.dealBlack()}
          className="black">
            {
              this.props.deck.filter(cardName => cardName.slice(0, 1) === "B")
                .length
            }
          </button>
          <button 
          onClick = {()=>this.props.dealWhite()}
          className="white">
            {
              this.props.deck.filter(cardName => cardName.slice(0, 1) === "W")
                .length
            }
          </button>
          <input
            className="textInput"
            placeholder="Guess a number {0-11} or joker e.g. 8 or j"
            type="text"
            onChange={this.props.guessNum}
          />
          <button  
          onClick = {()=>this.props.checkGuess()}
          className="main-btn">
            {this.props.btn1}
          </button>
          <button  
          onClick = {()=>this.props.nextTurn()}
          className="next-btn">
            {this.props.btn2}
          </button>
        </div>
      );
    }
    
  }
}

export default GameStatus;
