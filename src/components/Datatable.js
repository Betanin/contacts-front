import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';


const renderHeader = (tableKey, columnNames, showCheckboxes = true) => {
    return (
        <TableHeader
            displaySelectAll={showCheckboxes}
            adjustForCheckbox={showCheckboxes}
        >
            {renderRow([tableKey + 'Header', ...columnNames], true)}
        </TableHeader>
    )
}

const renderBody = (data, bodyProperties, showCheckboxes = true) => {
    return (
        <TableBody
            displayRowCheckbox={showCheckboxes}
            showRowHover={bodyProperties && bodyProperties.showRowHover}
            stripedRows={bodyProperties && bodyProperties.stripedRows}
            deselectOnClickaway={bodyProperties && bodyProperties.deselectOnClickaway}
        >
            {data.map(row => renderRow(row))}
        </TableBody>
    )
}

const renderRow = (row, isHeader = false) => {
    const [key, ...columns] = row;
    
    return (
        <TableRow key={key}>
            {isHeader
                ? columns.map(column => <TableHeaderColumn key={key}>{column}</TableHeaderColumn>)
                : columns.map(column => <TableRowColumn key={key}>{column}</TableRowColumn>)}
        </TableRow>
    )
}

class Datatable extends Component {

    constructor(props) {
        super(props);
        this.handleDoubleClick = ((handleToFire) => {
            const timeToDoubleClick = 500;
            let timerStarted = false;
            let idToSend = undefined;
            let timeout = undefined;
            const clearTimer = () => {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = undefined;
                }
                timerStarted = false;
                idToSend = undefined;
            }

            return async (id) => {    
                if (idToSend && (idToSend !== id)) {
                    clearTimer();
                    idToSend = id;
                } else {
                    if (timerStarted) {
                        clearTimer();
                        handleToFire(id);
                    } else {
                        timerStarted = true;
                        timeout = await setTimeout(clearTimer, timeToDoubleClick);
                    }
                }    
            }
        })(props.onDoubleClick);
    }

    handleRowSelection(indexes = []) {
        if(this.props.onRowSelection) {
            const selectedRows = indexes.map(item => {
                return this.props.data[item || 0][0]
            });
            if (selectedRows && (selectedRows.length > 0)) {
                this.props.onRowSelection(selectedRows);
            }
        }
    }

    handleCellClick(index) {
        if(index && this.props.onCellClick) {
            const row = this.props.data[index];
            this.props.onCellClick(row[0]);
        }
        if(index && this.props.onDoubleClick) {
            const row = this.props.data[index];
            this.handleDoubleClick(row[0]);
        }
    }

    render() {
        const {
            tableKey,
            columnNames,
            data,
            tableProperties,
            bodyProperties,
            showCheckboxes,
        } = this.props;

        return (
            <Table
                key={tableKey}
                height={(tableProperties && tableProperties.height) || 'inherit'}
                multiSelectable={tableProperties && tableProperties.multiSelectable}
                onRowSelection={this.handleRowSelection.bind(this)}
                onCellClick={this.handleCellClick.bind(this)}
            >
                {renderHeader(tableKey, columnNames, showCheckboxes)}
                {renderBody(data, bodyProperties, showCheckboxes)}
            </Table>
        )
    }

}

Datatable.propTypes = {
    columnNames: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    onRowSelection: PropTypes.func,
    onCellClick: PropTypes.func,
    onDoubleClick: PropTypes.func,
};

export default Datatable;