module.exports = {
  async get (ctx) {
    const tags = await ctx.app.db('tags').select('name')

    ctx.body = {tags: tags.map(t => t.name)}
  }
}
