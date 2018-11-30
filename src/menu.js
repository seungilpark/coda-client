import React, { Component } from "react";
import "./App.css";
import Manual from "./manual.js"

class Menu extends Component {
 render(){
    let {wins, loses} = this.props.user;
    let total = wins+loses;
    return (
     <header className="menu">
        <div className="logo" />
        <div>wins: {wins}</div>
        <div>loses: {loses}</div>
        <div>
          win_rate: {total!== 0 ? (wins / total) * 100 : 0} %
        </div>
        <div>Leaderboard</div>
        <Manual />
        <div>Logout</div>
      </header>
      )
 }   
}
export default Menu