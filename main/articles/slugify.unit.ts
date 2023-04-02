import { slugify } from './slugify'

describe('slugify', () => {
  it('should return a slugified version of the input string', () => {
    expect(slugify('Hello, world!')).toEqual('hello-world')
    expect(slugify('This is a test')).toEqual('this-is-a-test')
    expect(slugify(' Testing  123 ')).toEqual('testing-123')
    expect(slugify('héllo wórld')).toEqual('hello-world')
    expect(slugify('Über Café 42')).toEqual('ueber-cafe-42')
    expect(slugify('3 things to know about Pokémon GO')).toEqual(
      '3-things-to-know-about-pokemon-go',
    )
  })

  it('should handle special characters', () => {
    expect(slugify('!@#$%^&*()_+{}:"|<>?-=[];\',./`~')).toEqual('')
  })

  it('should handle empty string', () => {
    expect(slugify('')).toEqual('')
  })
})
