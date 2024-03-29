import React, { useState, useEffect } from 'react';
import Homepage from './Homepage';
import Profile from './Profile';
import Notes from './Notes';
import Board from './Board';
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

// want to get notified when sign out is clicked

const Nav = (props) => {
  /* profile componenet state */
  const [user, setUser] = useState(undefined);

  /* side effects */
  useEffect(() => {
    checkUser();
    Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signOut') {
        setUser(undefined);
      }
    });
  }, []);

  /* side effect helpers */
  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser();
      const userInfo = { username: data.username, ...data.attributes };
      setUser(userInfo);
      console.log('use effect check user happening');
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
      key: 'board',
      icon: (
        <NavLink
          to="board"
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
      {/* full screen style */}
      <div
        style={{
          backgroundColor: 'black',
          height: '200vh',
          overflow: 'scroll',
          overflowX: 'hidden',
          overflowY: 'hidden',
          borderImageWidth: 25,
        }}
      >
        {console.log(typeof user === 'object')}
        <Menu
          mode="horizontal"
          items={
            typeof user === 'object' ? privateMenuItems : publicMenuItems
          }
          //  navbar style
          style={{
            backgroundColor: 'black',
            borderImage:
              'repeating-linear-gradient(45deg, #B99A5B, #3bf, #B99A5B 30px) 60',
          }}
        ></Menu>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/board" element={<Board />} />
          <Route
            path="/profile"
            element={
              <Profile
                username={user?.username}
                email={user?.email}
                setUser={setUser}
              ></Profile>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Nav;
