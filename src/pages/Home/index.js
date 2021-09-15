import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {log} from '../..//utils/logger'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        log('[Home constructor]');
    }

    static getDerivedStateFromProps() {
        log('[Home getDerivedStateFromProps]');
        return  {} 
    }

    componentWillMount() {
        log('[Home componentWillMount]');
    }

    // componentDidMount 在服务器端是不执行的
    componentDidMount() {
        log('[Home componentDidMount]');
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>React-SSR</title>
                    <meta name="description" content="首页描述" />
                </Helmet>
                <div>
                    home
                </div>
            </>
        )
    }
}

export default Home;