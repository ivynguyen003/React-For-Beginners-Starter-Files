import React from "react";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  addFish = fish => {
    //copy existing fishes
    const fishes = { ...this.state.fishes };
    //add new fish
    fishes[`fishes${Date.now()}`] = fish;
    //set state
    this.setState(fishes);
  };

componentDidMount() {
  const { params } = this.props.match;
  const localStorageItem = localStorage.getItem(params.storeID);
  if(localStorageItem){
  this.setState({ order: JSON.parse(localStorageItem)});
  }
  this.ref = base.syncState(`${params.storeID}/fishes`, {
    context:this,
    state:"fishes"
  });
  
}

componentDidUpdate(){
  console.log(this.state.order)
  localStorage.setItem(this.props.match.params.storeID,JSON.stringify(this.state.order));
}

componentWillUnmount(){
  base.removeBinding(this.ref);
  console.log('unmount');
};

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = (key) => {
    //copy the existing state
    const order={ ...this.state.order };
    //add to order or update number
    order[key] = order[key] + 1 || 1;
    //call setState to update the State
    this.setState({order});
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
          {Object.keys(this.state.fishes).map(key => <Fish 
          key={key} 
          index={key}
          details={this.state.fishes[key]} 
          addToOrder={this.addToOrder} />)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory 
        addFish={this.addFish} 
        loadSampleFishes={this.loadSampleFishes} />
      </div>
    );
  }
}

export default App;
