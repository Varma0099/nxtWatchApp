import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import ReactPlayer from 'react-player'

import {formatDistanceToNow} from 'date-fns'

import HeaderLeft from '../HeaderLeft/index'

import SavedContext from '../../Context/SavedContext'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoDetails extends Component {
  state = {
    videoData: {},
    apiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisLiked: false,
    saved: false,
  }

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const details = await response.json()
      const updatedData = {
        subscriberCount: details.video_details.channel.subscriber_count,
        id: details.video_details.id,
        name: details.video_details.channel.name,
        profileImageUrl: details.video_details.channel.profile_image_url,
        publishedAt: formatDistanceToNow(
          new Date(details.video_details.published_at),
        ),
        thumbnailUrl: details.video_details.thumbnail_url,
        videoUrl: details.video_details.video_url,
        description: details.video_details.description,
        title: details.video_details.title,
        viewCount: details.video_details.view_count,
      }

      this.setState({
        videoData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  saveButton = () => {
    const {saved, isLiked, isDisLiked, videoData} = this.state
    const {addRemoveSavedItem} = this.context

    console.log('Save button Triggered')

    this.setState(
      prevState => ({
        saved: !prevState.saved,
      }),
      () => {
        // Get the updated saved value from state
        const {saved: updatedSaved} = this.state
        addRemoveSavedItem({
          ...videoData,
          isLiked,
          isDisLiked,
          saved: updatedSaved,
        })
      },
    )
  }

  likeButton = () => {
    const {isLiked, isDisLiked} = this.state
    this.setState({
      isLiked: !isLiked,
      isDisLiked: isLiked ? isDisLiked : false,
    })
  }

  dislikeButton = () => {
    const {isLiked, isDisLiked} = this.state
    this.setState({
      isDisLiked: !isDisLiked,
      isLiked: isDisLiked ? isLiked : false,
    })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
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

  renderProductDetailsView = () => {
    const {videoData, isDisLiked, isLiked, saved} = this.state
    const {savedList} = this.context

    const [check] = savedList.filter(each => each.id === videoData.id)
    const data = check || videoData

    const {
      name,
      title,
      videoUrl,
      publishedAt,
      profileImageUrl,
      viewCount,
      subscriberCount,
      description,
    } = data

    return (
      <div className="bg-detail">
        <ReactPlayer url={videoUrl} />
        <p>{title}</p>
        <div>
          <div className="info">
            <div className="info-div">
              <p className="info-p">{viewCount} Views</p>
              <p>{publishedAt}</p>
            </div>
            <div className="info-div">
              <button
                className={isLiked ? 'Active' : 'inActive'}
                type="button"
                onClick={this.likeButton}
              >
                Like
              </button>
              <button
                className={isDisLiked ? 'Active' : 'inActive'}
                type="button"
                onClick={this.dislikeButton}
              >
                Dislike
              </button>
              <button
                className={saved ? 'Active' : 'inActive'}
                type="button"
                onClick={this.saveButton}
              >
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          <hr />

          <div className="info-div">
            <img
              src={profileImageUrl}
              alt="channel logo"
              className="logo-img"
            />
            <div>
              <p>{name}</p>
              <p>{subscriberCount} subscribers</p>
            </div>
          </div>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="Home">
          <HeaderLeft />
          <div className="Home-body">
            <div> {this.renderProductDetails()}</div>
          </div>
        </div>
      </div>
    )
  }
}

VideoDetails.contextType = SavedContext

export default VideoDetails
