import React from 'react';
import './login.css';
import Fire from "../../config/fire"


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: true
        }
    }

    gotoSignUp = () => {
        this.setState({ isLogin: !this.state.isLogin }, () => {
            this.render();
        });

    }

    signUp() {
        const fname = document.querySelector('#fname').value;
        const mobile = document.querySelector('#mobile').value;
        const email = document.querySelector('#emailId').value;
        const password = document.querySelector('#pass').value;
        Fire.auth().createUserWithEmailAndPassword(email, password)
            .then((u) => {
                console.log('Successfully Signed Up');
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })

        var databaseRef = Fire.database().ref('users/');
        databaseRef.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
            });
        });


        var uid = Fire.database().ref().child('users').push().key;

        var data = {
            user_id: uid,
            fname: fname,
            mobile: mobile,
            email: email,
            password: password,
            sq1:'',
            sq2:'',
            sq3:'',
            dob:'',
            add:''
        }

        var updates = {};
        updates['/users/' + uid] = data;
        Fire.database().ref().update(updates);
        console.log("inserted")
    }

    login() {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        Fire.auth().signInWithEmailAndPassword(email, password)
            .then((u) => {
                console.log('Successfully Logged In');
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
    }
    render() {
        return (
            <div className="main-sign-in-up-sec">
                <div className="left-side-banner">
                    <div className="center-banner-text">
                        <div>
                            <h2>Lorem Ipsum is simply dummy text</h2>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>

                        </div>
                    </div>
                </div>
                <div className="right-side-form-sec">
                    {
                        this.state.isLogin &&

                        <div className="sign-in">
                            <div className="form-top-logo">
                                <span>Sign in to your account</span>
                            </div>
                            <div className="form-field-sec">
                                <div className="form-row">
                                    <input type="text" id="email" className="form-input-box" placeholder="Email Id" />
                                    <i className="far fa-envelope"></i>
                                </div>
                                <div className="form-row">
                                    <input type="text" id="password" className="form-input-box" placeholder="Password" />
                                    <i className="fas fa-unlock-alt"></i>
                                    <a href="#" className="forgot-password">Forgot your password?</a>
                                </div>
                                <div className="form-row form-submit-dv">
                                    <a className="form-submit-btn" onClick={this.login}>sign in</a>
                                </div>
                                <div className="form-row forgot-link">
                                    Don't have an account? <a onClick={this.gotoSignUp} className="go-to-signup">sign up now</a>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        !this.state.isLogin &&
                        <div className="sign-up">
                            <div className="top-left-link"><a onClick={this.gotoSignUp}>back to sign</a></div>
                            <div className="form-top-logo">
                                <span>Create free account</span>
                            </div>
                            <div className="form-field-sec">
                                <div className="form-row">
                                    <input type="text" id="fname" className="form-input-box" placeholder="Full Name" />
                                    <i className="far fa-user"></i>
                                </div>
                                <div className="form-row">
                                    <input type="text" id="emailId" className="form-input-box" placeholder="Email Id" />
                                    <i className="far fa-envelope"></i>
                                </div>
                                <div className="form-row">
                                    <input type="text" id="mobile" className="form-input-box" placeholder="Mobile No." />
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div className="form-row">
                                    <input type="text" id="pass" className="form-input-box" placeholder="Password" />
                                    <i className="fas fa-unlock-alt"></i>
                                </div>
                                <div className="form-row">
                                    <input type="text" id="cpass" className="form-input-box" placeholder="Confirm Password" />
                                    <i className="fas fa-unlock-alt"></i>
                                </div>
                                <div className="form-row">
                                    <div className="custom-checkbox-main">
                                        <label className="custom-checkbox">
                                            <strong>Agree to the terms of conditions and to emails. </strong>
                                            <input type="checkbox" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                                <div className="form-row form-submit-dv">
                                    <a className="form-submit-btn" onClick={this.signUp}>sign up</a>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="clr"></div>

                </div>
            </div>
        );
    }
}

export default Login;
