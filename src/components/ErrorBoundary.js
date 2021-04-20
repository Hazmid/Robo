import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }

  componentDidCatch (error, info) {
    this.setState({ hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return <h1>Ooops. Thats not good</h1>
    }
    return this.props.children
    // this.props.children is whatever errorBoundary is wrapping in App.js
  }
}

export default ErrorBoundary
