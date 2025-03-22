import {Component} from 'react'

import {IoMdClose} from 'react-icons/io'

import {FaSearch} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import {formatDistanceToNow} from 'date-fns'

import Cookies from 'js-cookie'

import Header from '../Header/index'

import VideoCard from '../VideoCard/index'

import HeaderLeft from '../HeaderLeft/index'

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

  getVideosData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchEle} = this.state
    const api = `https://apis.ccbp.in/videos/all?search=${searchEle}`
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      methode: 'GET',
    }
    const response = await fetch(api, options)
    if (response.ok) {
      const details = await response.json()
      console.log(details)
      const updatedData = details.videos.map(each => ({
        id: each.id,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        publishedAt: formatDistanceToNow(new Date(each.published_at)),
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log('Updated Data : ', updatedData)
      this.setState({data: updatedData, apiStatus: apiStatusConstants.success})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  InputEle = event => {
    this.setState({search: event.target.value})
  }

  searchInput = () => {
    const {search} = this.state
    this.setState({searchEle: search}, this.getVideosData)
  }

  closeBanner = () => {
    this.setState({banner: false})
  }

  renderSuccessView() {
    const {data} = this.state
    return (
      <div>
        {data.length === 0 ? (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <h1>No Search results found</h1>
            <p>Try different key words or remove search filter</p>
            <button onClick={this.retryData} type="button">
              Retry
            </button>
          </div>
        ) : (
          <ul className="videos-list">
            {data.map(each => (
              <VideoCard info={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {banner, search, searchEle, apiStatus} = this.state
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

    console.log(searchEle)
    return (
      <div>
        <Header />
        <div className="Home">
          <HeaderLeft />
          <div className="Home-body">
            {banner && (
              <div className="banner" data-testid="banner">
                <div
                  className="banner-bg"
                  style={{backgroundImage: `url(${bannerImageUrl})`}}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="nxt watch logo"
                    className="logo"
                  />
                  <p>Buy Nxt Watch Premium prepaid plans with upi</p>
                  <button type="button">GET IT NOW</button>
                </div>
                <div>
                  <button
                    onClick={this.closeBanner}
                    data-testid="close"
                    className="close-but"
                    aria-label="close"
                    type="button"
                  >
                    <IoMdClose />
                  </button>
                </div>
              </div>
            )}
            <div className="search-div">
              <input type="search" onChange={this.InputEle} value={search} />
              <button
                aria-label="search"
                data-testid="searchButton"
                type="button"
                onClick={this.searchInput}
              >
                <FaSearch />
              </button>
            </div>
            <div>{renderContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
