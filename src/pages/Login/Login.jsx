import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useAddLoginData, useLoginMe} from "../../CustomHooks/useAuth";
import {Link, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import EyeIcon from "../../static/img/eye-fill.svg"
import EyeOffIcon from "../../static/img/eye-off-fill.svg"
import {showSuccessNotification, showErrorNotification} from "../../CustomHooks/useToast";
import HourGlass from "../../Ui/HourGlass/HourGlass";
import "../../styles/login.scss"

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const {
        mutate: addLogin,
        data,
        isLoading,
        isError,
        error
    } = useAddLoginData(showSuccessNotification, showErrorNotification);
    const {refetch} = useLoginMe();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            addLogin(formData)
        }
    };

    const validateForm = (data) => {
        const errors = {};
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!data.email) {
            errors.email = 'Электронная почта обязательна';
        } else if (!re.test(String(data.email).toLowerCase())) {
            errors.email = 'Электронная почта недействительна';
        }

        if (!data.password) {
            errors.password = 'Необходим пароль';
        } else if (data.password.length < 5) {
            errors.password = 'Пароль должен быть не менее 5 символов';
        }

        return errors
    };

    if (data?.data?.token) {
        window.localStorage.setItem("token", data?.data?.token)
        refetch()
    }

    if (isAuthenticated) {
        return <Navigate to="/"/>
    }

    return (
        <Helmet title="Login">
            <section className="login">
                <div className="container">
                    <form onSubmit={onSubmit} className="form login__form">
                        <div className="login__main">
                            <h3 className="login__description">Логин</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                autoComplete="on"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">электронная почта</span>
                            </label>
                        </div>
                        {
                            formErrors.email && <p className="error">*{formErrors.email}</p>
                        }
                        <div className="field login__field">
                            <input
                                className="field__input"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                autoComplete="on"
                                onChange={handleInputChange}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text password__span">пароль</span>
                            </label>
                            <img onClick={() => setShowPassword(!showPassword)} className="field__eye" src={showPassword ? EyeOffIcon : EyeIcon} alt="EyeIcon"/>
                        </div>
                        {
                            formErrors.password && <p className="error">*{formErrors.password}</p>
                        }
                        <Link to="/forgot-password">
                            <p className="reset-password">
                                Forgot password?
                            </p>
                        </Link>
                        {
                            isError && <div className="login__message login__error">
                                <p className="login__message-title">{error?.response?.data}</p>
                            </div>
                        }
                        {
                            data?.data?.message && <div className="login__message">
                                <p className="login__message-title">{data?.data?.message}</p>
                            </div>
                        }
                        <div className="checkbox__items">
                            <button className="checkbox__btn" type="submit" disabled={isLoading}>
                                {
                                    isLoading ? (
                                        <HourGlass/>
                                    ) : (
                                        "Отправить"
                                    )
                                }
                            </button>

                        </div>
                        <div className="form__under-text">
                            У вас еще нет аккаунта?<Link className="form__link" to='/register'>Зарегистрироваться
                            сейчас</Link>
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default Login;