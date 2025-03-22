import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: '', showPassword: false}

  usernameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = token => {
    const {history} = this.props

    Cookies.set('jwt_token', token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  showPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  loginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.setState({error: data.error_msg})
    }
  }

  render() {
    const {username, password, error, showPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg">
        <div className="bg1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="logo"
          />
          <form className="form" onSubmit={this.loginForm}>
            <div className="form-label">
              <label htmlFor="username" className="label">
                USERNAME
              </label>
              <input
                id="username"
                placeholder="Username"
                className="input"
                onChange={this.usernameInput}
                value={username}
              />
            </div>
            <div className="form-label">
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                id="password"
                placeholder="password"
                type={showPassword ? 'text' : 'password'}
                className="input"
                onChange={this.passwordInput}
                value={password}
              />
            </div>
            <div>
              <input type="checkbox" onChange={this.showPassword} id="show" />
              <label className="label" htmlFor="show">
                show password
              </label>
            </div>

            <button type="submit" className="button">
              Login
            </button>
            <p className="error-msg">{error}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
