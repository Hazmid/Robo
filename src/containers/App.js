import React, { Component } from 'react'
import './App.css'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import { connect } from 'react-redux'
import { setSearchField, requestRobotsACT } from '../actions'

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
    //all initialStates matched to their corresponding reducers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobotsACT())
  }
}

class App extends Component {
  componentDidMount () {
    this.props.onRequestRobots()
  }

  render () {
    const { searchField, onSearchChange, robots, isPending } = this.props

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase())
    })

    return isPending ? (
      <h1 className='tc'>Loading...</h1>
    ) : (
      <div className='tc'>
        <h1 className='f1'>Personal Robots</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
