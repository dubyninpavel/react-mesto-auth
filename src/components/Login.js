import AutorizationWithForm from "./AutorizationWithForm.js";
import * as Auth from './Auth.js';
import { useHistory } from "react-router-dom";

function Login({ handleLogin }) {
    const loginHistory = useHistory();
    function handleSubmit(email, password) {
        Auth.authorize(email, password)
        .then((data) => {
            if (data.token){
                handleLogin();
                loginHistory.push('/');
            }  
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="page">
            <AutorizationWithForm
                title={'Вход'}
                link={'signup'}
                linkTitle={'Регистрация'}
                buttonTitle={'Войти'}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Login;