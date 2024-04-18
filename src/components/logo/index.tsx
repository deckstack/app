import { Image, StyleSheet, View } from "react-native"

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ resizeMode: "contain", width: "100%", height: "100%" }}
        source={require("@assets/logo.png")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})
