import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.module.css';

class Modal extends Component {
    render() {
        return (
            <>
                <Backdrop isOpen={this.props.isOpen} onClick={this.props.closeHandler} />
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.isOpen ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.isOpen ? '1' : '0',
                    }}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}
export default Modal;
