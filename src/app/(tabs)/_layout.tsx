import { AntDesign, FontAwesome6 } from "@expo/vector-icons"
import { Tabs } from "expo-router"
import { StyleSheet, TouchableOpacity, View } from "react-native"

import color from "@constants/colors"
import { StatusBar } from "expo-status-bar"

export default function TabsLayout() {
  const colors: string[] = [
    color.mainFirst,
    color.mainSecond,
    color.mainThird,
    color.mainFourth,
    color.mainFifith,
  ]

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => {
        return (
          <>
            <StatusBar backgroundColor={colors[props.state.index]} />
            <View
              style={{
                ...styles.tabBarOuter,
                backgroundColor: `${colors[props.state.index]}`,
              }}
            >
              <View style={styles.tabBarInner}>
                {props.state.routes.map((route, index) => {
                  const { options } = props.descriptors[route.key]
                  const isFocused = index === props.state.index
                  const label =
                    (options.tabBarLabel as string) ??
                    options.title ??
                    String(route.name)

                  const onPress = () => {
                    const event = props.navigation.emit({
                      type: "tabPress",
                      target: route.key,
                      canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented)
                      props.navigation.navigate(route.name, route.params)
                  }

                  const onLongPress = () => {
                    props.navigation.emit({
                      type: "tabLongPress",
                      target: route.key,
                    })
                  }

                  return (
                    <TouchableOpacity
                      key={route.key}
                      onPress={onPress}
                      onLongPress={onLongPress}
                      style={{
                        ...styles.tabRoute,
                        backgroundColor: isFocused ? colors[index] : "#000",
                        height: isFocused ? 90 : 40,
                        marginTop: isFocused ? -30 : 0,
                      }}
                    >
                      <View style={styles.icon}>
                        {options?.tabBarIcon?.({
                          focused: isFocused,
                          size: 0,
                          color: "#fff",
                        })}
                        {/*!isFocused && Boolean(label) && (
                          <Text style={{ color: "#fff" }}>{label}</Text>
                        )*/}
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          </>
        )
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: () => <AntDesign name="home" size={18} color={"#fff"} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Pesquisar",
          tabBarIcon: () => (
            <AntDesign name="search1" size={18} color={"#fff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: "",
          tabBarIcon: (props) => (
            <FontAwesome6
              name="layer-group"
              size={22}
              color={props.focused ? "#000" : "#fff"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: "Loja",
          tabBarIcon: () => (
            <AntDesign name="shoppingcart" size={18} color={"#fff"} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Perfil",
          tabBarIcon: () => <AntDesign name="user" size={18} color={"#fff"} />,
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBarOuter: {
    paddingTop: 6,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 0,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  tabBarInner: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    minHeight: 40,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#000",
    paddingBottom: 20,
  },
  tabRoute: {
    borderRadius: 18,
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
