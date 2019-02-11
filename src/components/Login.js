import React from 'react';
import PropTypes from 'prop-types';

const Login = (props) => {
    return (
        <nav className="login">
            <h2>
                Inventory Login
            </h2>
            <p>
                Sign in to manage your store's inventory.
            </p>
            <button
                className="github"
                onClick={() => props.authenticate("Github")}
            >
                Log In With Github
            </button>
            <button
                className="facebook"
                onClick={() => props.authenticate("Facebook")}
            >
                Log In With Facebook
            </button>
            <button
                className="google"
                onClick={() => props.authenticate("Google")}
            >
                Log In With Google
            </button>
            {
                props.error && (
                    <p style={{ color: 'red' }}>
                        {props.error}
                    </p>
                )
            }
        </nav>
    );
};

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
    error: PropTypes.string
}

export default Login;