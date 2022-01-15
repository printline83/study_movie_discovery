import React from 'react'

import '../style/Footer.scss'


const Footer = () => {
  return (
    <footer>
      <div>
        <a href="">
          <span className="secondary"> @{new Date().getFullYear()} </span>
          <span className="primary">Created by printline83</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer