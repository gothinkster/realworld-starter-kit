// @ts-ignore

/**
 * NOTE: This file does not actually export anything except of JSDoc Interfaces/typeDefs
 */

// JSON Objects returned by API:
// https://github.com/gothinkster/realworld/tree/master/api#json-objects-returned-by-api
/**
 * User
 * https://github.com/gothinkster/realworld/tree/master/api#users-for-authentication
 *
 * @typedef {{
      email: string,
      token: string,
      username: string,
      bio: string,
      image: string | null
    }} User
*/

/**
 * Profile
 * https://github.com/gothinkster/realworld/tree/master/api#profile
 *
 * @typedef {{
      username: string,
      bio: string,
      image: string,
      following: boolean
    }} Profile
*/

/**
 * SingleArticle
 * https://github.com/gothinkster/realworld/tree/master/api#single-article
 *
 * @typedef {{
      slug: string,
      title: string,
      description: string,
      body: string,
      tagList: Tag[],
      createdAt: string,
      updatedAt: string,
      favorited: boolean,
      favoritesCount: 0,
      author: Profile
    }} SingleArticle
 */

/**
 * MultipleArticles
 * https://github.com/gothinkster/realworld/tree/master/api#multiple-articles
 *
 * @typedef {{
      articles: SingleArticle[],
      articlesCount: number
    }} MultipleArticles
 */

/**
 * SingleComment
 * https://github.com/gothinkster/realworld/tree/master/api#single-comment
 *
 * @typedef {{
      id: number,
      createdAt: string,
      updatedAt: string,
      body: string,
      author: Profile
    }} SingleComment
 */

/**
 * MultipleComments
 * https://github.com/gothinkster/realworld/tree/master/api#multiple-comments
 *
 * @typedef {{
      comments: SingleComment[]
    }} MultipleComments
 */

/**
 * Tag
 * https://github.com/gothinkster/realworld/tree/master/api#list-of-tags
 *
 * @typedef {string} Tag
*/

/**
 * MultipleTags
 * https://github.com/gothinkster/realworld/tree/master/api#multiple-articles
 *
 * @typedef {{
  tags: Tag[],
}} MultipleTags
*/

/**
 * Error
 * https://github.com/gothinkster/realworld/tree/master/api#errors-and-status-codes
 *
 * @typedef {{ body: string[] }} Error
*/

// Endpoints:
// https://github.com/gothinkster/realworld/tree/master/api#endpoints

/**
 * Authentication
 * https://github.com/gothinkster/realworld/tree/master/api#authentication
 *
 * @typedef {{
      email: string,
      password: string
    }} Authentication
 */

/**
 * Registration
 * https://github.com/gothinkster/realworld/tree/master/api#registration
 *
 * @typedef {{
      username: string,
      email: string,
      password: string
    }} Registration
*/

/**
 * UpdateUser
 * https://github.com/gothinkster/realworld/tree/master/api#update-user
 *
 * @typedef {{
      username?: string,
      password?: string,
      email: string,
      bio: string,
      image: string
    }} UpdateUser
*/

/**
 * CreateArticle
 * https://github.com/gothinkster/realworld/tree/master/api#create-article
 *
 * @typedef {{
      title: string,
      description: string,
      body: string,
      tagList?: Tag[]
    }} CreateArticle
*/

/**
 * UpdateArticle
 * https://github.com/gothinkster/realworld/tree/master/api#update-article
 *
 * @typedef {{
      title?: string,
      description?: string,
      body?: string,
      tagList?: Tag[]
    }} UpdateArticle
*/

/**
 * AddComment
 * https://github.com/gothinkster/realworld/tree/master/api#single-comment
 *
 * @typedef {{
      body: string
    }} AddComment
 */

// the line below is a workaround to fix 'is not a module' import error, it seems as it is needed to be recognized by JSDoc types
export class IgnoreMe {}
