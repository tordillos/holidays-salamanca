import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { CalendarSearch } from "@/components/icons/calendar-search";
import { Info } from "@/components/icons/info";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Féstivos",
          tabBarIcon: ({ color }) => (
            <CalendarSearch color={color} height={25} width={25} />
          ),
          headerRight: () => (
            <Link href="/about" asChild>
              <Pressable>
                <Info
                  width={25}
                  height={25}
                  className="mr-6 text-black active:opacity-50"
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
