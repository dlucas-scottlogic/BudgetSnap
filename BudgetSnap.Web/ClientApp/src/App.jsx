import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Transactions from './components/TransactionList';
import LoginCallback from './components/LoginCallback';
import UserInfo from './components/UserInfo';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/transactions' component={Transactions} />
        <Route path='/logincallback' component={LoginCallback} />
        <Route path='/userinfo' component={UserInfo} />
    </Layout>
);
