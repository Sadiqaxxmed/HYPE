import { useAuth } from '@/context/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';


export default function LoginScreen() {
  const { signIn } = useAuth(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HYPE</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.forgotPasswordButtonText}>Forgot your password?</Text>
      <Pressable style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}> Login </Text>  
      </Pressable> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    fontFamily: 'Pacifico',
    marginBottom: 50,
    alignSelf: 'center',
    color: 'rgb(194, 94, 94)'
  },
  input: {
    height: 45,
    color: 'gray',
    borderColor: 'gray',
    borderWidth: 1.5,
    marginBottom: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'rgb(194, 94, 94)',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  forgotPasswordButtonText: {
    bottom: 10,
    left: 190,
    fontSize: 15,
    fontWeight: '600',
    color: 'rgb(194, 94, 94)'
  }
});

