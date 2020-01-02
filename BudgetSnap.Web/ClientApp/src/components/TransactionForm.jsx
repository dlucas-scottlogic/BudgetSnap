import React from 'react';
import { connect } from 'react-redux';
import { AddTransaction } from '../redux/actions/AddTransaction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            startDate: new Date()
        };

        this.handleValueChange = this.handleValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleValueChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const post = {
            transactionId: 0,
            value: 100,
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
                        <input name="value" value={this.state.value} onChange={this.handleValueChange} type="text" />
                        <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} />
                        <button type="submit">Submit </ button>
                    </div>
                </form>
            </div>
        )
    };
}

export default connect(null, { AddTransaction })(TransactionForm)