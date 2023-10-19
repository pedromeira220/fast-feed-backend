import { Either, failure, success } from './either'

const doSomething = (shouldSuccess: boolean): Either<string, number> => {
  if (shouldSuccess) {
    return success(10)
  } else {
    return failure('failure')
  }
}

test('success result', async () => {
  const result = doSomething(true)

  expect(result.isSuccess()).toBe(true)
  expect(result.isFailure()).toBe(false)

  if (result.isSuccess()) {
    expect(result.value).toBe(10)
  }
})

test('failure result', async () => {
  const result = doSomething(false)

  expect(result.isSuccess()).toBe(false)
  expect(result.isFailure()).toBe(true)

  if (result.isFailure()) {
    expect(result.value).toBe('failure')
  }
})
