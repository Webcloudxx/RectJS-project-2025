import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { login as loginRequest } from '../../services/authService.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import '../../styles/forms.css';

const initialValues = { email: '', password: '' };

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthContext();

  const { values, changeHandler, submitHandler } = useForm(initialValues, async (formValues) => {
    try {
      const result = await loginRequest(formValues.email, formValues.password);
      login(result);

      const redirectPath = location.state?.from?.pathname || '/';
      navigate(redirectPath);
    } catch (err) {
      alert(err.message);
    }
  });

  return (
    <section className="auth-section">
      <h2>Login</h2>

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
          Password:
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={changeHandler}
            required
          />
        </label>

        <button type="submit">Login</button>
      </form>
    </section>
  );
}