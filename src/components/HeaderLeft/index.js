import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GoHome} from 'react-icons/go'

import {FaFire, FaSave} from 'react-icons/fa'

import {SiYoutubegaming} from 'react-icons/si'

import './index.css'

class HeaderLeft extends Component {
  componentDidMount() {
    this.getHeader()
  }

  getHeader = () => {
    const response = this.props
    console.log(response)
  }

  render() {
    return (
      <div>
        <nav className="nav-bg-left">
          <div>
            <ul className="left-ul">
              <Link to="/" className="class-link">
                <li className="left-li">
                  {' '}
                  <GoHome className="symbol" /> Home
                </li>
              </Link>
              <Link to="/trending" className="class-link">
                <li className="left-li">
                  <FaFire className="symbol" />
                  Trending
                </li>
              </Link>
              <Link to="/gaming" className="class-link">
                <li className="left-li">
                  <SiYoutubegaming className="symbol" />
                  Gaming
                </li>
              </Link>
              <Link to="/saved-videos" className="class-link">
                <li className="left-li">
                  <FaSave className="symbol" />
                  Saved Videos
                </li>
              </Link>
            </ul>
          </div>

          <div className="nav-bg-left-bottom">
            <p>Contact Us</p>
            <div className="social-media">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="social-media-img"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="social-media-img"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="social-media-img"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </nav>
      </div>
    )
  }
}

export default HeaderLeft
