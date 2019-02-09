import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    }
    renderOrder = (key) => {
        // retrieve the fish
        const fish = this.props.fishes[key];
        // retrieve the number of items per fish in the order
        const count = this.props.order[key];
        // check if the fish is available
        const isAvailable = fish && fish.status === 'available';
        // Make sure the fish is loaded before we contine
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };
        if (!fish) return null;
        if (!isAvailable) {
            return (
                <CSSTransition
                    {...transitionOptions}
                >
                    <li key={key}>
                        Sorry { fish ? fish.name : 'fish' } is no longer available
                    </li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition
                {...transitionOptions}
            >
                <li key={key}>
                    <span>
                        <TransitionGroup
                            component="span"
                            className="count"
                        >
                            <CSSTransition
                                {...transitionOptions}
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name}
                        { formatPrice(count * fish.price) }
                        <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>
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
                <TransitionGroup
                    component="ul"
                    className="order"
                >
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong> {formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;