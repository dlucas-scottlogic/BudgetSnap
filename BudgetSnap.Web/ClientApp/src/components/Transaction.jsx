import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DeleteTransaction } from '../redux/actions/DeleteTransaction';


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

        // set last known good state to current data.
        setConfirmedData(changeableData);
        setControlState("normal");
    }

    function handleDeleteClick(e) {
        e.preventDefault();
        props.DeleteTransaction(changeableData.transactionId);
    }

    function handleValueChange(event) {
        setChangeableData({
            ...changeableData,
            value: event.target.value
        });
    }

    function handleSummaryChange(event) {
        setChangeableData({
            ...changeableData,
            summary: event.target.value
        });
    }

    if (controlState !== "modifying") {
        return (
            <tr key={changeableData.transactionId}>
                <td>{changeableData.transactionId}</td>
                <td>&#163;{changeableData.value}</td>
                <td>{changeableData.transactionDate}</td>
                <td>{changeableData.summary}</td>
                <td><button onClick={handleModifyClick}>Modify</button> | <button onClick={handleDeleteClick}>Delete</button></td>

            </tr>
        );
    } else {
        return (
            <tr key={changeableData.transactionId}>
                <td>{changeableData.transactionId}</td>
                <td><input type="text" name="value" value={changeableData.value} onChange={handleValueChange}/></td>
                <td>{changeableData.transactionDate}</td>
                <td><input type="text" name="summary" value={changeableData.summary} onChange={handleSummaryChange} /></td>
                <td><button onClick={handleSaveClick}>Save</button> | <button onClick={handleCancelClick}>Cancel</button></td>
            </tr>
        );
    }
};

export default connect(
    (state) => state.transactions, // Selects which state properties are merged into the component's props
    { DeleteTransaction } // Selects which action creators are merged into the component's props
)(Transaction);