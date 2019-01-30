import React, { Component } from 'react';

class EditFishForm extends Component {
    handleChange = event => {
        // update that fish
        // 1. take a copy of the current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateFish(this.props.index, updatedFish);
    }
    render() {
        const {
            name,
            price,
            status,
            desc,
            image
        } = this.props.fish;
        return (
            <div className="fish-edit">
                <input
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    value={name}
                    placeholder="Name"
                />
                <input
                    name="price"
                    type="text"
                    onChange={this.handleChange}
                    value={price}
                    placeholder="Price"
                />
                <select name="status" value={status} onChange={this.handleChange}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea
                    name="desc"
                    onChange={this.handleChange}
                    value={desc}
                    placeholder="Desc"
                ></textarea>
                <input
                    name="image"
                    type="text"
                    onChange={this.handleChange}
                    value={image}
                    placeholder="Image"
                />
                <button onClick={() => this.props.deleteFish(this.props.index)}>
                    Remove Fish
                </button>
            </div>
        );
    }
}

export default EditFishForm;