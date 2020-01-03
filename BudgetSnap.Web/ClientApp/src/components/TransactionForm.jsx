import React from 'react';
import { connect } from 'react-redux';
import { AddTransaction } from '../redux/actions/AddTransaction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumericInput from 'react-numeric-input';

class TransactionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            startDate: new Date(),
            summary: ""
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleTextChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleValueChange(valueAsNumber, _valueAsString , _e) {
        this.setState({
            value: valueAsNumber
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    };

    onSubmit(e) {
        e.preventDefault();

        let dateString = this.state.startDate.toISOString();

        const post = {
            transactionId: 0,
            value: parseFloat(this.state.value),
            transactionDate: dateString,
            summary: this.state.summary
        }

        // call action to save
        this.props.AddTransaction(post);

        this.setState({
            value: 0,
            startDate: new Date(),
            summary: ""
        });
    }

render() {
    return (
        <div>
            <h3>New Transaction</h3>
            <form onSubmit={this.onSubmit} >
                <div>
                    <label>Value (&#163;) : </label>
                    <NumericInput name="value" value={this.state.value} onChange={this.handleValueChange} precision={2} step={1.0} snap />

                    <label>Transaction Date : </label>
                    <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} />

                    <label>Summary : </label>
                    <input name="summary" value={this.state.summary} onChange={this.handleTextChange} type="text" />

                    <button type="submit">Submit </ button>
                </div>
            </form>
        </div>
    )
};
}

export default connect(null, { AddTransaction })(TransactionForm)