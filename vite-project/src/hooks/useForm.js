import { useState } from 'react';

export function useForm(initialValues, onSubmitHandler) {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setValues((state) => ({
      ...state,
      [name]: value
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSubmitHandler(values);
  };

  const resetForm = () => setValues(initialValues);

  return {
    values,
    changeHandler,
    submitHandler,
    resetForm,
    setValues
  };
}