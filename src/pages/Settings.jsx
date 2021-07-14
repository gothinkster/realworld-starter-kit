import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { http, logout, setAuthUser } from '../utils'
import { useUserQuery } from '../hooks'
import { FormErrors } from '../components'

function Settings() {
  const {
    data: { user },
  } = useUserQuery()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  async function onSubmit(values, { setErrors }) {
    try {
      const { data } = await http.put(`/user`, { user: values })

      const updatedUsername = data?.user?.username

      setAuthUser(data?.user)

      queryClient.invalidateQueries(`/profiles/${updatedUsername}`)
      queryClient.invalidateQueries(`/user`)

      navigate(`/profile/${updatedUsername}`)
    } catch (error) {
      const { status, data } = error.response

      if (status === 422) {
        setErrors(data.errors)
      }
    }
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <Formik onSubmit={onSubmit} initialValues={user} enableReinitialize>
              {({ isSubmitting }) => (
                <>
                  <FormErrors />
                  <Form>
                    <fieldset disabled={isSubmitting}>
                      <fieldset className="form-group">
                        <Field name="image" className="form-control" type="text" placeholder="URL of profile picture" />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="username"
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Your Name"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          as="textarea"
                          name="bio"
                          className="form-control form-control-lg"
                          rows={8}
                          placeholder="Short bio about you"
                        />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field name="email" className="form-control form-control-lg" type="text" placeholder="Email" />
                      </fieldset>
                      <fieldset className="form-group">
                        <Field
                          name="password"
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                        />
                      </fieldset>
                      <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                        Update Settings
                      </button>
                    </fieldset>
                  </Form>
                </>
              )}
            </Formik>
            <hr />
            <button onClick={() => logout()} type="button" className="btn btn-outline-danger">
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
