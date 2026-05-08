import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

export default function Sobre() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Projeto</Text>

      <Text style={styles.text}>
        Este aplicativo é uma versão preliminar desenvolvida como projeto
        acadêmico, com o objetivo de apresentar a proposta de uma plataforma
        digital de apoio ao desenvolvimento biopsicossocial de crianças Atípicas: crianças com
        Transtorno do Espectro Autista (TEA), entre outros transtornos.
      </Text>

      <Text style={styles.subtitle}>Integrantes do Grupo</Text>

      <View style={styles.card}>
        <Text>Nome: Állan Ribeiro Vieira</Text>
        <Text>Matrícula: 25107225</Text>
      </View>

      <View style={styles.card}>
        <Text>Nome: Gabriel Borges dos Santos Cassimiro</Text>
        <Text>Matrícula: 24201877</Text>
      </View>

      <View style={styles.card}>
        <Text>Nome: Lucas Concentino</Text>
        <Text>Matrícula: 24201597</Text>
      </View>

      <View style={styles.card}>
        <Text>Nome: Lucas da Silva de Maria</Text>
        <Text>Matrícula: 24202179</Text>
      </View>

      <View style={styles.card}>
        <Text>Nome: Mayara Frazão Jeremias</Text>
        <Text>Matrícula: 18202710</Text>
      </View>

      <View style={styles.card}>
        <Text>Nome: Victoria Cristina Silva Gomes das Neves</Text>
        <Text>Matrícula: 25109316</Text>
      </View>

      <View style={styles.card}>
        <Button
        title="Tela Inicial"
        onPress={() => router.push('/')}
      />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#98FF98',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#eaeaea',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },

  view: {
    backgroundColor: '#98FF98',
    color:  '#98FF98',
  },
});