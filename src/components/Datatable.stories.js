import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Datatable from './Datatable';

const columnNames = ['ID', 'Name', 'Status'];
const data = [
    ['A', '1', 'John Smith', 'Employed'],
    ['B', '2', 'Randal White', 'Unemployed'],
    ['C', '3', 'Stephanie Sanders', 'Employed'],
    ['D', '4', 'Steve Brown', 'Employed'],
    ['E', '5', 'Christopher Nolan', 'Unemployed']
];

storiesOf('Datatable', module)
    .add('with checkboxes', () => (
        <MuiThemeProvider>
            <Datatable
                tableKey='T1'
                columnNames={columnNames} 
                data={data}
            />
        </MuiThemeProvider>
    ))
    .add('without checkboxes', () => (
        <MuiThemeProvider>
            <Datatable
                tableKey='T2'
                columnNames={columnNames}
                data={data}
                showCheckboxes={false}
            />
        </MuiThemeProvider>
    ))
    .add('show hover', () => (
        <MuiThemeProvider>
            <Datatable
                tableKey='T3'
                columnNames={columnNames}
                data={data}
                showCheckboxes={false}
                bodyProperties={{
                    showRowHover: true
                }}
            />
        </MuiThemeProvider>
    ))
    .add('stripped rows', () => (
        <MuiThemeProvider>
            <Datatable
                tableKey='T4'
                columnNames={columnNames}
                data={data}
                showCheckboxes={false}
                bodyProperties={{
                    stripedRows: true
                }}
            />
        </MuiThemeProvider>
    ))
    .add('handle row selection', () => (
        <MuiThemeProvider>
            <Datatable
                tableKey='T5'
                columnNames={columnNames}
                data={data}
                showCheckboxes={false}
                bodyProperties={{
                    showRowHover: true
                }}
                onRowSelection={(id) => action('handle row selection')(id)}
            />
        </MuiThemeProvider>
    ))
    .add('handle cell click and row selection', () => (
        <MuiThemeProvider>
            <Datatable
                tableKey='T6'
                columnNames={columnNames}
                data={data}
                showCheckboxes={false}
                bodyProperties={{
                    showRowHover: true,
                }}
                tableProperties={{
                    multiSelectable: true,                    
                }}
                onRowSelection={(selectedRows) => action('handle row selection')('[ ' + selectedRows.reduce((item, prev) => item + ' ' + prev) + ' ]')}
                onCellClick={(id) => action('handle cell click')(id)}
                onDoubleClick={(id) => action('handle double click')(id)}
            />
        </MuiThemeProvider>
    ));    