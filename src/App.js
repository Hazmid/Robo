import React, {Component} from 'react';
import './App.css';
import CardList from './CardList';
import SearchBox from './SearchBox';
import { robots } from './robots';

//class style: 'this' for all functions and states
class App extends Component {
  constructor(){
    super();
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }

  //added arrows so 'this' is for this class, and not for input
  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value})
  }

  render() {
      const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    })
    return (
      <div className='tc'>
        <h1>RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList robots={filteredRobots} />
      </div>
    );
  }
}

export default App;

//  notes
// the former CardList component was the state: <CardList robots={this.state.robots} />
