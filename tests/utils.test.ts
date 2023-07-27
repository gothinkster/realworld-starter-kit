import { describe, expect, it } from 'vitest'
import { formatDate } from '@/utils'

describe('formatDate', () => {
  it('should return a formatted date', () => {
    const date = '2021-01-01'
    const formattedDate = formatDate(date)

    expect(formattedDate).toBe('January 1, 2021')
  })
})
