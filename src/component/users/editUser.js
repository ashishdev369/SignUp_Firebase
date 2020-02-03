import React from 'react';
import { Modal } from 'react-bootstrap';
import Fire from "../../config/fire"

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: this.props.show, 
                       data: this.props.data,
                       user:{mobile:this.props.data && this.props.data.mobile?this.props.data.mobile:'',
                       firstName:this.props.data && this.props.data.fname?this.props.data.fname:'',
                       email:this.props.data && this.props.data.email?this.props.data.email:'',
                       dob:this.props.data && this.props.data.dob?this.props.data.dob:'',
                       sq1:this.props.data && this.props.data.sq1?this.props.data.sq1:'',
                       sq2:this.props.data && this.props.data.sq2?this.props.data.sq2:'',
                       sq3:this.props.data && this.props.data.sq3?this.props.data.sq3:'',
                       add: this.props.data && this.props.data.add?this.props.data.add:''}};
    }

    componentWillMount(){
        this.setState({user:{...this.props.data}})
    }
    handleChange=(e)=>{
        const user={...this.state.user}
        user[e.currentTarget.name]=e.currentTarget.value
        this.setState({user:user})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.show, data: nextProps.data
        });
    }

    update=()=>{
        var data = {
            fname: this.state.user.fname,
            mobile: this.state.user.mobile,
            email: this.state.user.email,
            dob:this.state.user.dob,
            sq1:this.state.user.sq1,
            sq2:this.state.user.sq2,
            sq3:this.state.user.sq3,
            add:this.state.user.add,
            password: this.props.data.password
           }
           var updates = {};
           updates['/users/' + this.props.data.user_id] = data;
           Fire.database().ref().update(updates);
           this.props.onHide()
    }


    render() {
        return (
            <Modal ref="modal" show={this.state.show} enforceFocus={true}>
                <Modal.Header>
                    <h4 className="modal-title">Edit Information</h4>
                    <button type="button" className="close" onClick={this.props.onHide}>×</button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <div className="form-field-sec">
                                <div className="row m-0">
                                    <div className="col-xl-6">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Phone Number</label>
                                            <div className="position-relative">
                                                <input name='mobile' type="text" className="form-input-box" placeholder="Phone Number" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.mobile}/>
                                                <i className="fas fa-phone-alt"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Email Id</label>
                                            <div className="position-relative">
                                                <input type="text" name='email' className="form-input-box" placeholder="Email Id" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.email}/>
                                                <i className="far fa-envelope"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Date of birth</label>
                                            <div className="position-relative">
                                                <input type="date" name='dob' className="form-input-box" placeholder="Date of birth" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.dob}/>
                                                <i className="fas fa-calendar-alt"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Security Question 1</label>
                                            <div className="position-relative">
                                                <input type="text" name='sq1' className="form-input-box" placeholder="Security Question 1" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.sq1}/>
                                                <i className="fas fa-lock"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Security Question 2</label>
                                            <div className="position-relative">
                                                <input type="text" name='sq2' className="form-input-box" placeholder="Security Question 2" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.sq2}/>
                                                <i className="fas fa-lock"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Security Question 3</label>
                                            <div className="position-relative">
                                                <input type="text" name='sq3' className="form-input-box" placeholder="Security Question 3" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.sq3}/>
                                                <i className="fas fa-lock"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12">
                                        <div className="form-row">
                                            <label className="floatLeft"><span className="dot"></span>Address</label>
                                            <div className="position-relative">
                                                <textarea type="text" name='add' className="form-input-box" placeholder="Address" rows="5" onChange={this.handleChange.bind(this)} value = {this.state.user && this.state.user.add}></textarea>
                                                <i className="fas fa-envelope-open"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer style={{ padding: '5px 20px' }}>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={this.props.onHide}>Close</button>
                <button type="button" className="btn btn-primary" onClick={this.update}>Save changes</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

