import React from 'react'
import { FieldArray, reduxForm, Field } from 'redux-form'
import submit from './submit'
// import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderLanguages = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" className="btn-add-lang" onClick={() => fields.push()}>
        Add Language
      </button>
    </li>
    {fields.map((language, index) => (
      <li key={index} className="added-li">
        <button
          type="button"
          title="Remove Language"
          className="btn-rem-lang"
          onClick={() => fields.remove(index)}
        >Remove</button>
        <Field
          name={language}
          type="text"
          component={renderField}
          label={`Language #${index + 1}`}
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)

const SignupForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="frm-msg-ttl">Signup</div>
      <Field
        name="name"
        type="text"
        component={renderField}
        label="Name"
      />
      <Field
        name="email"
        type="text"
        component={renderField}
        label="Email"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      <FieldArray name="languages" component={renderLanguages} />
      {error && <strong>{error}</strong>}
      <div className="form-btm">
        <button type="submit" disabled={submitting}>
          Signup
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'signup' // a unique identifier for this form
})(SignupForm)
