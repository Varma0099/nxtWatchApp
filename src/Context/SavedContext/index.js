import React from 'react'

const SavedContext = React.createContext({
  savedList: [],
  addRemoveSavedItem: () => {},
})

export default SavedContext
