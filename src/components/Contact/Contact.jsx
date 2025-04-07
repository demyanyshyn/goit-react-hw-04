import s from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import Button from '../Button/Button';
const Contact = ({ data: { name, id, number }, handleDeleteContact }) => {
    return (
        <li className={s.contactItem}>
            <div>
                <p className={s.name}>
                    <FaUser />
                    {name}
                </p>
                <p className={s.number}>
                    <FaPhone />
                    {number}
                </p>
            </div>
            <Button type="delete" callback={() => handleDeleteContact(id)}>
                Delete
            </Button>
        </li>
    );
};

export default Contact;
