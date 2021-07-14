import React from 'react'
import { useQuery } from 'react-query'

function PopularTags({ onTagClick }) {
  const { data, isFetching, isError } = useQuery('/tags', { placeholderData: { tags: [] } })

  function content() {
    if (isFetching) return <p>Loading tags...</p>
    if (isError) return <p>Loading tags failed :(</p>

    return data.tags.map((tag) => (
      <a
        href="#"
        key={tag}
        className="tag-pill tag-default"
        onClick={(e) => {
          e.preventDefault()

          onTagClick(tag)
        }}
      >
        {tag}
      </a>
    ))
  }

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">{content()}</div>
    </div>
  )
}

export default PopularTags
