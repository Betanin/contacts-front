import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import actions from '../state/actions';
import styles from './Login.css';

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

const Login = props => {

    const { handleSubmit, pristine, submitting, dispatch } = props;

    const connectedLogin = (values) => {
        dispatch(actions.login(values));
    };
    const connectedSignup = () => dispatch(actions.signup());

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(connectedLogin)} className={styles.form}>
                <div className={styles.fieldRow} >
                    <Field name="email" type="email" component={renderTextField} 
                        label={<FormattedMessage id="login.email" defaultMessage="E-Mail" />} />
                </div>
                <div className={styles.fieldRow} >
                    <Field name="password" type="password" component={renderTextField}
                        label={<FormattedMessage id="login.password" defaultMessage="Password" />} />
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <RaisedButton
                            name="login"
                            type="submit"
                            label={<FormattedMessage id="login.login" defaultMessage="Login" />}
                            primary={true}
                            disabled={pristine || submitting}
                            style={{
                                width: "100%"
                            }}
                            icon={<LockOpen />}
                        />
                    </div>
                    <div className={styles.button}>
                        <RaisedButton
                            name="signup"
                            label={<FormattedMessage id="login.signup" defaultMessage="Signup" />}
                            secondary={true}
                            disabled={submitting}
                            style={{
                                width: "100%"
                            }}
                            icon={<AccountCircle />}
                            onClick={connectedSignup}
                        />
                    </div>
                </div>
            </form>
        </div>
    );

}

const form = 'login';

export default reduxForm({
    form
})(Login);