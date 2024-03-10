import React, {useState} from 'react';
import Helmet from "../../layout/Helmet";
import {useChangePassword} from "../../CustomHooks/useAuth";
import {Navigate} from "react-router-dom";
import {showSuccessNotification, showErrorNotification} from "../../CustomHooks/useToast";
import EyeIcon from "../../static/img/eye-fill.svg"
import EyeOffIcon from "../../static/img/eye-off-fill.svg"

const UpdatePassword = () => {

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const {mutate: updatePassword, data: updatedData, isLoading: updateLoading, isSuccess} = useChangePassword(showSuccessNotification, showErrorNotification);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            updatePassword(formData)
        }
    }

    if (isSuccess) {
        return <Navigate to="/profile"/>
    }

    const validateForm = (data) => {
        const errors = {};

        if (!data.oldPassword) {
            errors.oldPassword = 'Необходим пароль';
        } else if (data.oldPassword.length < 5) {
            errors.oldPassword = 'Старый пароль должен быть не менее 5 символов';
        }

        if (!data.newPassword) {
            errors.newPassword = 'Необходим пароль';
        } else if (data.newPassword.length < 5) {
            errors.newPassword = 'Новый пароль должен быть не менее 5 символов';
        }

        if (data.newPassword !== data.confirmPassword) {
            errors.confirmPassword = 'Пароль не совпадает';
        }

        return errors;
    };

    return (
        <Helmet title="Update Password">
            <section className="login">
                <div className="container">
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="login__main">
                            <h3 className="login__description">Изменить пароль</h3>
                        </div>
                        <div className="field login__field">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                id="oldPassword"
                                name="oldPassword"
                                autoComplete="off"
                                value={formData.oldPassword}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="firstName" className="label-wrapper">
                                <span className="label-text">Старый пароль</span>
                            </label>
                            <img onClick={() => setShowOldPassword(!showOldPassword)} className="field__eye" src={showOldPassword ? EyeOffIcon : EyeIcon} alt="EyeIcon"/>
                        </div>
                        {
                            formErrors.oldPassword && <p className="error">*{formErrors.oldPassword}</p>
                        }
                        {
                            updatedData?.response?.data && <p className="error">*{updatedData?.response?.data}</p>
                        }
                        <div className="field">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                autoComplete="off"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="lastName" className="label-wrapper">
                                <span className="label-text">Новый пароль</span>
                            </label>
                            <img onClick={() => setShowPassword(!showPassword)} className="field__eye" src={showPassword ? EyeOffIcon : EyeIcon} alt="EyeIcon"/>
                        </div>
                        {
                            formErrors.newPassword && <p className="error">*{formErrors.newPassword}</p>
                        }
                        <div className="field">
                            <input
                                type={showConfPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                autoComplete="off"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                            <label htmlFor="lastName" className="label-wrapper">
                                <span className="label-text">Подтвердите пароль</span>
                            </label>
                            <img onClick={() => setShowConfPassword(!showConfPassword)} className="field__eye" src={showConfPassword ? EyeOffIcon : EyeIcon} alt="EyeIcon"/>
                        </div>
                        {
                            formErrors.confirmPassword && <p className="error">*{formErrors.confirmPassword}</p>
                        }
                        <div className="checkbox__items">
                            <button className="checkbox__btn"
                                    type="submit"
                                    disabled={updateLoading}>
                                Отправить
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </Helmet>
    );
};

export default UpdatePassword;