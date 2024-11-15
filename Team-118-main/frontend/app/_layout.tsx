import { Stack  } from "expo-router";
import TrialPage from "./TrialPage";

export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
      <Stack.Screen name="Trial Page" />
    </Stack>
  );
}
