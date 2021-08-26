import React from 'react';
import './style.css';

function Checkout() {
    return (
        <div className="checkout">
            <div className="checkout_header">
                <h1>Checkout</h1>
                <div>
                    <form action="">
                        <div className="form">
                            <div className="formBox">
                                <label>Billing Address</label>
                                <div className="formAddr">
                                    <div className="formCountry">
                                        <select>
                                            <option>Country</option>
                                            <option value="IND">India</option>
                                        </select>
                                    </div>
                                    <div className="formState">
                                        <select>
                                            <option>State</option>
                                            <option value="ANP">
                                                Andhra Pradesh
                                            </option>
                                            <option value="ACP">
                                                Arunachal Pradesh
                                            </option>
                                            <option value="AS">
                                                Asom (Assam)
                                            </option>
                                            <option value="BI">Bihar</option>
                                            <option value="KR">
                                                Karnataka
                                            </option>
                                            <option value="KA">Kerala</option>
                                            <option value="CH">
                                                Chhattisgarh
                                            </option>
                                            <option value="UP">
                                                Uttar Pradesh
                                            </option>
                                            <option value="GOA">Goa</option>
                                            <option value="GJ">Gujarat</option>
                                            <option value="HN">Haryana</option>
                                            <option value="HP">
                                                Himachal Pradesh
                                            </option>
                                            <option value="JK">
                                                Jammu and Kashmir
                                            </option>
                                            <option value="JH">
                                                Jharkhand
                                            </option>
                                            <option value="WB">
                                                West Bengal
                                            </option>
                                            <option value="MP">
                                                Madhya Pradesh
                                            </option>
                                            <option value="MH">
                                                Maharashtra
                                            </option>
                                            <option value="MI">Manipur</option>
                                            <option value="ML">
                                                Meghalaya
                                            </option>
                                            <option value="MZ">Mizoram</option>
                                            <option value="NL">Nagaland</option>
                                            <option value="OR">Orissa</option>
                                            <option value="PB">Punjab</option>
                                            <option value="RJ">
                                                Rajasthan
                                            </option>
                                            <option value="SI">Sikkim</option>
                                            <option value="TN">
                                                Tamil Nadu
                                            </option>
                                            <option value="TL">
                                                Telangana
                                            </option>
                                            <option value="TI">Tripura</option>
                                            <option value="UK">
                                                Uttarakhand
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="paymentMethod">
                                <label>Credit or Debit Card</label>
                                <div className="creditDetails">
                                    <input
                                        type="text"
                                        placeholder="Name on card"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                    />
                                    <div className="expireDate">
                                        <div className="months">
                                            <select>
                                                <option value="MM">MM</option>
                                                <option value="01">01</option>
                                                <option value="02">02</option>
                                                <option value="03">03</option>
                                                <option value="04">04</option>
                                                <option value="05">05</option>
                                                <option value="06">06</option>
                                                <option value="07">07</option>
                                                <option value="08">08</option>
                                                <option value="09">09</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                        </div>
                                        <div className="years">
                                            <select>
                                                <option>YYYY</option>
                                                <option value="2021">
                                                    2021
                                                </option>
                                                <option value="2022">
                                                    2022
                                                </option>
                                                <option value="2023">
                                                    2023
                                                </option>
                                                <option value="2024">
                                                    2024
                                                </option>
                                                <option value="2025">
                                                    2025
                                                </option>
                                                <option value="2026">
                                                    2026
                                                </option>
                                                <option value="2027">
                                                    2027
                                                </option>
                                                <option value="2028">
                                                    2028
                                                </option>
                                                <option value="2029">
                                                    2029
                                                </option>
                                                <option value="2030">
                                                    2030
                                                </option>
                                                <option value="2031">
                                                    2031
                                                </option>
                                            </select>
                                        </div>
                                        <div className="creditCode">
                                            <input
                                                type="text"
                                                placeholder="Code"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="checkout_footer">
                    <h2>Order Details</h2>
                    <div className="checkout_footerDetail">
                        <p>Name</p>
                        <p>Price</p>
                    </div>
                </div>
            </div>
            <div className="checkout_Sidebar">
                <h2>Summary</h2>
                <div className="checkout_footerDetail">
                    <p>Total</p>
                    <p>₹200</p>
                </div>
                <button>Completed Payment</button>
            </div>
        </div>
    );
}

export default Checkout;
