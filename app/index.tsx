import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { router } from 'expo-router';

export default function TelaInicial() {
  return (
    <View style={styles.container}>


<Image
    source={require('../assets/images/Atipicos.png')}
    style={styles.image}
  />


      <Text style={styles.title}>Atípicos</Text>

      <Text style={styles.text}>
        Plataforma digital de apoio ao desenvolvimento biopsicossocial
        de crianças com Transtorno do Espectro Autista (TEA).
      </Text>

      <Button
        title="Sobre o Projeto"
        onPress={() => router.push('/sobre')}
      />

      <Button
              title="Tela Inicial do terapeuta"
              onPress={() => router.push('/TherapistHomeScreen')}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  
 image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain'
 },
});