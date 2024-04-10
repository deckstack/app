// Dependencies
import * as SplashScreen from "expo-splash-screen"
import { StatusBar } from "expo-status-bar"
import { useCallback, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

// Project
import { router } from "expo-router"
import { useUser } from "../contexts/user"

export default function App() {
  const [appIsReady, setAppIsReady] = useState<boolean>(false)

  const user = useUser()

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      user.load()

      if (!user.data?.username) router.replace("/(login)/")
      else router.replace("/(tabs)")
    } finally {
      setAppIsReady(true)
    }
  }

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
