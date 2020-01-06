import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DeleteTransaction } from '../redux/actions/DeleteTransaction';
import { UpdateTransaction } from '../redux/actions/UpdateTransaction';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumericInput from 'react-numeric-input';


const Transaction = (props) => {

    // used to toggle between display or edit mode
    const [controlState, setControlState] = useState("normal");

    // store a copy of the confirmed data in case the user wants to cancel their changes.
    const [confirmedData, setConfirmedData] = useState(props.transaction);

    // store a copy of the data we can work with
    const [changeableData, setChangeableData] = useState(props.transaction);

    // grab initial data from the props, and store in local state.

    function handleModifyClick(e) {
        e.preventDefault();
        setControlState("modifying");
    }

    function handleCancelClick(e) {
        e.preventDefault();
        // reset back to last known good state
        setChangeableData(confirmedData);
        // close modify functionality
        setControlState("normal");
    }

    function handleSaveClick(e) {
        e.preventDefault();
        // pass state back up somehow?

        // call save 

        const post = {
            transactionId: changeableData.transactionId,
            value: parseFloat(changeableData.value),
            transactionDate: changeableData.transactionDate,
            summary: changeableData.summary
        }

        // call action to save
        props.UpdateTransaction(post);

        // set last known good state to current data.
        setConfirmedData(changeableData);
        setControlState("normal");
    }

    function handleDeleteClick(e) {
        e.preventDefault();
        props.DeleteTransaction(changeableData.transactionId);
    }

    function handleValueChange(valueAsNumber, _valueAsString, _e) {
        setChangeableData({
            ...changeableData,
            value: valueAsNumber
        });
    }

    function handleSummaryChange(event) {
        setChangeableData({
            ...changeableData,
            summary: event.target.value
        });
    }

    function handleDateChange(date) {
        setChangeableData({
            ...changeableData,
            transactionDate: date.toISOString()
        });
    }

    if (controlState !== "modifying") {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        let readableDate = new Date(Date.parse(changeableData.transactionDate)).toLocaleDateString('en-GB', options);

        var formatter = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        });

        return (
            <tr key={changeableData.transactionId}>              
                <td>{readableDate}</td>
                <td>{formatter.format(changeableData.value)}</td>
                <td>{changeableData.summary}</td>
                <td><button onClick={handleModifyClick}>Modify</button> | <button onClick={handleDeleteClick}>Delete</button></td>
            </tr>
        );
    } else {
        // convert iso string to date object

        let dateObject = new Date(Date.parse(changeableData.transactionDate));
        return (
            <tr key={changeableData.transactionId}>
                <td><DatePicker dateFormat="dd/MM/yyyy" selected={dateObject} onChange={handleDateChange} /></td>
                <td><NumericInput name="value" value={changeableData.value} onChange={handleValueChange} precision={2} step={1.0} snap /></td>
                <td><input type="text" name="summary" value={changeableData.summary} onChange={handleSummaryChange} /></td>
                <td><button onClick={handleSaveClick}>Save</button> | <button onClick={handleCancelClick}>Cancel</button></td>
            </tr>
        );
    }
};

export default connect(
    (state) => state.transactions, // Selects which state properties are merged into the component's props
    { DeleteTransaction, UpdateTransaction } // Selects which action creators are merged into the component's props
)(Transaction);