import { FontAwesome6 } from "@expo/vector-icons"
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import colors from "@constants/colors"
import { useUser } from "@contexts/user"

export default () => {
  const user = useUser()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.35,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.mainFifith,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            gap: 6,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderColor: colors.textWhite,
              borderWidth: 2,
            }}
          >
            <Image style={{}} source={require("@assets/logo.png")} />
          </View>
          <Text
            style={{
              color: colors.textWhite,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {user.data.name}
          </Text>
          <Text
            style={{
              color: colors.textWhite,
              fontSize: 16,
            }}
          >
            @{user.data.username}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.65,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            top: -20,
            gap: 20,
            paddingHorizontal: 20,
          }}
        >
          <Pressable style={styles.highlightOption}>
            <Text>Jogos</Text>
            <Text>
              {20}/{10} (30)
            </Text>
          </Pressable>
          <Pressable style={styles.highlightOption}>
            <Text>Trocas/Compras</Text>
            <Text>{125}</Text>
          </Pressable>
        </View>
        <ScrollView
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: "100%",
              paddingVertical: 4,
              gap: 10,
            }}
          >
            <Pressable style={styles.option}>
              <View style={styles.optionIcon}>
                <FontAwesome6
                  name="trophy"
                  color={colors.mainFifith}
                  size={20}
                />
              </View>
              <Text style={styles.optionText}>Ranque</Text>
            </Pressable>
            <Pressable style={styles.option}>
              <View style={styles.optionIcon}>
                <FontAwesome6 name="gear" color={colors.mainFifith} size={20} />
              </View>
              <Text style={styles.optionText}>Configurações</Text>
            </Pressable>
            <Pressable onPress={() => user.logout()} style={styles.option}>
              <View
                style={{ ...styles.optionIcon, backgroundColor: "#ee000022" }}
              >
                <FontAwesome6
                  name="arrow-right-to-bracket"
                  color={"#ee0000"}
                  size={20}
                />
              </View>
              <Text style={{ ...styles.optionText, color: "#ee0000" }}>
                Sair
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  highlightOption: {
    borderRadius: 8,
    backgroundColor: colors.mainBackground,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    elevation: 2,
  },
  option: {
    width: "100%",
    height: 80,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: colors.mainBackground,
    borderRadius: 8,
  },
  optionIcon: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    backgroundColor: `${colors.mainFifith}22`,
  },
  optionText: {
    color: colors.textBlack,
    fontSize: 22,
    fontWeight: "400",
  },
})
