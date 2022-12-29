import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { PhonebookList } from "./PhonebookList/PhonebookList";
import { ContactsForm } from "./ContactsForm/ContactsForm";
import { FilterInput } from "./FilterForm/FilterInput";
import style from './app.module.css';

export class App extends Component {
  state = {
    contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
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
    this.setState({ filter: e.currentTarget.value } )
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