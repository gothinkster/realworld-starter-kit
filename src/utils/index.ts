interface Errors {
  email: string[]
  username: string[]
  password: string[]
}

export function formatError(errors: Errors): string[] {
  const result: string[] = []

  for (const key in errors) {
    errors[key].forEach((element: string) => {
      result.push(`${key}:${element}`)
    })
  }

  return result
}

export function formattedDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
