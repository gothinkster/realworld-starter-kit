export function slugify(title: string): string {
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;'
  const to = 'aaaaaeeeeeiiiiooooouuuunc------'

  return title
    .split('')
    .map((letter, i) =>
      letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)),
    ) // Changes ex.: from ñ to n
    .toString() // Cast to string
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-y-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
}

export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const exampleArticle = {
  title: 'How to train your dragon?',
  description: "You should train your dragon before it's too late",
  body: 'Feed it with fish',
  slug: 'how-to-train-your-dragon',
}

export const exampleTags = ['dragons', 'friendship']

export const exampleArticle2 = {
  body: 'Play with it',
}
