import React from 'react';
import fire from '../../config/fire';
import '../Login/login.css';
import EditUser from './editUser'
import profile from '../images/profile.jpg'

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showModal: false
        };
    }

    componentDidMount() {
        const db = fire.database().ref();
        const user = db.child('users')
        user.on('value', (childSnapshot) => {
            childSnapshot.forEach((doc) => {
                if (this.props.user.email == doc.toJSON().email) {
                    console.log(doc.toJSON())
                    this.setState({ user: doc.toJSON() }, () => {
                        this.render();
                    });
                }
            })
        })

    }

    logout() {
        fire.auth().signOut();
    }

    setModalShow = () => {
        this.setState({ modalShow: true }, () => {
            this.render();
        });
    }

    onHide = () => {
        this.setState({ modalShow: false }, () => {
            this.render();
        });
    }

    render() {
        return (
            <div>
                <div className="hero-banner">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg is-navbar">
                            <a className="navbar-brand" href="#"><img src="images/logo.png" /></a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Features</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Pricing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            Contact
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a onClick={this.logout} className="nav-link" href="#">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div className="hero-txt">
                            <div>
                                <h2>This is {this.state.user && this.state.user.fname}</h2>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <a className="comman-btn" href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="user-profile-sec">
                    <div className="container">
                        <div className="sec-header">
                            <div className="profile-info-txt">User Profile Information</div>
                            <div className="profile-logout-btn"><a onClick={this.logout}>Logout <i className="fas fa-sign-out-alt"></i></a></div>
                        </div>
                        <div className="user-profile-main">
                            <div className="profile-header sec-header border-design">
                                <div className="profile-info-txt">Personal Information</div>
                                <div className="profile-logout-btn">All fields with <span className="dot"></span> are required.</div>
                                <div className="edit-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.setModalShow}><i className="fas fa-pencil-alt"></i></div>
                                {
                                    this.state.user &&
                                    <EditUser show={this.state.modalShow}
                                        onHide={this.onHide} data={this.state.user} />
                                }
                            </div>
                            <div className="profile-body">
                                <div className="mb-4  pb-4 border-design">
                                    <div className="user-img-sec">
                                        <div className="user-img"><img src={profile} /></div>
                                    </div>
                                </div>
                                <div className="user-form-sec form-field-sec">
                                    <div className="row m-0">
                                        <div className="col-xl-6">
                                            <div className="form-row">
                                                <label> <i className="fas fa-phone-alt"></i>Phone Number</label>
                                                <div className="position-relative">
                                                    <label className="lblText">{this.state.user && this.state.user.mobile}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-row">
                                                <label className="floatLeft"><span className="far fa-envelope"></span>Email Id</label>
                                                <div className="position-relative">
                                                    <label className="lblText">{this.state.user && this.state.user.email}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-row">
                                                <label className="floatLeft"><span className="fas fa-calendar-alt"></span>Date of birth</label>
                                                <div className="position-relative">
                                                    <label className="lblText">{this.state.user && this.state.user.dob}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-row">
                                                <label className="floatLeft"><span className="fas fa-lock"></span>Security Question 1</label>
                                                <div className="position-relative">
                                                    <label className="lblText">{this.state.user && this.state.user.sq1}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-row">
                                                <label className="floatLeft"><span className="fas fa-lock"></span>Security Question 2</label>
                                                <div className="position-relative">
                                                    <label className="lblText">{this.state.user && this.state.user.sq2}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="form-row">
                                                <label className="floatLeft"><span className="fas fa-lock"></span>Security Question 3</label>
                                                <div className="position-relative">
                                                    <label className="lblText">{this.state.user && this.state.user.sq3}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-12">
                                            <div className="form-row">
                                                <label className="floatLeft"><span className="fas fa-envelope-open"></span>Address</label>
                                                <div className="position-relative">
                                                <label className="lblText" rows="5">{this.state.user && this.state.user.add}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-design divider"></div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <footer className="main-footer">
                    <div className="container">
                        <div className="footer-col">
                            {/* <img src="images/logo.png"> */}
                            <div className="social-media contact-media footer-media">
                                <ul>
                                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="dv-copyright"> ©2020. All rights reserved. </div>
                </footer>
            </div>
        )
    }
}

export default Home;