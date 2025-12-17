import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="posts"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
        }}
      />
    </Tabs>
  );
}
