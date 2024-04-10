import { Response } from "./types"

export async function post<T>(endpoint: string, params: any) {
  const server = process.env.HOST_SERVER ?? "100.127.187.90"
  const port = process.env.HOST_PORT ?? "3000"
  const host = `http://${server}:${port}`

  const result = await fetch(`${host}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

  const content = await result.json()

  const response: Response<T> = {
    status: result.status,
    sucess: result.ok,
    message: content?.message ?? result.statusText,
    data: content?.data as T,
  }

  return response
}
