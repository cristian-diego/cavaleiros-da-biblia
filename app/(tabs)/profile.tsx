import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Alert } from 'react-native';
import useUserStore from '@/store/userStore';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, reset } = useUserStore();

  const handleReset = () => {
    Alert.alert(
      'Reiniciar Progresso',
      'Tem certeza que deseja reiniciar todo o seu progresso? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim, reiniciar',
          onPress: () => {
            reset();
            router.replace('/onboarding');
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.level}>
            Nível {user.level} • {user.xp} XP
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o App</Text>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Guardiões da Verdade</Text>
            <Text style={styles.cardText}>
              Bem-vindo ao Guardiões da Verdade, um app cristão gamificado para crianças e famílias!
              Complete missões diárias, ganhe XP, e cresça em fé, coragem e sabedoria.
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Como Ganhar XP</Text>
            <Text style={styles.cardText}>
              • Complete missões diárias{'\n'}• Leia a Bíblia regularmente{'\n'}• Ore diariamente
              {'\n'}• Participe do culto familiar
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Versão</Text>
            <Text style={styles.cardText}>
              Versão 1.0.0 (MVP){'\n'}© 2025 Guardiões da Verdade
            </Text>
          </Card>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Reiniciar Progresso"
            variant="outline"
            onPress={handleReset}
            style={styles.resetButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F1EB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F1EB',
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: '#2C3E85',
    paddingTop: 60,
    paddingBottom: 32,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#CFB53B',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  level: {
    fontSize: 16,
    color: '#CFB53B',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E85',
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E85',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#565B49',
  },
  buttonContainer: {
    padding: 16,
    marginTop: 16,
  },
  resetButton: {
    alignSelf: 'center',
  },
});
