import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';
import { Button, Modal, InputGroup, FormControl } from "react-bootstrap";

class SignupWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            login: '',
            email: '',
            password: ''
        };
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    addUser = () => {
        const { login, email, password } = this.state;
        const { createUser, userInBase } = this.props.actions;
        const { users } = this.props;
        const find = users.find(user => user.username === this.state.login);
        const user = {
            username: login,
            name: login,
            email: email,
            password: password,
            website: 'http://yandex.ru',
            phone: '+7999-000-10-00'
        };
        if(!find) {
            createUser(user);
        } else {
            userInBase();
        }
        this.setState({
            show: false,
            login: '',
            email: '',
            password: ''
        });
    };

    render() {
        const { login, email, password } = this.state;
        return (
            <div>
                <Button variant="outline-secondary" onClick={this.handleShow}>
                    Зарегистрироваться
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Зарегистрироваться</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroup-sizing-default"
                                >Логин</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                name='login'
                                value={login}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroup-sizing-default"
                                    value={email}
                                >Email</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                name='email'
                                value={email}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="inputGroup-sizing-default"
                                    value={password}
                                >Пароль</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                name='password'
                                value={password}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.addUser}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignupWindow);