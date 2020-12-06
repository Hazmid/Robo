import React, {Component} from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import { connect } from 'react-redux';
import { setSearchField, requestRobotsACT } from '../actions';


const mapStateToProps = state => {
  return{
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error
    //all initialStates matched to their corresponding reducers
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobotsACT())
  }
} 



class App extends Component {
  
  componentDidMount(){
    this.props.onRequestRobots();
  }

  render() {

    const { searchField, onSearchChange, robots, isPending } = this.props;

    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })


    return isPending ?
    <h1 className="tc">Loading...</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboBastards</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundary>
            <CardList robots={filteredRobots} />
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



 
//  notes

// formerly <CardList robots={this.state.robots} />

// removed import Robots from './Robots' ... since our users come from an api now

//class style: 'this' for all functions and states

  // //onSearchChange is a method of App... added arrows so 'this' is for this class, and not for input
  // onSearchChange = (event) => {
  //   this.setState({searchfield: event.target.value})
  // }

  // searchfield: '' state is removed cos theres state in a reducer

  //formerly--- <SearchBox searchChange={this.onSearchChange} />

  //formerly--- componentDidMount(){
                  //fetch('https://jsonplaceholder.typicode.com/users')
                    //.then(response => response.json())
                    //.then(users => this.setState({robots: users}));
                    // }

 //deleted---         //constructor(){
            //super();
            //this.state = {
              //robots: []
            //}
          //}

   //deleted---    const { robots } = this.state;
               