import { Formik, Form, Field } from 'formik'
import React from 'react'
import { useAddCommentMutation, useArticleQuery } from '../hooks'

function ArticleCommentForm() {
  const { data } = useArticleQuery()
  const { mutateAsync } = useAddCommentMutation()
  const { author } = data.article

  async function onSubmit({ body }, { resetForm }) {
    await mutateAsync({
      comment: {
        body,
      },
    })

    resetForm()
  }

  return (
    <Formik onSubmit={onSubmit} initialValues={{ body: '' }}>
      {({ isSubmitting }) => (
        <Form className="card comment-form">
          <div className="card-block">
            <Field
              name="body"
              as="textarea"
              required
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            />
          </div>
          <div className="card-footer">
            <img src={author?.image} className="comment-author-img" />
            <button disabled={isSubmitting} type="submit" className="btn btn-sm btn-primary">
              Post Comment
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ArticleCommentForm
