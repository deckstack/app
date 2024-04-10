import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Link, router } from "expo-router"
import { Data } from "./types"

import { Button, Input, Logo } from "@components"
import { post } from "../../functions/server"
import { useUser } from "../../contexts/user"

export default () => {
  const [data, setData] = useState<Data>({})

  const user = useUser()

  async function handlerLogin() {
    const result = await post<any>(`user/login/`, data)
    if (!result.sucess)
      if (result.status === 401) {
        user.save({ username: data.username })
        return router.push(`confirm?password=${data.password}`)
      } else return alert(result.message)

    router.replace("/(tabs)")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>
        <View style={styles.inputContainer}>
          <Input
            label={"Usuário"}
            value={data?.username}
            onChangeText={(text) => setData({ ...data, username: text })}
          />
          <Input
            label={"Senha"}
            type={"password"}
            value={data?.password}
            onChangeText={(text) => setData({ ...data, password: text })}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link style={styles.forgotText} href={"./forgot/"}>
              Esqueceu a Senha ?
            </Link>
          </View>
          <Button label={"Login"} onPress={handlerLogin} />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 10,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ backgroundColor: "#ddd", height: 1, flex: 1 }} />
          <Text style={{ color: "#999" }}>Ou continue com</Text>
          <View style={{ backgroundColor: "#ddd", height: 1, flex: 1 }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20,
            gap: 20,
          }}
        >
          <Pressable
            style={styles.buttonShadow}
            // onPress={}
          >
            <MaterialCommunityIcons name={"google"} size={30} color={"#ddd"} />
          </Pressable>
          <Pressable
            style={styles.buttonShadow}
            // onPress={}
          >
            <MaterialCommunityIcons name={"apple"} size={30} color={"#ddd"} />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.text}>se não tiver uma conta</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text}>você pode se </Text>
          <Link
            style={{
              ...styles.text,
              color: "#8E2ADD",
              fontWeight: "bold",
            }}
            href={"./signup/"}
          >
            registrar aqui!
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 40,
  },
  topContainer: {
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
