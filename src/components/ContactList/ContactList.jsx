import Contact from '../Contact/Contact';
import s from './ContactList.module.css';

const ContactList = ({ contactList, handleDeleteContact, inputValue }) => {
    const filteredContactList = inputValue => {
        return contactList.filter(contact =>
            Object.values(contact).some(
                value =>
                    typeof value === 'string' &&
                    value.toLowerCase().includes(inputValue.toLowerCase())
            )
        );
    };

    return (
        <div className={s.container}>
            <h2 className={s.title}>Phonebook</h2>
            <ul className={s.ContactList}>
                {filteredContactList(inputValue).map(item => (
                    <Contact
                        key={item.id}
                        data={item}
                        handleDeleteContact={handleDeleteContact}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
