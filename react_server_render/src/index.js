import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router'

import Home from '../components/Home'
import './index.scss'
import 'ionicons/dist/scss/ionicons.scss'


function main() {
  const app = document.getElementById('app')
  ReactDOM.render((
    <BrowserRouter>
      <Home {...__INITIAL_STATE__} />
    </BrowserRouter>
  ), app)
  console.log('ready')
}

document.addEventListener('DOMContentLoaded', main)

