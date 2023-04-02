export type Dated = {
  readonly createdAt: Date
  readonly updatedAt: Date
}

export type Sluged = {
  slug: string
}

export interface Article {
  title: string
  description: string
  body: string
}

export type Tagged = {
  tags: string[]
}

export type Authored = {
  author: {
    id: number
  }
}
