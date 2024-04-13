/* Dependencies */
import React from "react"
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native"

import { LoaderProps } from "./type"

export const Loader = (props: LoaderProps) => {
  const { visible = false } = props

  return (
    <>
      <Modal animationType={"fade"} transparent={true} visible={visible}>
        <View style={styles.container}>
          <View style={styles.indicator}>
            <ActivityIndicator
              animating={true}
              color={"#000000"}
              size={"large"}
            />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff8",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  indicator: {
    alignItems: "center",
    borderRadius: 10,
    display: "flex",
    height: 100,
    justifyContent: "space-around",
    width: 100,
  },
})
