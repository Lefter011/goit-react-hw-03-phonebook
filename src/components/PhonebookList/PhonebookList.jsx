import style from './PhonebookList.module.css';
import PropTypes from 'prop-types';

export const PhonebookList = ({ contact, onDeleteContact }) => {
    return <div>
        <ul>
            {contact.map((item, index) => {
                return (<li className={style.list} key={index}>
                <p>{item.name}: {item.number}</p>
                <button type="button"  onClick={() => onDeleteContact(item.id)}>delete</button>
                </li>)
            })}
        </ul>
    </div>
}

PhonebookList.propTypes = {
    contact: PropTypes.arrayOf(PropTypes.shape(
        {
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }
    )).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
}