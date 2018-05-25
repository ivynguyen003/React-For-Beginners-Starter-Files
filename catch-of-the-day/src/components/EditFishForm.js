import React from "react";
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  static propTypes = {
    updatedFish: PropTypes.func,
    deleteFish: PropTypes.func,
    fish:PropTypes.shape({
      image: PropTypes.string,
      desc: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
      status: PropTypes.string
    }),
    index: PropTypes.string
  };

  handleChange = event => {
    //update that fish
    //1.copy current fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          onChange={this.handleChange}
          type="text"
          value={this.props.fish.name}
        />
        <input
          name="price"
          onChange={this.handleChange}
          type="text"
          value={this.props.fish.price}
        />

        <select
          name="status"
          onChange={this.handleChange}
          value={this.props.fish.status}
        >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc "
          onChange={this.handleChange}
          type="text"
          value={this.props.fish.desc}
        />
        <input
          name="image"
          onChange={this.handleChange}
          type="text"
          value={this.props.fish.image}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Delete
        </button>
      </div>
    );
  }
}

export default EditFishForm;
