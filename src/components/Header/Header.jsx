import React, { Component } from 'react';
import Menu from '../Menu';
import SigninWindow from '../SignInWindow';
import SignupWindow from '../SignupWindow';
import { connect } from 'react-redux';
import actions from '../../actions/data.js';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import './style.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {users, logIn, createUser, userInSystem, user, userNoFound, registry , existUser} = this.props;
        const { logOut } = this.props.actions;
        const newUser =  registry && <h5>Вы успешно зарегестрировались.Теперь войдите на сайт использую свой логин и пароль.</h5>;
        const inSystem = <div>
                <div className='user-data'>
                    <span><p>Добро пожаловать</p> <h5>{user}</h5></span>
                    <Button onClick={logOut} variant='outline-secondary'>Выйти</Button>
                </div>
            </div>;
        return (
            <div className='head-around'>
                <div className='head'>
                    <Link to={'/'}><h1 className='logo'>Блог</h1></Link>
                    <Menu />
                    { userInSystem ? inSystem :
                     <div className='head'>
                        <SigninWindow users={users} logIn={logIn} />
                        <div className='but'/>
                        <SignupWindow logIn={logIn} users={users} createUser={createUser}/>
                     </div> }
                </div>
                <div className='message'>
                    { userNoFound && <h4>Вам нужно зарегестрироваться!</h4> }
                    { existUser ? <h5>Пользователь с таким именем уже существует</h5> : newUser }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   userInSystem: state.data.logIn,
    user: state.data.user,
    userNoFound: state.data.userNotFound,
    registry: state.data.registry,
    existUser: state.data.existUser
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);