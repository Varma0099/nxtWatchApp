import {Component} from 'react'

import {IoMdClose} from 'react-icons/io'

import {FaSearch} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'

import Cookies from 'js-cookie'

import Header from '../Header'

import VideoCard from '../VideoCard'

import HeaderLeft from '../HeaderLeft'

import './index.css'

const bannerImageUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    banner: true,
    search: '',
    searchEle: '',
    data: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideosData()
  }

  retryData = () => {
    this.getVideosData()
  }

  renderProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="error-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="error-image"
      />
      <h1 className="error-title">Oops! Something Went Wrong</h1>
      <p className="error-message">
        We are having some trouble to complete your request. Please try again.
      </p>
      <button onClick={this.retryData} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  getVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchEle} = this.state
    const api = `https://apis.ccbp.in/videos/all?search=${searchEle}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(api, options)
      if (response.ok) {
        const details = await response.json()
        const updatedData = details.videos.map(each => ({
          id: each.id,
          channel: {
            name: each.channel.name,
            profileImageUrl: each.channel.profile_image_url,
          },
          publishedAt: each.published_at,
          thumbnailUrl: each.thumbnail_url,
          title: each.title,
          viewCount: each.view_count,
        }))
        this.setState({
          data: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleSearchInput = event => {
    this.setState({search: event.target.value})
  }

  handleSearch = () => {
    const {search} = this.state
    this.setState({searchEle: search}, this.getVideosData)
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSearch()
    }
  }

  closeBanner = () => {
    this.setState({banner: false})
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <div className="videos-grid">
        {data.map(each => (
          <VideoCard key={each.id} videoData={each} />
        ))}
      </div>
    )
  }

  render() {
    const {banner, search, apiStatus} = this.state
    let renderContent

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        renderContent = this.renderProgressView()
        break
      case apiStatusConstants.success:
        renderContent = this.renderSuccessView()
        break
      case apiStatusConstants.failure:
        renderContent = this.renderFailureView()
        break
      default:
        renderContent = null
    }

    return (
      <div>
        <Header />
        <div className="home-container">
          <HeaderLeft />
          <div className="home-content">
            {banner && (
              <div className="banner" data-testid="banner">
                <div className="banner-content">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="banner-logo"
                  />
                  <p className="banner-text">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button type="button" className="banner-button">
                    GET IT NOW
                  </button>
                </div>
                <button
                  onClick={this.closeBanner}
                  data-testid="close"
                  className="close-button"
                  aria-label="close"
                  type="button"
                >
                  <IoMdClose />
                </button>
              </div>
            )}

            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={search}
                onChange={this.handleSearchInput}
                onKeyPress={this.handleKeyPress}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.handleSearch}
                aria-label="search"
                data-testid="searchButton"
              >
                <FaSearch />
                Search
              </button>
            </div>

            {renderContent}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
