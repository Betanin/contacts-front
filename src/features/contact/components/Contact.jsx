import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import actions from '../state/actions';
import styles from './Contact.css';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        style={{
            width: "100%"
        }}
    />
);

const Contact = props => {

    const { handleSubmit, pristine, submitting, dispatch, initialValues } = props;

    const connectedPost = (values) => {
        if (initialValues) {
            dispatch(actions.put(initialValues.id, values));
        } else {
            dispatch(actions.post(values));
        }
    };
    const connectedCancel = () => dispatch(actions.cancel());

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(connectedPost)} className={styles.form}>
                <div className={styles.fieldRow} >
                    <Field name="name" type="name" component={renderTextField}
                        label={<FormattedMessage id="contact.name" defaultMessage="Name" />} />
                </div>
                <div className={styles.fieldRow} >
                    <Field name="company" type="company" component={renderTextField}
                        label={<FormattedMessage id="contact.company" defaultMessage="Company" />} />
                </div>
                <div className={styles.fieldRow} >
                    <Field name="email" type="email" component={renderTextField}
                        label={<FormattedMessage id="contact.email" defaultMessage="E-Mail" />} />
                </div>
                <div className={styles.fieldRow} >
                    <Field name="phone" type="phone" component={renderTextField}
                        label={<FormattedMessage id="contact.phone" defaultMessage="Phone" />} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <RaisedButton
                            type="submit"
                            label={<FormattedMessage id="contact.confirm" defaultMessage="Ok" />}
                            primary={true}
                            disabled={pristine || submitting}
                            style={{
                                width: "100%"
                            }}
                            icon={<NavigationCheck />}
                        />
                    </div>
                    <div className={styles.button}>
                        <RaisedButton
                            label={<FormattedMessage id="contact.cancel" defaultMessage="Cancel" />}
                            secondary={true}
                            disabled={submitting}
                            style={{
                                width: "100%"
                            }}
                            icon={<HighlightOff />}
                            onClick={connectedCancel}
                        />
                    </div>
                </div>
            </form>
        </div>
    );

}

const form = 'contact';

const mapStateToProps = state => ({
    initialValues: state.contact.data
});

export default connect(mapStateToProps)(reduxForm({
    form
})(Contact));