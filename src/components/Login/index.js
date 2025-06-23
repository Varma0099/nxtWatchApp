import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    error: '',
    showPassword: false,
    isLoading: false,
  }

  usernameInput = event => {
    this.setState({username: event.target.value, error: ''})
  }

  passwordInput = event => {
    this.setState({password: event.target.value, error: ''})
  }

  loginSuccess = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  loginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    if (!username || !password) {
      this.setState({error: 'Please enter both username and password'})
      return
    }

    this.setState({isLoading: true, error: ''})

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        this.loginSuccess(data.jwt_token)
      } else {
        this.setState({error: data.error_msg || 'Something went wrong'})
      }
    } catch (error) {
      this.setState({error: 'Network error. Please try again.'})
    } finally {
      this.setState({isLoading: false})
    }
  }

  render() {
    const {username, password, error, showPassword, isLoading} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-logo"
          />

          <form className="login-form" onSubmit={this.loginForm}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="form-input"
                onChange={this.usernameInput}
                value={username}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                PASSWORD
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="form-input"
                  onChange={this.passwordInput}
                  value={password}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={this.togglePassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
