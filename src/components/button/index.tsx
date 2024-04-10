import { useState } from "react"
import { Pressable, View, Text, StyleSheet } from "react-native"

import { ButtonProps } from "./types"

export const Button = (props: ButtonProps) => {
  const { disabled, label, onPress } = props

  const [pressIn, setPressIn] = useState(false)

  return (
    <Pressable
      style={styles.container}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
    >
      <View style={{ ...styles.defaultContainer, ...styles.topContainer }} />
      <View style={{ ...styles.defaultContainer, ...styles.labelContainer }}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={{ ...styles.defaultContainer, ...styles.bottonContainer }} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    maxHeight: 64,
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultContainer: {
    height: 50,
    width: "96.8%",
    borderRadius: 6,
  },
  labelContainer: {
    backgroundColor: "#000",
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  topContainer: {
    position: "absolute",
    backgroundColor: "#FFE333",
    top: 0,
    left: 0,
  },
  bottonContainer: {
    position: "absolute",
    backgroundColor: "#8E2ADD",
    bottom: 0,
    right: 0,
  },
})
