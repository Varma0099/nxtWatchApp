import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {FaFire} from 'react-icons/fa'

import SavedContext from '../../Context/SavedContext'

import Header from '../Header/index'

import HeaderLeft from '../HeaderLeft/index'

import VideoCard1 from '../VideoCard1/index'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideos extends Component {
  state = {data: [], apiStatus: apiStatusConstants.initial}

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request please try again
      </p>
      <button onClick={this.retryData} type="button">
        Retry
      </button>
    </div>
  )

  renderSuccessView() {
    const {data} = this.state
    return (
      <SavedContext.Consumer>
        {value => {
          const {savedList} = value
          return (
            <div>
              {savedList.length === 0 ? (
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                  />
                  <h1>No saved videos found</h1>
                  <p>Save your videos by clicking a button</p>
                </div>
              ) : (
                <ul className="videos-list-trending">
                  {savedList.map(each => (
                    <VideoCard1 info={each} key={each.id} type="Trending" />
                  ))}
                </ul>
              )}
            </div>
          )
        }}
      </SavedContext.Consumer>
    )
  }

  render() {
    return (
      <div>
        <Header />
        <div className="Home">
          <HeaderLeft />
          <div className="Home-body">
            <h1 className="h-trending">
              <FaFire className="symbol-trending" />
              Saved Videos
            </h1>
            <div>{this.renderSuccessView()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default SavedVideos
