import AutorizationWithForm from "./AutorizationWithForm.js";
import { NavLink } from 'react-router-dom';
import * as Auth from './Auth.js';

function Register({ onInfoTooltipRegister }) {
    function handleSubmit(email, password) {
        Auth.register({ email, password })
        .then((res) => {
            if (res) {
                onInfoTooltipRegister(true);
            } else {
                onInfoTooltipRegister(false);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="page">
            <AutorizationWithForm
                title={'Регистрация'}
                link={'signin'}
                linkTitle={'Войти'}
                buttonTitle={'Зарегистрироваться'}
                onSubmit={handleSubmit}
            />
            <p className="autorization__register_subtitle">Уже зарегистрированы? <NavLink className="autorization__register_link" to='/signIn'>Войти</NavLink></p>
        </div>
    );
}

export default Register;