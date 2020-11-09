import React from 'react';
import { Link, navigate } from 'gatsby';

// EXTRA INFO
function goToSlicemasters() {
  // 1. Wait for 2 secons
  setTimeout(() => {
    console.log('Go to sliders!!!!!');
    // Replace : True add to browser history
    navigate('/slicemasters', { replace: true });
  }, 2000);
  // 2.Change the page
}

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/">LOGO</Link>
        </li>
        <li>
          <Link to="/slicemasters">Slicemasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
      </ul>
    </nav>
  );
}
