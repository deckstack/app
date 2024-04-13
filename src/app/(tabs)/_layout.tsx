import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Tabs } from "expo-router"

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      // tabBar={() => <View style={{ width: "100%", height: 40 }}></View>}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="home" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="trophy" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="cart" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons name="account" size={24} />
          ),
        }}
      />
    </Tabs>
  )
}
