import { Ionicons } from "@expo/vector-icons";
import Colors from "./Colors";

export const icon = {
    index: (props: any) => <Ionicons name="home-outline" size={22} color={Colors.dark.lightGrey} {...props} />,
    explore: (props: any) => <Ionicons name="flash-outline" size={22} color={Colors.dark.lightGrey} {...props} />,
    upload: (props: any) => <Ionicons name="duplicate-outline" size={22} color={Colors.dark.lightGrey} {...props} />,
    profile: (props: any) => <Ionicons name="person-outline" size={22} color={Colors.dark.lightGrey} {...props} />

  }