import React                from 'react'
import { Auth }             from 'actions';
import { reduxForm, Field }        from 'redux-form'
import submit               from './submit'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting, loginState } = props
  const submitError = !!loginState ?
                      !!loginState.submitErrors ? Object.values(loginState.submitErrors).join().split(',').join('') : ""
                      : "";
  return (
    <form onSubmit={handleSubmit(submit)}>
        {!!submitError && <div className="err-msg">{submitError}</div>}
        <div className="frm-msg-ttl">Login</div>
      <Field
        name="email"
        type="text"
        component={renderField}
        label="Username"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
      {error && <strong>{error}</strong>}
      <div className="form-btm">
        <button type="submit" disabled={submitting}>
          Log In
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'login' // a unique identifier for this form
})(LoginForm)
