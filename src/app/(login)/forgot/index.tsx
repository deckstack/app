import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, Input, Logo } from "@components"
import { Data } from "./types"
import { post } from "@functions/server"
import { router } from "expo-router"

export default () => {
  const [user, setUser] = useState<Data>({})
  const [phase, setPhase] = useState<number>(1)

  async function handlerPressButton() {
    if (phase === 1) {
      if (!user.email) return alert("Informe o e-mail")

      const response = await post<any>("user/forgot", {
        email: user.email,
      })

      if (response.sucess) {
        if (response.status === 208)
          alert(
            "Ops! Parece que já requisitou o código de verificação, verifique sua caixa de entrada!"
          )
        else alert("Um e-mail de confirmação foi enviado")
        setPhase(2)
      }
      return
    }

    if (
      !user.email ||
      !user.password ||
      !user.passwordConfirmation ||
      !user.token
    )
      return alert("Informe todos os campos")

    console.log(user)
    const response = await post<any>("user/reset", {
      ...user,
    })

    if (!response.sucess) return alert(response.message)

    alert("Senha alterada com sucesso!")
    router.back()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label={"E-mail"}
            value={user?.email}
            disabled={phase > 1}
            onChangeText={(text) => setUser({ ...user, email: text })}
          />
          <Input
            label={"Senha"}
            type={"password"}
            value={user?.password}
            disabled={phase < 2}
            onChangeText={(text) => setUser({ ...user, password: text })}
          />
          <Input
            label={"Confirmaçaõ de senha"}
            type={"password"}
            value={user?.passwordConfirmation}
            disabled={phase < 2}
            onChangeText={(text) =>
              setUser({ ...user, passwordConfirmation: text })
            }
          />
          <Input
            label={"Código de verificação"}
            value={user?.token}
            disabled={phase < 2}
            onChangeText={(text) => setUser({ ...user, token: text })}
          />
          <Button
            label={phase === 1 ? "Requisitar alteração" : "Alterar senha"}
            onPress={handlerPressButton}
          />
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
