import { component$ } from "@builder.io/qwik"

export interface PaginationProps {
  pages: number
  currentPage: number
  base: string
}

export const Pagination = component$(
  (props: PaginationProps) => {
    if (props.pages === 1) {
      return null
    }
    return (
      <ul class="pagination">
        {'*'.repeat(props.pages).split('').map((p, rangeIndex) => (
          <li class={`page-item ${rangeIndex + 1 === props.currentPage ? 'active' : ''}`}>
            <a class="page-link" href={`${props.base}&page=${rangeIndex + 1}`}>
              {rangeIndex + 1}
            </a>
          </li>
        ))}
      </ul>
    )
  },
  {
    tagName: "nave",
  }
)
