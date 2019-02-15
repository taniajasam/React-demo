import React,{Component} from 'react';
import classes from './Person.css';
import withClass from '../../../HigherOrderComponents/withClass';
import Aux from '../../../HigherOrderComponents/Aux';
import PropTypes from 'prop-types';
import {AuthContext} from '../../../containers/App';


class Person extends Component {
    constructor(props) {
        super(props);
        console.log("[Person.js] inside constructor");
        this.inputElement = React.createRef();
      }
    
      componentWillMount() {
        console.log("[Person.js] inside ComponentWillMount()");
      }
    
      componentDidMount() {
        console.log("[Person.js] inside ComponentDidMount()");
        if(this.props.position === 0) {
          this.inputElement.current.focus();
        }
      }

    focus() {
      this.inputElement.current.focus();
    }

    render() {
        console.log("[Person.js] inside render())");
        return (
          <Aux>
            <AuthContext.Consumer>
            {auth =>  auth ? <p>I'm authenticated</p>: null}
            </AuthContext.Consumer>
            <p onClick={this.props.clickEvent}>I'm {this.props.name} and I am {this.props.age} years old.</p>
            <p>{this.props.children}</p>
            <input ref={this.inputElement} type="text" onChange={this.props.changed} value={this.props.name}/>
          </Aux>
        )
    }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

// export default Person;

export default withClass(Person, classes.Person_Details);  

/*
  Notes:

  1. ref that is called within input field, that is called for stateful components that means only for classes.
  2. For custom components that are stateless, for that also we have something to do with input field.
  3. Try not to change styling within ref method invocation. Though it will work but its not the correct methofd to do so, for that we have learned other things.
  4. ref is used mostly for focus and media things not for element styling.
*/