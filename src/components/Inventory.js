import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';


class Inventory extends Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        addFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    }
    state = {
        uid: null,
        owner: null,
        error: null
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }
    authHandler = async (authData) => {
        // 1. Look up the current store in the Firebase DB
        const store = await base.fetch(this.props.storeId, { context: this });
        // 2. Claim if there is no owner
        if (!store.owner) {
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the State of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid,
            error: null
        });
    }
    errorHandler = async(error) => {
        console.log("Then", error);
        this.setState({
            error: error.message
        });
    }
    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
            .catch(this.errorHandler);
    }
    logout = async () => {
        console.log('Logging out!');
        await firebase.auth().signOut();
        this.setState({ uid: null, error: null });
    }
    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        // 1. Check if they are not logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} error={this.state.error} />;
        }
        // 2. Check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>
                        Sorry you are not the owner!
                    </p>
                    {logout}
                </div>
            );
        }
        // 3. They must be the owner, just render the inventory
        return (
            <div className="inventory">
                <h2>
                    Inventory
                </h2>
                { logout }
                { Object.keys(this.props.fishes).map( key =>  (
                    <EditFishForm
                        fish={this.props.fishes[key]}
                        key={key}
                        index={key}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />)
                ) }
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;