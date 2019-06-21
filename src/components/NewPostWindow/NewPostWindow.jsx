import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

class NewPostWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            body: '',
            title: ''
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    addPost = () => {
      const { title, body } = this.state;
      const { createPost } = this.props.actions;
      const { match } = this.props;
      const newPost = { userId: match, title: title, body: body };
      createPost(newPost);
      this.setState({
          show: false,
          title: '',
          body: ''
      });
    };

    render() {
        const { title, body } = this.state;
        return (
            <>
                <Button variant="light" onClick={this.handleShow}>
                    Добавить пост
                </Button>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить пост</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Название</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                name='title'
                                value={title}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Текст</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                as="textarea"
                                aria-label="With textarea"
                                name='body'
                                value={body}
                                onChange={this.handleChange}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="dark" onClick={this.addPost}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(NewPostWindow);