import {Link} from 'react-router-dom'

import './index.css'

const VideoCard1 = props => {
  const {info, type} = props
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
  console.log(profileImageUrl)
  return (
    <div>
      {type !== 'Gaming' ? (
        <Link to={`/videos/${id}`} className="class-li-link">
          <li className="list-videos-trending">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="img-videos-trending"
            />

            <div className="descr">
              <div>
                <p>{title}</p>
                <p>{channel}</p>

                <p>{name}</p>
                <div className="li-view-trending">
                  <p className="li1">{viewCount} Views</p>

                  <p>{publishedAt}</p>
                </div>
              </div>
            </div>
          </li>
        </Link>
      ) : (
        <Link to={`/videos/${id}`} className="class-li-link">
          <li className="list-videos-gaming">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="img-videos-trending"
            />
            <div>
              <p>{title}</p>
              <p>{viewCount} Watching Worldwide</p>
            </div>
          </li>
        </Link>
      )}
    </div>
  )
}

export default VideoCard1
