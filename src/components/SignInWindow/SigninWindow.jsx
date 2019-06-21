import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

class SigninWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            login: '',
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

    checkedUser = () => {
        const { users } = this.props;
        const { logIn, userNotFound } = this.props.actions;
        const find = users.find(user => user.username === this.state.login);
        if(find && this.state.password === 'qwerty') {
            logIn(this.state.login);
        } else {
            userNotFound();
        }
        this.setState({
            show: false,
            login: '',
            password: ''
        });
    };

    render() {
        const { login, password } = this.state;
        return (
          <div>
              <Button variant="outline-secondary" onClick={this.handleShow}>
                  Войти
              </Button>

              <Modal show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                      <Modal.Title>Войти</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <InputGroup className="mb-3">
                          <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroup-sizing-default">Логин</InputGroup.Text>
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
                              <InputGroup.Text id="inputGroup-sizing-default">Пароль</InputGroup.Text>
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
                      <Button variant="dark" onClick={this.checkedUser}>
                          Войти
                      </Button>
                  </Modal.Footer>
              </Modal>
          </div>
        );
    }
}

const matDispatchToProps = dispatch => ({
   actions: bindActionCreators(actions, dispatch)
});

export default connect(null, matDispatchToProps)(SigninWindow);