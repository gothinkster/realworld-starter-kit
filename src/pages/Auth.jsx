import React from 'react'
import { Link, useNavigate, useMatch } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { isEmpty } from 'lodash-es'
import { http } from '../utils'

function Auth() {
  const navigate = useNavigate()
  const isRegister = useMatch('/register')

  async function onSubmit(values, actions) {
    try {
      const { data } = await http.post(`/users${isRegister ? '' : '/login'}`, { user: values })

      window.localStorage.setItem('jwtToken', btoa(JSON.stringify(data.user)))

      navigate('/')
    } catch (error) {
      const { status, data } = error.response

      if (status === 422) {
        actions.setErrors(data.errors)
      }

      // TODO: Log error to a tracking service
    }
  }

  const loginInitialValues = { email: '', password: '' }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign {isRegister ? 'up' : 'in'}</h1>
            <p className="text-xs-center">
              <Link to="/register">{isRegister ? 'Have' : 'Need'} an account?</Link>
            </p>
            <Formik
              onSubmit={onSubmit}
              initialValues={isRegister ? { ...loginInitialValues, username: '' } : loginInitialValues}
            >
              {({ isSubmitting, errors }) => (
                <>
                  {!isEmpty(errors) && (
                    <ul className="error-messages">
                      {Object.entries(errors).map(([key, messages]) =>
                        /** @type {string[]} */ (messages).map((message) => (
                          <li>
                            {key} {message}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                  <Form>
                    {isRegister && (
                      <fieldset className="form-group">
                        <Field
                          type="text"
                          name="username"
                          className="form-control form-control-lg"
                          placeholder="Your Name"
                        />
                      </fieldset>
                    )}
                    <fieldset className="form-group">
                      <Field type="email" name="email" className="form-control form-control-lg" placeholder="Email" />
                    </fieldset>
                    <fieldset className="form-group">
                      <Field
                        type="password"
                        name="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                      />
                    </fieldset>
                    <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary pull-xs-right">
                      Sign {isRegister ? 'up' : 'in'}
                    </button>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
