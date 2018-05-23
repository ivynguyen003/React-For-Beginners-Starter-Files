import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  myInput = React.createRef();

  gotoStore = (event) => {
    /*{prevent window from reload}*/
    event.preventDefault();
    /*{get the value of input}*/
    const storeName= this.myInput.value.value;
    /*{set the url to /the input value}*/
    this.props.history.push(`/store/${storeName}`);
    
  } 

  render() {
    return (
      <form className="store-selector" onSubmit={this.gotoStore}>
        <h2>Enter A Store Name</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

export default StorePicker;