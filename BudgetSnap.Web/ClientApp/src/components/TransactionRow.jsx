import React, { useState } from 'react';


const TransactionRow = (props) => {

    const [modifyState, setModifyState] = useState("normal");
    // store a copy of the confirmed data in case the user wants to cancel their changes.
    const [confirmedData, setConfirmedData] = useState(props.transaction);
    // store a copy of the data we can work with
    const [changeableData, setChangeableData] = useState(props.transaction);

    // grab initial data from the props, and store in local state.

    function handleModifyClick(e) {
        e.preventDefault();
        setModifyState("modifying");
    }

    function handleCancelClick(e) {
        e.preventDefault();
        // reset back to last known good state
        setChangeableData(confirmedData);
        // close modify functionality
        setModifyState("normal");
    }

    function handleSaveClick(e) {
        e.preventDefault();
        // pass state back up somehow?

        // set last known good state to current data.
        setConfirmedData(changeableData);
        setModifyState("normal");
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

    if (modifyState !== "modifying") {
        return (
            <tr key={changeableData.transactionId}>
                <td>{changeableData.transactionId}</td>
                <td>&#163;{changeableData.value}</td>
                <td>{changeableData.transactionDate}</td>
                <td>{changeableData.summary}</td>
                <td><a href="#" onClick={handleModifyClick}>Modify</a></td>
            </tr>
        );
    } else {
        return (
            <tr key={changeableData.transactionId}>
                <td>{changeableData.transactionId}</td>
                <td><input type="text" name="value" value={changeableData.value} onChange={handleValueChange}/></td>
                <td>{changeableData.transactionDate}</td>
                <td><input type="text" name="summary" value={changeableData.summary} onChange={handleSummaryChange} /></td>
                <td><a href="#" onClick={handleSaveClick}>Save</a> or <a href="#" onClick={handleCancelClick}>Cancel</a></td>
            </tr>
        );
    }
};

export default TransactionRow;