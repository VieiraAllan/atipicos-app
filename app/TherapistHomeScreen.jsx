import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from 'expo-router';

const patients = [
  {
    id: "1",
    name: "Criança 1",
    age: 8,
    diagnosis: "TEA nível 1",
    lastEmotion: "Feliz - 14:20",
    lastSOS: "16:05",
  },
  {
    id: "2",
    name: "Criança 2",
    age: 6,
    diagnosis: "TEA nível 2",
    lastEmotion: "Triste - 11:40",
    lastSOS: "Sem alerta",
  },
  {
    id: "3",
    name: "Criança 3",
    age: 10,
    diagnosis: "TEA + TDAH",
    lastEmotion: "Bravo - 09:15",
    lastSOS: "13:50",
  },
];

export default function TherapistHomeScreen({ navigation }) {
  const handleBack = () => {
    if (navigation?.goBack) navigation.goBack();
  };

  const handleNotifications = () => {
    console.log("Abrir notificações");
  };

  const handleHome = () => {
    console.log("Home");
  };

  const handleReports = () => {
    console.log("Relatórios");
  };

  const handleSettings = () => {
    console.log("Configurações");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Topo */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <MaterialIcons name="logout" size={30} color="#F0C9A6" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNotifications} style={styles.iconButton}>
            <Ionicons name="notifications" size={30} color="#D9A441" />
          </TouchableOpacity>
        </View>

        {/* Saudação / Espaço para nome */}
        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>Olá, terapeuta</Text>
        </View>

        {/* Título */}
        <Text style={styles.sectionTitle}>Pacientes Ativos</Text>

        {/* Lista de cards */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {patients.map((patient) => (
            <View key={patient.id} style={styles.card}>
              <View style={styles.avatarColumn}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarEmoji}>🙂</Text>
                </View>
              </View>

              <View style={styles.infoColumn}>
                <Text style={styles.patientName}>{patient.name}</Text>
                <Text style={styles.infoText}>Idade: {patient.age}</Text>
                <Text style={styles.infoText}>Diagnóstico: {patient.diagnosis}</Text>

                <View style={styles.divider} />

                <Text style={styles.label}>Última emoção</Text>
                <Text style={styles.value}>{patient.lastEmotion}</Text>

                <Text style={[styles.label, { marginTop: 10 }]}>Último SOS</Text>
                <Text style={styles.value}>{patient.lastSOS}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Rodapé */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={handleHome}>
            <Ionicons name="home" size={30} color="#FF5A5F" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={handleReports}>
            <Ionicons name="pie-chart" size={30} color="#47C9E5" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={handleSettings}>
            <FontAwesome5 name="tools" size={26} color="#8B6B4A" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ECEBE8",
  },
  container: {
    flex: 1,
    backgroundColor: "#ECEBE8",
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconButton: {
    padding: 4,
  },
  greetingBox: {
    backgroundColor: "#F2D56A",
    borderColor: "#1E1E1E",
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 16,
    width: "60%",
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#A8D0D7",
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#1E1E1E",
    padding: 14,
    marginBottom: 14,
    minHeight: 150,
  },
  avatarColumn: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 14,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFD15C",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#C99A00",
  },
  avatarEmoji: {
    fontSize: 34,
  },
  infoColumn: {
    flex: 1,
  },
  patientName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#3F5960",
    opacity: 0.3,
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  value: {
    fontSize: 15,
    color: "#000",
    marginTop: 2,
  },
  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#F3E1B8",
    paddingVertical: 14,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderTopWidth: 1,
    borderColor: "#D8C08A",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },
});