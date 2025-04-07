import { useState, useEffect } from 'react';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';
import plugContacts from './contacts.json';

const App = () => {
    const localStorageContactList = JSON.parse(
        localStorage.getItem('contact-list')
    );

    const [inputValue, setInputValue] = useState('');
    const [contactList, setContactList] = useState(() => {
        return localStorageContactList ? localStorageContactList : plugContacts;
    });

    useEffect(() => {
        localStorage.setItem('contact-list', JSON.stringify(contactList));
    }, [contactList]);

    const handleDeleteContact = id => {
        const newContactList = contactList.filter(item => item.id !== id);
        setContactList(newContactList);
    };

    const handleFilterInput = evt => {
        setInputValue(evt.target.value);
    };

    const addNewContact = contact => {
        setContactList([...contactList, contact]);
    };
    return (
        <section className="app">
            <h1>Phonebook</h1>
            <ContactForm
                contactList={contactList}
                addNewContact={addNewContact}
            />
            <SearchBox
                handleInput={handleFilterInput}
                inputValue={inputValue}
            />
            <ContactList
                contactList={contactList}
                handleDeleteContact={handleDeleteContact}
                inputValue={inputValue}
            />
        </section>
    );
};
export default App;
