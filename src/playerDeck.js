import React, { Component } from "react";
import "./App.css";
import Card from "./card.js";
import _ from "lodash";

class PlayerDeck extends Component {

  renderCard = card => {
    /*   
      onClick={() => this.props.onClick(i)}
        about the onClick    
        if it is the player's turn
        clicking computer card is making a guess
        the logic should be in App component

        for computer you do not need to use event?
            just random guess for now?
    */
    let cardClassName;
    if (card.isVisible()) {
      if (card.getColor() === "B") {
        cardClassName = "visibleBlackPlayerCard";
      } else {
        cardClassName = "visibleWhitePlayerCard";
      }
    } else {
      if (card.getColor() === "B") {
        cardClassName = "blackPlayerCard";
      } else {
        cardClassName = "whitePlayerCard";
      }
    }

    return (
      <div key={card.getCardName()} className={cardClassName}>
        {card.getNumber()}
      </div>
    );
  };

  render() {
    let deck = _.sortBy(this.props.deck.map(cardName => new Card(cardName)), [
      card => card.getValue()])
    return (
      <div className="playerDeckContainer">
        {deck.map(card => this.renderCard(card))}
      </div>
    );
  }
}

export default PlayerDeck;
