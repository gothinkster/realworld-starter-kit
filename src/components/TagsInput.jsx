import React from 'react'

function TagsInput({ field, form }) {
  return (
    <>
      <input
        onKeyDown={(/** @type {import('react').KeyboardEvent<HTMLInputElement>} */ e) => {
          // @ts-ignore
          const { value } = e.target

          if (e.key === 'Enter') {
            e.preventDefault()

            form.setFieldValue(field.name, [...field.value, value])

            // @ts-ignore
            e.target.value = ''
          }
        }}
        type="text"
        className="form-control"
        placeholder="Enter tags"
      />
      <div className="tag-list">
        {field.value.map((tag) => (
          <span className="tag-default tag-pill">
            <i
              className="ion-close-round"
              onClick={() =>
                form.setFieldValue(
                  field.name,
                  field.value.filter((item) => item !== tag)
                )
              }
            />
            {tag}
          </span>
        ))}
      </div>
    </>
  )
}

export default TagsInput
