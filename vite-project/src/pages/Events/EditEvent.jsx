import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';
import { getOne, update } from '../../services/eventService.js';
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

export function EditEvent() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { accessToken } = useAuthContext();

  const { values, setValues, changeHandler, submitHandler } = useForm(initialValues, async (formValues) => {
    try {
      await update(eventId, formValues, accessToken);
      navigate(`/events/${eventId}`);
    } catch (err) {
      alert(err.message);
    }
  });

  useEffect(() => {
    getOne(eventId)
      .then((data) => {
        setValues({
          title: data.title,
          location: data.location,
          date: data.date,
          time: data.time,
          imageUrl: data.imageUrl || '',
          description: data.description
        });
      })
      .catch((err) => alert(err.message));
  }, [eventId, setValues]);

  return (
    <section className="form-section">
      <h2>Edit Event</h2>

      <form className="entity-form" onSubmit={submitHandler}>
        <label>
          Title:
          <input name="title" value={values.title} onChange={changeHandler} />
        </label>
        <label>
          Location:
          <input name="location" value={values.location} onChange={changeHandler} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={values.date} onChange={changeHandler} />
        </label>
        <label>
          Time:
          <input type="time" name="time" value={values.time} onChange={changeHandler} />
        </label>
        <label>
          Image URL:
          <input name="imageUrl" value={values.imageUrl} onChange={changeHandler} />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={values.description}
            onChange={changeHandler}
          />
        </label>

        <button type="submit">Save</button>
      </form>
    </section>
  );
}