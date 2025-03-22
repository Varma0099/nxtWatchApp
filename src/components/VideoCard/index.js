import {Link} from 'react-router-dom'
import './index.css'

const VideoCard = props => {
  const {info} = props
  console.log(info)
  const {
    id,
    channel,
    publishedAt,
    thumbnailUrl,
    title,
    viewCount,
    profileImageUrl,
    name,
  } = info
  return (
    <Link to={`/videos/${id}`} className="class-li-link">
      <li className="list-videos">
        <img src={thumbnailUrl} alt="video thumbnail" className="img-videos" />

        <div className="descr">
          <img src={profileImageUrl} alt="channel logo" className="logo-img" />
          <div>
            <p>{name}</p>
            <p>{title}</p>
            <p>{channel}</p>
            <div className="li-view">
              <p className="li1">{viewCount} Views</p>

              <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideoCard
