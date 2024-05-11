import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

import { EmptyProps } from "./types"

export const Empty = (props: EmptyProps) => {
  const { message, subMessage } = props

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
  },
  message: {
    color: "#aaa",
    fontSize: 16,
    textAlign: "center",
  },
  subMessage: {
    color: "#aaa",
    fontSize: 14,
    textAlign: "center",
  },
})
