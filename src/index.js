import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { I18nContext } from 'react-i18next'
import reportWebVitals from './reportWebVitals'
import i18n from './i18n'
import App from './App'
import store from './store'
import './assets/scss/app.scss'

ReactDOM.render(
  <div className="App">
    <Provider store={ store }>
      <BrowserRouter>
        <I18nContext.Provider value={ i18n }>
          <App />
        </I18nContext.Provider>
      </BrowserRouter>
    </Provider>
  </div>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
