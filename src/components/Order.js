import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Order extends Component {
    renderOrder = (key) => {
        // retrieve the fish
        const fish = this.props.fishes[key];
        // retrieve the number of items per fish in the order
        const count = this.props.order[key];
        // check if the fish is available
        const isAvailable = fish && fish.status === 'available';
        // Make sure the fish is loaded before we contine
        if (!fish) return null;
        if (!isAvailable) {
            return (
                <li key={key}>
                    Sorry { fish ? fish.name : 'fish' } is no longer available
                </li>
            );
        }
        return (
            <li key={key}>
                {count} lbs {fish.name}
                { formatPrice(count * fish.price) }
                <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
            </li>
        );
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            // retrieve the fish
            const fish = this.props.fishes[key];
            // retrieve the number of items per fish in the order
            const count = this.props.order[key];
            // check if the fish is not deleted and it's still available
            const isAvailable = fish && fish.status === 'available';
            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>
                    Order
                </h2>
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total:
                    <strong> {formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;