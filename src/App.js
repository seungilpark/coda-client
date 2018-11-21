import React, { Component } from "react";
import "./App.css";
import _ from "lodash";
import GameStatus from "./game-status.js";
import PlayerDeck from "./playerDeck.js";
import ComputerDeck from "./computerDeck.js";
import Card from "./card.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: {
        wins: 0,
        loses: 0
      },
      computerDeck: [],
      pool: [
        "B0H",
        "W0H",
        "B1H",
        "W1H",
        "B2H",
        "W2H",
        "B3H",
        "W3H",
        "B4H",
        "W4H",
        "B5H",
        "W5H",
        "B6H",
        "W6H",
        "B7H",
        "W7H",
        "B8H",
        "W8H",
        "B9H",
        "W9H",
        "B10H",
        "W10H",
        "B11H",
        "W11H",
        "BJH",
        "WJH"
      ],
      playerDeck: [],
      turn: 0,
      selected: "",
      lastDealt: "",
      guessedNumber: "",
      winner: "",
      finished: false
    };
  }

  setUp = () => {
    return (
      <GameStatus
        turn={this.state.turn}
        className="status"
        deck={this.state.pool}
        turnMessage=""
        statusMessage="Click START"
        btnName="START"
        gameBegin={() => {
          this.begin();
        }}
      />
    );
  };

  begin = () => {
    // deal three cards to each player
    let pool = this.state.pool.slice();
    let computerDeck = this.state.computerDeck.slice();
    let playerDeck = this.state.playerDeck.slice();
    for (let i = 0; i < 3; i++) {
      let drawnCardForComputer = _.sample(pool);
      pool = pool.filter(cardName => cardName !== drawnCardForComputer);
      computerDeck.push(drawnCardForComputer);
      let drawnCardForPlayer = _.sample(pool);
      pool = pool.filter(cardName => cardName !== drawnCardForPlayer);
      playerDeck.push(drawnCardForPlayer);
    }

    // computer draws a card
    // make a guess
    let drawnCard = _.sample(pool);
    pool = pool.filter(cardName => cardName !== drawnCard);

    let computerChosenCard = _.sample(
      playerDeck.filter(cardName => cardName.substr(-1) !== "R")
    );

    let computerGuessedCard = _.sample(
      pool.concat(playerDeck.filter(cardName => cardName.substr(-1) !== "R"))
    );

    if (computerChosenCard === computerGuessedCard) {
      // if the guess was correct
      playerDeck = playerDeck.filter(
        cardName => cardName !== computerChosenCard
      );
      //removes the guessed card
      // reveals the card and push it to player's Deck
      let revealedPlayerCard = computerGuessedCard.slice(0, -1) + "R";
      playerDeck.push(revealedPlayerCard);

      // adds the drawnCard hidden
      computerDeck.push(drawnCard);
    } else {
      // when the guess was incorrect
      // reveals the drawnCard
      drawnCard = drawnCard.slice(0, -1) + "R";
      computerDeck.push(drawnCard);
    }

    this.setState({
      pool: pool,
      computerDeck: computerDeck,
      playerDeck: playerDeck,
      turn: this.state.turn + 1
    });
  };

  computerTurn = () => {
    let pool = this.state.pool.slice();
    let computerDeck = this.state.computerDeck.slice();
    let playerDeck = this.state.playerDeck.slice();
    let drawnCard = _.sample(pool);
    pool = pool.filter(cardName => cardName !== drawnCard);

    // computer picks a card from playerdeck
    //  and makes a guess
    let computerChosenCard = _.sample(
      playerDeck.filter(cardName => cardName.substr(-1) !== "R")
    );
    let computerGuessedCard = _.sample(
      pool.concat(playerDeck.filter(cardName => cardName.substr(-1) !== "R"))
    );



    if (computerChosenCard === computerGuessedCard) {
      // if computer guessed correctly
      playerDeck = playerDeck.filter(
        cardName => cardName !== computerChosenCard
      );
      let revealedPlayerCard = computerGuessedCard.slice(0, -1) + "R";
      playerDeck.push(revealedPlayerCard);
      computerDeck.push(drawnCard);
      
      if (
        playerDeck.length !== 0 &&
        playerDeck.filter(cardName => cardName.substr(-1) === "H").length === 0
      ) {
        this.setState({
          winner: "Computer",
          finished: true,
          statusMessage: "Computer Won!",
          pool: pool,
          computerDeck: computerDeck,
          playerDeck: playerDeck,
        });
        return
      }

    } else {
      // if computer guessed incorrectly
      // reveals the drawnCard
      drawnCard = drawnCard.slice(0, -1) + "R";
      computerDeck.push(drawnCard);
    }


    this.setState({
      pool: pool,
      computerDeck: computerDeck,
      playerDeck: playerDeck,
      turn: this.state.turn + 1
    });
  };
  // selectCard={(cardName)=>this.selectCard(cardName)}
  dealBlack = () => {
    let pool = this.state.pool.slice();
    let playerDeck = this.state.playerDeck.slice();
    let blackCard = _.sample(
      pool.filter(cardName => cardName.substr(0, 1) === "B")
    );
    pool = pool.filter(cardName => cardName !== blackCard);
    playerDeck.push(blackCard);
    this.setState({
      pool: pool,
      playerDeck: playerDeck,
      lastDealt: blackCard
    });
  };

  dealWhite = () => {
    let pool = this.state.pool.slice();
    let playerDeck = this.state.playerDeck.slice();
    let whiteCard = _.sample(
      pool.filter(cardName => cardName.substr(0, 1) === "W")
    );
    pool = pool.filter(cardName => cardName !== whiteCard);
    playerDeck.push(whiteCard);
    this.setState({
      pool: pool,
      playerDeck: playerDeck,
      lastDealt: whiteCard
    });
  };

  selectCard = cardName => {
    this.setState({
      selected: cardName
    });
  };

  getGuessedNum = event => {
    this.setState({
      guessedNumber: event.target.value
    });
  };

  checkGuess = () => {
    let playerDeck = this.state.playerDeck.slice();
    let computerDeck = this.state.computerDeck.slice();

    let cardBeingGuessed = this.state.selected;
    cardBeingGuessed = new Card(cardBeingGuessed);
    let guess = this.state.guessedNumber;
    let lastDealt = this.state.lastDealt;

    if (cardBeingGuessed.getNumber() === guess) {
      // when player guessed correctly
      // not reveal the lastdealt
      // append it to computerDeck
      computerDeck = computerDeck.filter(
        cardName => cardName !== cardBeingGuessed.getCardName()
      );
      cardBeingGuessed.flipCard();
      computerDeck.push(cardBeingGuessed.getCardName());
      
      if (
        computerDeck.length !== 0 &&
        computerDeck.filter(cardName => cardName.substr(-1) === "H").length === 0
      )  {
        this.setState({
          winner: "Player",
          finished: true,
          statusMessage: "Player Won!",
          computerDeck: computerDeck
        });
        return
      } //if the game is finished

      this.setState({
        computerDeck: computerDeck
      });
    } else if (
      cardBeingGuessed.getNumber() === "J" &&
      (guess === "j" || guess === "joker" || guess === "Joker")
    ) {
      computerDeck = computerDeck.filter(
        cardName => cardName !== cardBeingGuessed.getCardName()
      );
      cardBeingGuessed.flipCard();
      computerDeck.push(cardBeingGuessed.getCardName());
      if (
        computerDeck.length !== 0 &&
        computerDeck.filter(cardName => cardName.substr(-1) === "H").length === 0
      )  {
        this.setState({
          winner: "Player",
          finished: true,
          statusMessage: "Player Won!",
          computerDeck: computerDeck
        });
        return
      } //if the game is finished

      this.setState({
        computerDeck: computerDeck
      });
    } else {
      // when player guessed incorrectly
      // reveal the last dealt card
      playerDeck = playerDeck.filter(cardName => cardName !== lastDealt);
      lastDealt = new Card(lastDealt);
      lastDealt.flipCard();
      playerDeck.push(lastDealt.getCardName());
      this.setState({
        playerDeck: playerDeck
      });
      // this.computerTurn();
    }
  };

  //give prop of  makeGuess()
  afterTurnStarts = () => {
    return (
      <GameStatus
        turn={this.state.turn}
        className="status"
        deck={this.state.pool}
        turnMessage="Your Turn"
        statusMessage="Pick a Card from the middle. Click Computer's Card you want to guess. Type number. Click Guess."
        btn1="Guess"
        btn2="Next"
        dealBlack={() => {
          this.dealBlack();
        }}
        dealWhite={() => {
          this.dealWhite();
        }}
        guessNum={event => this.getGuessedNum(event)}
        //TODO btn1Func
        checkGuess={() => this.checkGuess()}
        //TODO btn2Func
        nextTurn={() => {
          this.computerTurn();
        }}
      />
    );
  };

  resetGame = () => {
    this.setState({
      playerStatus: {
        wins: 0,
        loses: 0
      },
      computerDeck: [],
      pool: [
        "B0H",
        "W0H",
        "B1H",
        "W1H",
        "B2H",
        "W2H",
        "B3H",
        "W3H",
        "B4H",
        "W4H",
        "B5H",
        "W5H",
        "B6H",
        "W6H",
        "B7H",
        "W7H",
        "B8H",
        "W8H",
        "B9H",
        "W9H",
        "B10H",
        "W10H",
        "B11H",
        "W11H",
        "BJH",
        "WJH"
      ],
      playerDeck: [],
      turn: 0,
      selected: "",
      lastDealt: "",
      guessedNumber: "",
      winner: "",
      finished: false
    });
  };
  
  /* save game */
  save = () => {
    // make a axios POST request
    // with updated userStatus
    // json of {userID, userName, wins, loses}
    console.log('save game')
  }
  /* fetch leaderboard */
  getTopTen = () => {
    // make a GET reqeust for top 10 users
    // [{userName, wins, loses}]
    console.log('fetch top 10')
  }

  renderFinished = () => {
    return (
      <GameStatus
        turn={this.state.turn}
        finished={this.state.finished}
        className="status"
        deck={this.state.pool}
        turnMessage="Game Over"
        statusMessage={this.state.statusMessage}
        btn1="reset"
        btn2="save"
        reset = {()=>this.resetGame()}
        save = {()=>this.save()}
      />
    );
  };


render = () => {
  return (
    <div className="App">
      <header className="menu">
        <div className="logo" />
        <div>wins:{this.state.playerStatus.wins}</div>
        <div>loses:{this.state.playerStatus.loses}</div>
        <div>
          win_rate:
          {this.state.playerStatus.wins !== 0 &&
          this.state.playerStatus.loses !== 0
            ? (this.state.playerStatus.wins /
                (this.state.playerStatus.wins +
                  this.state.playerStatus.loses)) *
              100
            : 0}
          %
        </div>
        <div>leaderboard</div>
        <div>profile</div>
      </header>

      <ComputerDeck
        selectCard={cardName => this.selectCard(cardName)}
        className="computerDeck"
        deck={this.state.computerDeck}
      />

      {this.state.turn === 0
        ? this.setUp()
        : this.state.finished
        ? this.renderFinished()
        : this.afterTurnStarts()}

      <PlayerDeck className="playerDeck" deck={this.state.playerDeck} />
    </div>
  );
};
}

export default App;
