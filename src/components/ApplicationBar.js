import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';

const renderSearchField = (fieldDescription, handleChange) => {

    const styles = {
        container: {
            display: 'inline-block',
            position: 'absolute',
            top: '.5em',
            width: '100%',
            padding: '0 30%',
        },
        field: {
            zIndex: '10000',
            width: '40%',
            minWidth: '20em',
            maxWidth: '60em',
            margin: 'auto',
            color: '#FFF',
        }
    };

    return (
        <div
            style={styles.container}
        >
            <TextField
                style={styles.field}
                hintText={fieldDescription}
                onChange={handleChange}
            />
        </div>
    )
}

const renderItem = (item, index) => {
    return (
        <MenuItem 
            key={'menuItem' + index}
            primaryText={item.text}
            disabled={item.disabled || !item.onClick}
            onClick={item.onClick}
        /> 
    )
}

const renderMenu = (menuItems) => {
    if (menuItems) {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                { menuItems.map((item, index) => renderItem(item, index)) }
            </IconMenu>
        )
    }
}

const handleChange = (onFieldChange) => (event) => {
    onFieldChange(event.target.value);
};

class ApplicationBar extends Component {

    render() {
        const {
            title,
            fieldDescription,
            onFieldChange,
            menuItems,
        } = this.props;

        return (
            <div>
                <AppBar
                    title={title}
                    iconElementLeft={undefined}
                    iconElementRight={renderMenu(menuItems)}
                />
                {renderSearchField(fieldDescription, handleChange(onFieldChange))}
            </div>
        )
    }

}

ApplicationBar.propTypes = {
    title: PropTypes.string.isRequired,
    fieldDescription: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    menuItems: PropTypes.array,
};

export default ApplicationBar;