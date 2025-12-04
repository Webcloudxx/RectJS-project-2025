import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { create } from '../../services/eventService.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import '../../styles/forms.css';

const initialValues = {
  title: '',
  location: '',
  date: '',
  time: '',
  imageUrl: '',
  description: ''
};

export function CreateEvent() {
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();

  const { values, changeHandler, submitHandler } = useForm(initialValues, async (formValues) => {
    if (!formValues.title || !formValues.location || !formValues.description) {
      alert('Title, location and description are required');
      return;
    }

    try {
      const created = await create(formValues, accessToken);
      navigate(`/events/${created._id}`);
    } catch (err) {
      alert(err.message);
    }
  });

  return (
    <section className="form-section">
      <h2>Create Event</h2>

      <form className="entity-form" onSubmit={submitHandler}>
        <label>
          Title:
          <input
            name="title"
            value={values.title}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Location:
          <input
            name="location"
            value={values.location}
            onChange={changeHandler}
            required
          />
        </label>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={changeHandler}
          />
        </label>

        <label>
          Time:
          <input
            type="time"
            name="time"
            value={values.time}
            onChange={changeHandler}
          />
        </label>

        <label>
          Image URL:
          <input
            name="imageUrl"
            value={values.imageUrl}
            onChange={changeHandler}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={values.description}
            onChange={changeHandler}
            required
          />
        </label>

        <button type="submit">Create</button>
      </form>
    </section>
  );
}