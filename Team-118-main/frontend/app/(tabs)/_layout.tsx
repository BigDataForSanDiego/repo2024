import { TabBarIcon } from "@/components/navigation/TabBarIcon";

import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                        borderTopWidth: 1,
                    }
                }}
            >
                <Tabs.Screen 
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarLabelPosition: 'below-icon',
                        tabBarIcon: ({ color, focused }) => (
                          <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="messages"
                    options={{
                    title: 'Messages',
                    headerShown: false,
                    tabBarLabelPosition: 'below-icon',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'chatbubbles' : 'chatbubbles-outline'} color={color} />
                    ),
                    }}
                />
                <Tabs.Screen
                    name="records"
                    options={{
                    title: 'Records',
                    headerShown: false,
                    tabBarLabelPosition: 'below-icon',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'folder' : 'folder-outline'} color={color} />
                    ),
                    }}
                />
                <Tabs.Screen
                    name="notifications"
                    options={{
                    title: 'Notifications',
                    headerShown: false,
                    tabBarLabelPosition: 'below-icon',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
                    ),
                    }}
                />
            </Tabs>
        </>
    )
}

