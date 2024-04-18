import React, { createContext, useContext, useState } from "react"
import * as SecureStore from "expo-secure-store"

import { ContextProps, User } from "./types"

const STORAGE_KEY = "user"
export const Context = createContext<ContextProps>({} as ContextProps)

export function useUser() {
  return useContext(Context)
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<User>({})

  async function load() {
    const user = await JSON.parse(
      (await SecureStore.getItemAsync(STORAGE_KEY)) ?? "{}"
    )
    setData(user)
    return user as User
  }

  async function save(user: User) {
    setData(user)
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(user))
  }

  async function unload() {
    setData({})
    await SecureStore.deleteItemAsync(STORAGE_KEY)
  }

  return (
    <Context.Provider value={{ load, save, unload, data }}>
      {children}
    </Context.Provider>
  )
}
