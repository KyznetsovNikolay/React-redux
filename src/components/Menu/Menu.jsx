import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './style.css';

const Menu = () => {
  const menu = [
      { pageId: 1, page:'Главная', path: '/' },
      { pageId: 2, page:'Посты', path: '/posts'},
      { pageId: 3, page:'Пользователи', path: '/users'},
      { pageId: 4, page:'Комментарии', path: '/comments' },
      { pageId: 5, page:'Контакты', path: '/contacts' }
  ];
  const menuList = menu.map(item => {
    const { pageId, page, path } = item;
      return <div key={pageId} className='list'><Link to={path} className='link'><Button variant="light">{page}</Button></Link></div>;
  });
  return (
      <div className='menu'>
        {menuList}
      </div>
  );
};
export default Menu;