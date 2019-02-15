import React, {PureComponent} from 'react';
import Person from './Person/Person';


class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log("[Persons.js] inside constructor");
        this.lastPersonRef = React.createRef();
      }
    
      componentWillMount() {
        console.log("[Persons.js] inside ComponentWillMount()");
      }
    
      componentDidMount() {
        console.log("[Persons.js] inside ComponentDidMount()");
        this.lastPersonRef.current.focus();
      }

      componentWillReceiveProps(nextProps) {
        console.log("[UPDATE Persons.js] inside componentWillRecieveProps()",nextProps);
      }

    //   shouldComponentUpdate(nextProps,nextState) {
    //     console.log("[UPDATE Persons.js] inside shouldComponentUpdate()",nextProps,nextState);
    //     return nextProps.persons !== this.props.persons ;
    //   }

      componentWillUpdate(nextProps,nextState) {
        console.log("[UPDATE Persons.js] inside componentWillUpdate()",nextProps,nextState);
      }

      componentDidUpdate() {
        console.log("[UPDATE Persons.js] inside componentDidUpdate()");
      }

    render() {
        console.log("[Persons.js] inside render()");
        
        return this.props.persons.map((person,index) => {
            return <Person
              clickEvent = {() => this.props.clicked(index)}
              name={person.name} 
              position= {index}
              age={person.age}
              ref = {this.lastPersonRef} 
              key={person.id}
              changed={(event) => this.props.changed(event, person.id)} />
        });
    }
}



export default Persons;