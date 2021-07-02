import React from 'react'
import { useQuery } from 'react-query'

function PopularTags({ onTagClick }) {
  const { data, isFetching, isError, isSuccess } = useQuery('/tags', { placeholderData: { tags: [] } })

  return (
    <div className="sidebar">
      <p>Popular Tags</p>
      <div className="tag-list">
        {isFetching && <p>Loading tags...</p>}
        {isError && <p>Loading tags failed :(</p>}
        {isSuccess &&
          data.tags.map((tag) => (
            <a
              href="#"
              key={tag}
              className="tag-pill tag-default"
              onClick={() => {
                onTagClick(tag)
              }}
            >
              {tag}
            </a>
          ))}
      </div>
    </div>
  )
}

export default PopularTags
