import { Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/auth';

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button title="Log out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
