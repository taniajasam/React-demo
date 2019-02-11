import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
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
    showPersons: false
  }

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
    this.setState({showPersons: !doesShow});
  }

  render() {
    const buttonStyle = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person
              clickEvent = {() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div> 
      );
      buttonStyle.backgroundColor = 'red';
      buttonStyle[':hover'] = {
        backgroundColor: 'salmon',
        color:'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
        <div className="App">
        <h1>Let's start</h1>
        <p className={classes.join(' ')}>Hey there!</p>
        <button 
        style={buttonStyle}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}        
      </div>
      
    );
  }
}

export default App;
 