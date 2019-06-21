import React from 'react';

import Header from '../Header';
import Footer from '../Footer';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../Home";
import UserContainer from "../UserContainer";
import CommentsContainer from "../CommentsContainer";
import Contacts from "../Contacts";
import PostContainer from "../PostContainer";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
       this.props.actions.getData();
    }

    render() {
        const { comments, users, posts } = this.props;
        const { deletePost } = this.props.actions;
        return (
            <div>
                <Router>
                    <div>
                        <Header users={users} createUser={this.createUser}/>
                        <Route exact path='/' component={Home}/>
                        <Route path='/posts' render={() => {
                            return <PostContainer { ...this.props }
                                                  deletePost={deletePost}
                                                    />
                        }}/>
                        <Route path='/users' render={() => {
                            return <UserContainer { ...this.props } />
                        }}/>
                        <Route path='/comments' render={() => {
                            return <CommentsContainer comments={comments} posts={posts}/>;
                        }}/>
                        <Route path='/contacts' component={Contacts}/>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   users: state.data.users,
   comments: state.data.comments,
   posts: state.data.posts,
    logIn: state.data.logIn,
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);