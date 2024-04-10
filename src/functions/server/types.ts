export type Response<T> = {
  status: number
  message: string
  sucess: boolean
  data: T
}
