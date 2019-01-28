import React, { Component } from 'react';

class EditFishForm extends Component {
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
                <input name="name" type="text" value={name} placeholder="Name" />
                <input name="price" type="text" value={price} placeholder="Price" />
                <select name="status" value={status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={desc} placeholder="Desc"></textarea>
                <input name="image" type="text" value={image} placeholder="Image" />
            </div>
        );
    }
}

export default EditFishForm;