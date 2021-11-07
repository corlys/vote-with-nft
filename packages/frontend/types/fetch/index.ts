export interface ResponseData<T> {
  payload: T
  message: string
}

export interface Signature {
  sig: string
  address: string
}
