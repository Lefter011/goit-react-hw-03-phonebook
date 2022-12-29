import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { PhonebookList } from "./PhonebookList/PhonebookList";
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { FilterInput } from "./FilterForm/FilterInput";
import style from './app.module.css';

const CONTACTS_KEY = 'CONTACTS_KEY';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }

    componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
    savedContacts && this.setState(({ contacts: savedContacts }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify(this.state.contacts));
    }
  }
  
  onFormSubmit = (e) => {
    e.preventDefault();
    let alreadyContact = null;
    const form = e.currentTarget;
    const name = form.elements.name.value;
    this.state.contacts.forEach(contact => {
      if (contact.name.toLowerCase() === name.toLowerCase()) {
        alreadyContact = true;
      }
    })
    if (alreadyContact) {
      return alert(`${name} is already in contacts`);
    }
    
    const number = form.elements.number.value;
    const id = nanoid();
    const newContact = {
      id: id,
      name: name,
      number: number,
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }))
  }

  onFilterInput = (e) => {
    this.setState({ filter: e.currentTarget.value })
  }

  getSearchContact = () => {
    const normalizedSearchContacts = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizedSearchContacts))
  }

  onDeleteContact = (id) => {
    this.setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }))
  }

  render() {
    const actuallyContacts = this.getSearchContact();
    return <div className={style.container}>
      <h1>Phonebook</h1>
      <ContactsForm
        onSubmitFunction={this.onFormSubmit} />

      <FilterInput
        onFilterInput={this.onFilterInput} />
      <h2>Contacts</h2>
      <PhonebookList
        contact={actuallyContacts}
        onDeleteContact={this.onDeleteContact} />
    </div>
  }
}