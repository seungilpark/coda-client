import React, { Component } from "react";
import "./App.css";
import Card from "./card.js";
import _ from "lodash";

class ComputerDeck extends Component {

  renderCard = (card, selectedCardName) => {
    /*   
      onClick={() => this.props.onClick(i)}
        about the onClick    
        if it is the player's turn
        clicking computer card is making a guess
        the logic should be in App component
    */
    return (
      <div
        key={card.getCardName()}
        onClick={()=>this.props.selectCard(card.getCardName())}
        className={
          card.getCardName() === selectedCardName
          ? card.getColor() === "B" ? "selectedBlackComputerCard" : "selectedWhiteComputerCard"
          : card.getColor() === "B" ? "blackComputerCard" : "whiteComputerCard"
        }
      >
        {card.isVisible() ? card.getNumber() : ""}
      </div>
    );
  };

  render() {
    let deck = this.props.deck.map(cardName => new Card(cardName));
    if (this.props.deck.length !== 0){
      deck = _.sortBy(deck, [
          card => card.getValue()
        ]);
    }
    return (
      <div className="computerDeckContainer">
        {deck.map(card => this.renderCard(card))}
      </div>
    );
  }
}

export default ComputerDeck;
