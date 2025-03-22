import {Component} from 'react'

import Cookies from 'js-cookie'

class VideosList extends Component {
  componentDidMount() {
    this.getVideosData()
  }

  getVideosData = async () => {
    const data = this.props
    console.log(data)
    const {listType, saerchData} = data
    console.log('Out SEarch ', saerchData)
    console.log(listType)
    let api = ''
    if (listType === 'all') {
      api = `https://apis.ccbp.in/videos/all?search=${saerchData}`
    } else {
      api = `https://apis.ccbp.in/videos/${listType}`
    }
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      methode: 'GET',
    }
    const response = await fetch(api, options)
    const details = await response.json()
    console.log(details)
  }

  render() {
    return <h1>Fetching Videos ....</h1>
  }
}

export default VideosList
