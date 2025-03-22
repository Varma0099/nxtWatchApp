import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'

import './index.css'

const Header = props => {
  const logoutButton = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <nav className="nav-bg">
        <div>
          <Link to="/" className="class-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="website logo"
              className="logo"
            />
          </Link>
        </div>

        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <button data-testid="theme" type="button">
            Theme
          </button>
          <Popup
            modal
            trigger={
              <button type="button" className="button">
                Logout
              </button>
            }
          >
            {close => (
              <>
                <div>
                  <p>Are you sure, you want to logout</p>
                </div>
                <button
                  type="button"
                  className="trigger-button"
                  onClick={() => close()}
                >
                  Cancle
                </button>
                <button onClick={logoutButton}>Confirm</button>
              </>
            )}
          </Popup>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
