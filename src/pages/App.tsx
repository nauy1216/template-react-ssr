import React, {Component, Fragment} from 'react';
import Header from '../components/Header';
import {renderRoutes, matchRoutes} from 'react-router-config';
import styles from './App.css';
class App extends Component {
    render() {
        return (
            <Fragment>
                <Header/>
                <div className="container" className={styles.app}>
                    {renderRoutes(this.props.route.routes)}
                </div>
            </Fragment>
        )
    }
}

export default App;