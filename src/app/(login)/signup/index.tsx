import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Button, Input, Logo } from "@components"
import { Data } from "./types"
import { post } from "@functions/server"
import { router } from "expo-router"

export default () => {
  const [user, setUser] = useState<Data>({})

  async function handlerPress() {
    const response = await post<any>("user/new", {
      ...user,
      name: user.username,
    })

    if (!response.sucess) return alert(response.message)

    alert("Usuário criado com sucesso")
    router.back()
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <Input
              label={"Nome de usuário"}
              value={user?.username}
              onChangeText={(text) => setUser({ ...user, username: text })}
            />
            <Input
              label={"E-mail"}
              value={user?.email}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
            <Input
              label={"Confirmação de e-mail"}
              value={user?.emailConfirmation}
              onChangeText={(text) =>
                setUser({ ...user, emailConfirmation: text })
              }
            />
            <Input
              label={"Senha"}
              type={"password"}
              value={user?.password}
              onChangeText={(text) => setUser({ ...user, password: text })}
            />
            <Input
              label={"Confirmação de senha"}
              type={"password"}
              value={user?.passwordConfirmation}
              onChangeText={(text) =>
                setUser({ ...user, passwordConfirmation: text })
              }
            />
            <Button label={"Criar conta"} onPress={handlerPress} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingTop: 100,
    paddingBottom: 40,
    gap: 40,
  },
  contentContainer: {
    justifyContent: "center",
    gap: 20,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
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
