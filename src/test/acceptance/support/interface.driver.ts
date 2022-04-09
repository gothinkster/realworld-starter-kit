export interface ProtocolDriver {
  init(): Promise<void>
  stop(): Promise<void>

  loginAs(user: Users)
}

export interface ArticleFilters {
  tags?: string[]
  author?: Users
}

export enum Users {
  Me = 'santunioni',
  Costello = 'Costello',
  Abbott = 'Abbott',
}
