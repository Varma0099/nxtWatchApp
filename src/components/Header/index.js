import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import Popup from 'reactjs-popup'
import {FiSun, FiMoon} from 'react-icons/fi'
import {useTheme} from '../../Context/ThemeContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

const Header = props => {
  const {theme, toggleTheme} = useTheme()

  const logoutButton = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-bg">
      <Link to="/" className="nav-logo-link">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>

      <div className="nav-right">
        <button
          type="button"
          className="theme-toggle-switch"
          aria-label="Toggle theme"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-img"
        />
        <Popup
          modal
          trigger={
            <button type="button" className="logout-button">
              Logout
            </button>
          }
          overlayClassName="popup-overlay"
          contentStyle={{
            padding: '0',
            border: 'none',
            borderRadius: 'var(--border-radius)',
          }}
        >
          {close => (
            <div className="popup-content">
              <h2 className="popup-title">Are you sure you want to logout?</h2>
              <div className="popup-buttons">
                <button
                  type="button"
                  className="popup-button cancel"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="popup-button confirm"
                  onClick={logoutButton}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </nav>
  )
}

export default withRouter(Header)
