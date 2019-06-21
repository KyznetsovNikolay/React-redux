import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';
import {Button, FormControl, InputGroup, Modal} from 'react-bootstrap';

class EditPostWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            body: this.props.body,
            title: this.props.title
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

    changePost = () => {
        const { id, userId } = this.props;
        const { editPost } = this.props.actions;
        const { title, body } = this.state;
        const newPost = { userId: userId, id: id, title: title, body: body };
        editPost(newPost, id);
        this.setState({ show: false });
    };

    render() {
        const { body, title } = this.state;

        return (
            <>
                <Button variant="outline-secondary" onClick={this.handleShow}>
                    Редактировать
                </Button>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить статью</Modal.Title>
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
                        <Button variant="dark" onClick={this.changePost}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions,dispatch)
});

export default connect(null, mapDispatchToProps)(EditPostWindow);