import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import Home from './pages/Home';
import Counter from './pages/Counter';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import App from './pages/App';

// 集中式路由
export default [
    {
        path: '/',
        component: App,
        loadData: App.loadData,
        // 子路由
        routes: [
            {
                path: '/',
                component: Home,
                exact: true,
                key: '/',
                // 加载数据，如果此配置项有了这个属性，那么意味着需要加载异步数据
                loadData: Home.loadData
            },
            {
                path: '/counter',
                component: Counter,
                key: '/counter'
            },
            {
                path: '/login',
                component: Login,
                key: '/login'
            },
            {
                path: '/logout',
                component: Logout,
                key: '/logout'
            },
            {
                path: '/profile',
                component: Profile,
                key: '/profile'
            },
            {
                component: NotFound,
                key: '/notfound'
            }
        ]
    }
]
