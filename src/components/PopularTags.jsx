import React from 'react'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'

function PopularTags() {
  const { data, isFetching, isError, isSuccess } = useQuery('/tags', { placeholderData: { tags: [] } })
  const [, setSearchParams] = useSearchParams()

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
              onClick={(e) => {
                e.preventDefault()

                setSearchParams({ tag })
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
