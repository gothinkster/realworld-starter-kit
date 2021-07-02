import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { http } from '../utils'

function SignIn() {
  const navigate = useNavigate()

  async function onSubmit(values) {
    try {
      const { data } = await http.post('/users/login', { user: values })

      window.localStorage.setItem('jwtToken', btoa(JSON.stringify(data.user)))

      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/register">Need an account?</Link>
            </p>
            <Formik onSubmit={onSubmit} initialValues={{ email: '', password: '' }}>
              {({ isSubmitting }) => (
                <>
                  <ul className="error-messages">
                    <li>That email is already taken</li>
                  </ul>
                  <Form>
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
                      Sign in
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

export default SignIn
