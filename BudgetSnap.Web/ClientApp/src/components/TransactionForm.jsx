import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddTransaction } from '../redux/actions/AddTransaction';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const post = {
            transactionId: 0,
            value: this.state.value,
            transactionDate: "2019-12-20",
            summary: "string"
        }

        // call action to save here

        console.log('Call action to save')
        this.props.AddTransaction(post);
    }

    render() {
        return (
            <div>
                <h3>New Transaction</h3>
                <form onSubmit={this.onSubmit} >
                    <div>
                        <label>value</label>
                        <input name="value" value={this.state.value} onChange={this.onChange} type="text" />
                        <button type="submit">Submit </ button>
                    </div>
                </form>
            </div>
        )
    };
}

export default connect(null, { AddTransaction })(TransactionForm)