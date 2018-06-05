import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styles from './Message.css';

class Message extends Component {

    render() {
        const { messages } = this.props;

        if (messages.length > 0) {

            const items = messages.map((item, index) => 
                <div key={`message${index}`} id={`message${index}`} className={[styles.message, item.type === 'INFO' ? styles.info : styles.error].join(' ')}>
                    <strong>
                        <FormattedMessage
                            id={item.type === 'INFO' ? 'message.info' : 'message.error'}
                            defaultMessage='Information' />
                    </strong>
                    <p>{item.message}</p>
                </div>
            );

            return (
                <div className={styles.container}>
                    {items}
                </div>
            );

        }

        return (
            <div className={styles.invisible} />
        );
    }

}

Message.propTypes = {
    messages: PropTypes.array.isRequired
};

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

Message = connect(mapStateToProps)(Message);

export default Message;