import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {FaFire} from 'react-icons/fa'

import {formatDistanceToNow} from 'date-fns'

import Cookies from 'js-cookie'

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

class Trending extends Component {
  state = {data: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  retryData = () => {
    this.getTrendingVideos()
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

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const api = `https://apis.ccbp.in/videos/trending`
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

  renderSuccessView() {
    const {data} = this.state
    return (
      <ul className="videos-list-trending">
        {data.map(each => (
          <VideoCard1 info={each} key={each.id} type="Trending" />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
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
        <div className="Home">
          <HeaderLeft />
          <div className="Home-body">
            <h1 className="h-trending">
              <FaFire className="symbol-trending" />
              Trending
            </h1>
            <div>{renderContent}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Trending
