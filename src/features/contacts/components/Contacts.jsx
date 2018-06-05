import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import actions from '../state/actions';
import { contactActions } from '../../contact';
import Datatable from '../../../components/Datatable';
import ApplicationBar from '../../../components/ApplicationBar';
import { debounce } from '../../../helpers/debounce';
import styles from './Contacts.css';

class Contacts extends Component {

    handleRemoveContacts(selectedItems = [], setSelectedItems, removeContact) {
        if (removeContact) {
            this.selectedItems.forEach((item) => {
                removeContact(item.id)
            });
            setSelectedItems([]);
        }
    }

    render() {
        const columnNames = ['Name', 'Company', 'E-mail', 'Phone'];
        const { contacts, selectedItems, filterContacts, addContact, removeContact, openContact, setSelectedItems } = this.props;

        return (
            <div>
                <ApplicationBar
                    title="Contacts"
                    fieldDescription="Search"
                    onFieldChange={(value) => filterContacts(value)}
                    menuItems={[
                        {
                            text: 'New Contact',
                            disabled: (!addContact),
                            onClick: () => {
                                setSelectedItems([]);
                                addContact();
                            },
                        },
                        {
                            text: 'Open Contact',
                            disabled: (!openContact || !selectedItems || (selectedItems && selectedItems.length !== 1)),
                            onClick: () => {
                                openContact(selectedItems[0]);
                                setSelectedItems([]);
                            },
                        },
                        {
                            text: 'Remove Contacts',
                            disabled: (!removeContact || !selectedItems || (selectedItems && selectedItems.length === 0)),
                            onClick: () => {
                                this.handleRemoveContacts(selectedItems, setSelectedItems, removeContact);
                            },
                        },
                    ]}
                />
                <div className={styles.container}>
                    <Datatable
                        key={'contactsList'}
                        columnNames={columnNames}
                        data={contacts}
                        showCheckboxes={false}
                        bodyProperties={{
                            showRowHover: true,
                            deselectOnClickaway: false,
                        }}
                        tableProperties={{
                            multiSelectable: false,
                        }}
                        onDoubleClick={(id) => openContact(id)}
                        // TODO: Fix a multiselection bug
                        onRowSelection={(selectedItems) => setSelectedItems(selectedItems)}
                    />
                </div>
                <FloatingActionButton
                    className={styles.addButton}
                    onClick={() => addContact()}
                >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }

}

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        contacts: getContactList(state.contacts),
        selectedItems: state.selectedItems,
    };
};

const getContactList = (contacts) => {
    if (contacts.filteredItems)
        return contacts.filteredItems.map(contact =>
            [
                contact.id,
                contact.name,
                contact.company,
                contact.email,
                contact.phone
            ]);
    return [];
}

const mapDispatchToProps = dispatch => {

    const debouncer = debounce((args) => {
        dispatch(actions.filterContacts(args));
    }, 300);

    return {
        getContacts: () => {
            dispatch(actions.getAll());
        },
        filterContacts: (filter) => {
            debouncer(filter);
        },
        addContact: () => {
            dispatch(contactActions.init(true));
        },
        openContact: (id) => {
            dispatch(contactActions.get(id));
        },
        removeContact: (id) => {
            dispatch(contactActions.remove(id));
        },
        setSelectedItems: (selectedItems) => {
            dispatch(actions.setSelectedItems(selectedItems));
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));