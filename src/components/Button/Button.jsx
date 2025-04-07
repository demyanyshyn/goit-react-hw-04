import s from './Button.module.css';
import clsx from 'clsx';
const Button = ({ type, callback, children }) => {
    const isSubmit = type.toLowerCase() === 'submit';
    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            className={s[type]}
            onClick={callback}
        >
            {children}
        </button>
    );
};

export default Button;
