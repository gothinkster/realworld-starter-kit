export function formatError(errors: Record<string, string[]>): string[] {
  const result: string[] = []

  for (const key in errors) {
    errors[key].forEach((element: string) => {
      result.push(`${key}:${element}`)
    })
  }

  return result
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
