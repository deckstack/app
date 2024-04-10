import { Slot, Stack } from "expo-router"
import { UserProvider } from "../contexts/user"

export default function AppLayout() {
  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  )
}
