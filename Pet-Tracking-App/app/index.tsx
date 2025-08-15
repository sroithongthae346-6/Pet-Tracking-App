import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center items-center">
      <Text className="text-2xl text-primary">Hay Welcome!</Text>
      <Link href="/onboarding">
        <Text className="text-lg text-secondary">Get Started</Text>
      </Link>
    </View>
  );
}
