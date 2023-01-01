import React, { useState, useEffect } from 'react';
import Homepage from './Homepage';
import Profile from './Profile';
import Protected from './Protected';
import { Auth, Hub } from 'aws-amplify';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  SmileOutlined,
  FileProtectOutlined,
  BarChartOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
/**
 * Navigation UI
 */

const Nav = (props) => {
  /* profile componenet state */
  const [user, setUser] = useState(null);

  /* side effects */
  useEffect(() => {
    checkUser();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signOut') {
        setUser(null);
      }
    });
  }, []);

  /* side effect helpers */
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      console.log(userInfo);
    } catch (err) {
      console.log('error: ', err);
    }
  }

  const publicMenuItems = [
    {
      key: 'home',
      icon: (
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive
              ? {
                  color: '#B99A5B',
                }
              : { color: 'gray' }
          }
        >
          <HomeOutlined />
        </NavLink>
      ),
    },
    {
      key: 'profile',
      icon: (
        <NavLink
          to="profile"
          style={({ isActive }) =>
            isActive
              ? {
                  color: '#B99A5B',
                }
              : { color: 'gray' }
          }
        >
          <SmileOutlined />
        </NavLink>
      ),
    },
  ];

  const privateMenuItems = [
    {
      key: 'home',
      icon: (
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive
              ? {
                  color: '#B99A5B',
                }
              : { color: 'gray' }
          }
        >
          <HomeOutlined />
        </NavLink>
      ),
    },
    {
      key: 'protected',
      icon: (
        <NavLink
          to="protected"
          style={({ isActive }) =>
            isActive
              ? {
                  color: '#B99A5B',
                }
              : { color: 'gray' }
          }
        >
          <PushpinOutlined />
        </NavLink>
      ),
    },
    {
      key: 'profile',
      icon: (
        <NavLink
          to="profile"
          style={({ isActive }) =>
            isActive
              ? {
                  color: '#B99A5B',
                }
              : { color: 'gray' }
          }
        >
          <SmileOutlined />
        </NavLink>
      ),
    },
  ];

  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: 'black',
          height: '100vh',
          overflow: 'scroll',
          overflowX: 'hidden',
          overflowY: 'hidden',
          borderImageWidth: 25,
        }}
      >
        <Menu
          mode="horizontal"
          items={user ? privateMenuItems : publicMenuItems}
          style={{
            backgroundColor: 'black',
            borderImage:
              'repeating-linear-gradient(45deg, #B99A5B, #3bf, #B99A5B 30px) 60',
          }}
        ></Menu>
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Nav;
