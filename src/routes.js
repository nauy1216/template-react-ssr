import React, {Component, Fragment} from 'react';
import Home from './pages/Home';
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
        ]
    }
]
