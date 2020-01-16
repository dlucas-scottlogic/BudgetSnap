import transactionList from './reducers/TransactionList';
import authReducer from './reducers/AuthReducer';

const allReducers = {
    transactions: transactionList,
    auth: authReducer
}

export default allReducers;
