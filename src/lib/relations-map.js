const userFields = ['id', 'image', 'bio', 'username']

const articleFields = [
  'id',
  'slug',
  'title',
  'body',
  'description',
  'favorites_count',
  'created_at',
  'updated_at'
]

// const commentFields = [
//   'id',
//   'body',
//   'created_at',
//   'updated_at'
// ]

const relationsMaps = [
  {
    mapId: 'articleMap',
    idProperty: 'id',
    properties: [...articleFields, 'favorited'],
    associations: [
      {name: 'author', mapId: 'userMap', columnPrefix: 'author_'}
    ],
    collections: [
      {name: 'tagList', mapId: 'tagMap', columnPrefix: 'tag_'}
    ]
  },
  {
    mapId: 'userMap',
    idProperty: 'id',
    properties: [...userFields, 'following']
  },
  {
    mapId: 'tagMap',
    idProperty: 'id',
    properties: ['id', 'name']
  }
]

exports.relationsMaps = relationsMaps
exports.userFields = userFields
exports.articleFields = articleFields
