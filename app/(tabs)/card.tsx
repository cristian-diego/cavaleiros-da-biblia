import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import useUserStore from '@/store/userStore';
import AttributeBar from '@/components/ui/AttributeBar';
import Card from '@/components/ui/Card';
import { LinearGradient } from 'expo-linear-gradient';
import ProgressBar from '@/components/ui/ProgressBar';
import CharacterCard from '@/components/ui/CharacterCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

export default function CardScreen() {
  const { user } = useUserStore();

  // Calculate XP percentage for level progress
  const calculateLevelProgress = () => {
    if (!user) return 0;

    const currentLevelXp = (user.level - 1) * 100;
    const nextLevelXp = user.level * 100;
    const xpInCurrentLevel = user.xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;

    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
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
        <View style={styles.statsSection}>
          <Text style={styles.title}>Seu Cartão de Cavaleiro</Text>

          <CharacterCard
            character={{
              id: user.id,
              name: user.name,
              description: user.name,
              image: user.avatar,
              faith: user.attributes.faith,
              boldness: user.attributes.boldness,
              wisdom: user.attributes.wisdom,
              level: user.level,
              xp: user.xp,
              age: 14,
              churchName: 'Igreja Adventista do Sétimo Dia',
              achievements: [
                {
                  id: '1',
                  title: 'Conquista 1',
                  description: 'Descrição da conquista',
                  date: new Date().toISOString(),
                  icon: 'icon-1',
                },
              ],
              studyTopics: [
                {
                  id: '1',
                  title: 'Velho Testamento',
                  progress: 35,
                  lastStudied: new Date().toISOString(),
                },
              ],
              joinDate: new Date().toISOString(),
            }}
            onPress={() => {}}
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
    paddingVertical: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3E85',
    marginBottom: 24,
    textAlign: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cardBackground: {
    flex: 1,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#CFB53B',
  },
  cardTitles: {
    marginLeft: 16,
  },
  cardName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#CFB53B',
  },
  cardLevel: {
    marginBottom: 24,
  },
  levelLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  xpBar: {
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'right',
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 16,
  },
  attributesContainer: {
    marginBottom: 24,
  },
  attributesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  cardFooter: {
    marginTop: 'auto',
  },
  footerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerVerse: {
    fontSize: 12,
    color: '#CFB53B',
    textAlign: 'center',
  },
  statsSection: {
    width: '100%',
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E85',
    marginBottom: 16,
  },
  statsCard: {
    width: '100%',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  statDivider: {
    height: 1,
    backgroundColor: '#E0D7C2',
  },
  statLabel: {
    fontSize: 16,
    color: '#565B49',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E85',
  },
});
