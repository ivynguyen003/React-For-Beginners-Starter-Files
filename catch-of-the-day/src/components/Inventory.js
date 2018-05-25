import React from "react";
import firebase from "firebase";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import base from "../base";
import { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.shape({
      image: PropTypes.string,
      desc: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string
    }),
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({ user });
      }
    })
  }

  authHandler = async authData => {
    //1. look up current store on firebase
    const store = await base.fetch(this.props.storeID, { context: this }); //why fetch context:this?
    console.log(store);
    //2. claim store if no owner
    if (!store.owner) {
      //save it as owner
      await base.post(`${this.props.storeID}/owner`, {
        data: authData.user.uid
      });
    }
    //set state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
    console.log(authData);
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logout = async () =>{
    console.log('Logging Out');
    await firebase.auth().signOut();
    this.setState({uid:null});
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>

    //check if the owner is log in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    //check if they are the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    //they mus be owner
    return <div className="inventory">
        <h2>Inventory </h2>
        {logout}
        {Object.keys(this.props.fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>;
  }
}

export default Inventory;
