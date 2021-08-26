import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

function Cart() {
    const history = useHistory();

    const goToCheckout = () => {
        try {
            history.push('/checkout');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="cart">
            <div className="cartHeader">
                <h2>Shopping Cart</h2>
            </div>
            <div className="cart_feed">
                <div className="cart_home">
                    <p>1 Course in Cart</p>

                    <div className="cartHome_body">
                        <Link
                            to={'/courseDetails'}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="cartHome_Image">
                                <div className="home_img">
                                    <img
                                        width="130"
                                        height="80"
                                        src="https://img-c.udemycdn.com/course/240x135/3124072_2957_8.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="cart_description">
                                    <p className="cart_description_p">
                                        The Python Mega Course: Build 10 Real
                                        World Applications
                                    </p>
                                    <h3>uttam</h3>
                                </div>
                            </div>
                        </Link>
                        <div className="price">
                            <p>₹499</p>
                            <h3>Remove</h3>
                        </div>
                    </div>
                </div>
                <div className="cart_checkout">
                    <p>Total:</p>
                    <div className="cart_price">
                        <h3>₹499</h3>
                        <button onClick={goToCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
