import React from "react";
import "./NavBar.css";
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <Link to="/">
      <div className="navBar">
        <h1>Coin Search</h1>
      </div>
    </Link>
  );
}

export default NavBar;
