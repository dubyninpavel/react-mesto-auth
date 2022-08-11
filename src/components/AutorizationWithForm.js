import { useState } from 'react';
import Header from "./Header.js";
import { NavLink } from 'react-router-dom';

function AutorizationWithForm({ title, link, linkTitle, buttonTitle, onSubmit }) {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    function handleEmailInput(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordInput(evt) {
        setPassword(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit(email, password);
    }

    return (
        <>
            <Header>
                <NavLink to={`/${link}`} className="header__link">{linkTitle}</NavLink>
            </Header>
            <div className="autorization">
                <h2 className="autorization__title">{title}</h2>
                <form className='autorization__form' onSubmit={handleSubmit}>
                    <input
                        className = "autorization__input"
                        id = "autorization__email"
                        type = "email"
                        name = "email"
                        placeholder = "Email"
                        value = {email || ""}
                        onChange = {handleEmailInput}
                        required
                    />
                    <input
                        className = "autorization__input"
                        id = "autorization__password"
                        type = "password"
                        name = "password"
                        placeholder = "Пароль"
                        minLength = "8"
                        maxLength = "40"
                        value = {password || ""} 
                        onChange = {handlePasswordInput}
                        required
                    />
                    <button className="autorization__button" type="submit" >{buttonTitle}</button>
                </form>
            </div>
        </>
    );
}

export default AutorizationWithForm;