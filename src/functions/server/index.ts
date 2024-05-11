import * as SecureStore from 'expo-secure-store'

import { Response } from './types'

export async function request<T>(
  method: 'POST' | 'GET',
  endpoint: string,
  params: any
) {
  const server = process.env.EXPO_PUBLIC_HOST_SERVER
  const port = process.env.EXPO_PUBLIC_HOST_PORT ?? '3000'
  const host = `http://${server}:${port}`
  const user = await JSON.parse(SecureStore.getItem('user') ?? '{}')

  const result = await fetch(`${host}/${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...params, token: user.token }),
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

export async function get<T>(endpoint: string, params: any) {
  return request<T>('GET', endpoint, params)
}

export async function post<T>(endpoint: string, params: any) {
  return request<T>('POST', endpoint, params)
}

