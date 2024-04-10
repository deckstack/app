import { StyleSheet, Text, View } from "react-native"

export const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.defaultContainer, ...styles.topContainer }} />
      <Text style={styles.label}>DeckStack</Text>
      <View style={{ ...styles.defaultContainer, ...styles.bottonContainer }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: 240,
    maxHeight: 64,
    minHeight: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultContainer: {
    height: 50,
    width: "96%",
  },
  labelContainer: {
    backgroundColor: "#000",
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  label: {
    color: "#000",
    fontSize: 56,
    fontWeight: "900",
    textShadowColor: "#fff",
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 1,
    zIndex: 10,
    paddingHorizontal: 8,
  },
  topContainer: {
    position: "absolute",
    backgroundColor: "#FFE333",
    zIndex: 2,
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
