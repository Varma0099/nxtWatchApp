import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import VideoDetails from './components/VideoDetails'
import NotFound from './components/NotFound'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import ProtectedRoute from './components/ProtectedRoute'
import SavedContext from './Context/SavedContext'

import './App.css'

class App extends Component {
  state = {savedList: []}

  addRemoveSavedItem = data => {
    console.log('saved Data : ', data)
    this.setState(prevState => {
      const {savedList} = prevState
      if (data.saved) {
        const isAlreadySaved = savedList.some(each => each.id === data.id)
        if (isAlreadySaved) {
          return {savedList}
        }
        return {savedList: [...savedList, data]}
      }
      const updatedList = savedList.filter(each => each.id !== data.id)
      return {savedList: updatedList}
    })
  }

  render() {
    const {savedList} = this.state
    return (
      <BrowserRouter>
        <SavedContext.Provider
          value={{
            savedList,
            addRemoveSavedItem: this.addRemoveSavedItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </SavedContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
