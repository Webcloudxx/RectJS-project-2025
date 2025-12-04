import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { register as registerRequest } from '../../services/authService.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import '../../styles/forms.css';

const initialValues = {
  email: '',
  username: '',
  password: '',
  rePassword: ''
};

export function Register() {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const { values, changeHandler, submitHandler } = useForm(initialValues, async (formValues) => {
    if (formValues.password !== formValues.rePassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const result = await registerRequest(
        formValues.email,
        formValues.password,
        formValues.rePassword,
        formValues.username
      );
      login(result);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  });

  return (
    <section className="auth-section">
      <h2>Register</h2>

      <form className="auth-form" onSubmit={submitHandler}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={values.username}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Repeat Password:
          <input
            type="password"
            name="rePassword"
            value={values.rePassword}
            onChange={changeHandler}
            required
          />
        </label>

        <button type="submit">Register</button>
      </form>
    </section>
  );
}