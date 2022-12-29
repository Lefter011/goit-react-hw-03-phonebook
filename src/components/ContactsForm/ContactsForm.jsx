import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './contactsForm.module.css';

export class ContactsForm extends Component {
    state = {
        name: '',
        number: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();
        this.props.onSubmitFunction(e);
        this.resetStateForm();
    }

    onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    resetStateForm = () => {
        this.setState(prevState => ({
            ...prevState,
            number: '',
            name: '',
        }))
    }

    render() {
        return(
        <form action="" onSubmit={this.onSubmitForm} className = {style.searchForm}>
        <label htmlFor="Name">
            Name
            <input
            onInput={this.onInputChange}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            />
        </label>
        <label htmlFor="Number">
            Number
            <input
            onInput={this.onInputChange}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            />
        </label>
        <button type="submit">Add contact</button>
        </form>)
    }
}

ContactsForm.propTypes = {
    onSubmitFunction: PropTypes.func.isRequired,
}