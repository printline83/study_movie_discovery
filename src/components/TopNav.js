import React from 'react'
import { NavLink } from 'react-router-dom'

import '../style/TopNav.scss'
import { githubRepository, menus } from '../data/constant'


const TopNav = () => {

  const moveToGithub = () => {
    window.open(githubRepository, '_blank');
  }

  return (
    <div className="top-nav">
      <nav>
        <ul>
          {
            menus
            ? menus.map((menu, idx) => {
              return (
                <li key={idx}>
                  <NavLink exact to={menu.to} className="noselect" activeClassName='is-active' >
                    {menu.name}
                  </NavLink>
                </li>
              )
            })
            : null
          }
        </ul>
      </nav>
      <div 
        className="github"
        onClick={moveToGithub}>
        <img src="/assets/github.png" alt="github" />
      </div>
    </div>
  )
}

export default TopNav