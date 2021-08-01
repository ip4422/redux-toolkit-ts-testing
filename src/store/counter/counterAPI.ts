// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve, reject) =>
    setTimeout(() => {
      const resultAmount = Math.floor(Math.random() * (10 + amount))
      if (resultAmount % 2) {
        resolve({ data: resultAmount })
      } else {
        reject(new Error('Oops! Random amount is odd'))
      }
    }, 500)
  )
}
