import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import actions from '../state/actions';
import styles from './Signup.css';

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



const Signup = props => {

    const { handleSubmit, pristine, submitting, dispatch } = props;

    const connectedSignup = (values) => dispatch(actions.post(values));
    const connectedCancel = () => dispatch(actions.cancel());

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(connectedSignup)} className={styles.form}>
                <div className={styles.fieldRow} >
                    <Field name="name" type="name" component={renderTextField} 
                        label={<FormattedMessage id="signup.name" defaultMessage="Name" />} />
                </div>
                <div className={styles.fieldRow} >
                    <Field name="email" type="email" component={renderTextField} 
                        label={<FormattedMessage id="signup.email" defaultMessage="E-Mail" />} />
                </div>
                <div className={styles.fieldRow} >
                    <Field name="password" type="password" component={renderTextField}
                        label={<FormattedMessage id="signup.password" defaultMessage="Password" />} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <RaisedButton
                            type="submit"
                            label={<FormattedMessage id="signup.signup" defaultMessage="Signup" />}
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
                            label={<FormattedMessage id="signup.cancel" defaultMessage="Cancel" />}
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

const form = 'signup';

export default reduxForm({
    form
})(Signup);