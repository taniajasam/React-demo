import React, { Component } from 'react';

//Stateless Method because its returning function not JSX.

// const withClass = (WrappedComponent,className) =>  {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     );
// }

// Stateful Component returning class but with no name as it is used to wrap the components.

const withClass = (WrappedComponent,className) =>  {
    const WithClass = class extends Component {
        render() {
            return (
                <div className={className}>
                <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
            </div>
            ); 
        }
    }
    return React.forwardRef((props, ref) => {
        return <WithClass {...props} forwardedRef={ref} />
    });
}

export default withClass;