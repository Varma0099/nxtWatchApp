import './index.css'
import {useHistory} from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  return (
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        className="notfound-illustration"
      />
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-message">
        Sorry, the page you are looking for does not exist or has been moved.
        <br />
        Please check the URL or return to the homepage.
      </p>
      <button className="notfound-btn" onClick={() => history.push('/')}>
        Go Home
      </button>
    </div>
  )
}

export default NotFound
