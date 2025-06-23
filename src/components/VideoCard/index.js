import {Link} from 'react-router-dom'
import {FaRegDotCircle, FaPlayCircle} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const VideoCard = ({videoData}) => {
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = videoData

  return (
    <Link to={`/videos/${id}`} className="video-card">
      <div className="video-thumbnail-container">
        <img src={thumbnailUrl} alt={title} className="video-thumbnail" />
        <span className="play-overlay">
          <FaPlayCircle size={38} color="#fff" />
        </span>
      </div>
      <div className="video-content">
        <img
          src={channel.profileImageUrl}
          alt={channel.name}
          className="channel-logo"
        />
        <div className="video-details">
          <h3 className="video-title">{title}</h3>
          <p className="channel-name">{channel.name}</p>
          <div className="video-stats">
            <span>{viewCount} views</span>
            <FaRegDotCircle size={8} />
            <span>{formatDistanceToNow(new Date(publishedAt))} ago</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
