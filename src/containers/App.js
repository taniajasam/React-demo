import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../HigherOrderComponents/withClass';
import Aux from '../HigherOrderComponents/Aux';

export const AuthContext = React.createContext(false);

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] inside constructor");
    this.state = {
      persons: [
        { 
          id: 'ABC',
          name: 'Tania',
          age: 26
        },
        {
          id: 'DEF',
          name: 'Pallav',
          age: 26
        },
        {
          id: 'GHI',
          name: 'Sushant',
          age: 27 
        }
      ],
      showPersons: false,
      toggleClicked: 0,
      authenticated:false
    }
  }

  componentWillMount() {
    console.log("[App.js] inside ComponentWillMount()");
  }

  componentDidMount() {
    console.log("[App.js] inside ComponentDidMount()");
  } 

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("[Derived App.js] inside getDerivedStateFromProps()",nextProps,prevState);
    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log("[Snapshot App.js] inside getSnapshotBeforeUpdate()");
  }

  // state = {
  //   persons: [
  //     { 
  //       id: 'ABC',
  //       name: 'Tania',
  //       age: 26
  //     },
  //     {
  //       id: 'DEF',
  //       name: 'Pallav',
  //       age: 26
  //     },
  //     {
  //       id: 'GHI',
  //       name: 'Sushant',
  //       age: 27 
  //     }
  //   ],
  //   showPersons: false
  // }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); // slice() without arguments creates the copy of array. Below is Spread operator that is also used to create copy of array.
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});

    // this.setState({
    //   persons: [
    //     {
    //       name: "Tania Jasam",
    //       age: 26
    //     },
    //     {
    //       name: event.target.value,
    //       age: 26
    //     },
    //     {
    //       name: 'Sushant Alone',
    //       age: 27
    //     }
    //   ]
    // })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated:true});
  }

  render() {
    console.log("[app.js] inside render()");
    
    let persons = null;
    

    if (this.state.showPersons) {
      persons = (
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />
      );
      
    }

   
    return (
      <Aux>
        <Cockpit showPersons={this.state.showPersons}
        appTitle = {this.props.title}
        persons = {this.state.persons}
        login = {this.loginHandler}
        clicked = {this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
        {persons}   
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App) ;
 