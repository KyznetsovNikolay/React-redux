import React, {Component} from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";

class NewCommentWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            body: '',
            name: ''
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

    addComment = () => {
        const { name, body } = this.state;
        const { postId } = this.props;
        const { createComment } = this.props.actions;
        const newComment = { postId: postId, name, body, date: new Date().toLocaleTimeString() };
        createComment(newComment);
        this.setState({
            show: false,
            title: '',
            body: ''
        });
    };

    render() {
        const { name, body } = this.state;
        return (
            <>
                <Button variant="outline-secondary" onClick={this.handleShow}>
                    Добавить комментарий
                </Button>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить комментарий</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-default">Автор</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                                name='name'
                                value={name}
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
                        <Button variant="primary" onClick={this.addComment}>
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

export default connect(null, mapDispatchToProps)(NewCommentWindow);