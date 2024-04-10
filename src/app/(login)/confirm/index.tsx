import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, Input, Logo } from "@components"
import { post } from "@functions/server"
import { router, useFocusEffect, useGlobalSearchParams } from "expo-router"
import { useUser } from "../../../contexts/user"

export default () => {
  const [token, setToken] = useState<string>("")

  const user = useUser()
  const params = useGlobalSearchParams()

  useFocusEffect(
    useCallback(() => {
      user.load()
    }, [])
  )

  async function handlerPressButton() {
    if (!token || token.length < 6)
      return alert("Código de verificação inválido")

    const confirm = await post<any>("user/confirm/", {
      username: user.data.username,
      token,
    })
    console.log(confirm)
    if (!confirm.sucess) return alert(confirm.message)

    const result = await post<any>("user/login/", {
      username: user.data.username,
      password: params.password,
    })

    if (!result.sucess) return alert(result.message)

    user.save({ ...result.data })

    router.replace("/(tabs)")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.inputContainer}>
          <Input
            label={"Código de verificação"}
            maxLength={6}
            value={token}
            onChangeText={(text) => setToken(text)}
          />
          <Button label={"Confirmar"} onPress={handlerPressButton} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 40,
  },
  topContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  textEmphasis: {
    fontSize: 34,
    fontWeight: "bold",
  },
  inputContainer: {
    gap: 20,
  },
  input: {
    height: 60,
    width: "100%",
  },
  forgotText: {
    fontSize: 14,
    color: "#aaa",
    flex: 1,
    textAlign: "right",
  },
  buttonShadow: {
    width: 90,
    height: 60,
    borderRadius: 8,
    borderLeftColor: "#00000011",
    borderLeftWidth: 4,
    borderBottomColor: "#00000011",
    borderBottomWidth: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
})
