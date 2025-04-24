import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  SafeAreaView 
} from 'react-native';
import useUserStore from '@/store/userStore';
import useMissionStore from '@/store/missionStore';
import ProgressBar from '@/components/ui/ProgressBar';
import VerseCard from '@/components/ui/VerseCard';
import { getDailyVerse } from '@/data/bibleVerses';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { router } from 'expo-router';

export default function DashboardScreen() {
  const { user } = useUserStore();
  const { missions, resetDailyMissions } = useMissionStore();
  
  // Get daily verse
  const dailyVerse = getDailyVerse();
  
  // Calculate XP percentage for level progress
  const calculateLevelProgress = () => {
    if (!user) return 0;
    
    const currentLevelXp = (user.level - 1) * 100;
    const nextLevelXp = user.level * 100;
    const xpInCurrentLevel = user.xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
    
    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  };
  
  // Calculate completed missions
  const completedMissions = missions.filter(m => m.completed).length;
  
  // Reset daily missions if needed
  useEffect(() => {
    resetDailyMissions();
  }, []);
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>Olá, {user.name}!</Text>
              <Text style={styles.level}>Nível {user.level}</Text>
            </View>
          </View>
          
          <View style={styles.xpContainer}>
            <View style={styles.xpLabelContainer}>
              <Text style={styles.xpLabel}>XP</Text>
              <Text style={styles.xpValue}>{user.xp}</Text>
            </View>
            <ProgressBar progress={calculateLevelProgress()} />
          </View>
        </View>
        
        <VerseCard verse={dailyVerse} />
        
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Suas Missões de Hoje</Text>
          
          <Card style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedMissions}</Text>
              <Text style={styles.statLabel}>Missões Completas</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{missions.length - completedMissions}</Text>
              <Text style={styles.statLabel}>Restantes</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{missions.reduce((acc, mission) => {
                return mission.completed ? acc + mission.xpReward : acc;
              }, 0)}</Text>
              <Text style={styles.statLabel}>XP Ganho</Text>
            </View>
          </Card>
          
          <Button
            title="Ver Missões"
            variant="secondary"
            style={styles.missionsButton}
            onPress={() => router.push('/(tabs)/missions')}
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
    paddingBottom: 24,
  },
  header: {
    backgroundColor: '#2C3E85',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#CFB53B',
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  level: {
    fontSize: 14,
    color: '#CFB53B',
    marginTop: 2,
  },
  xpContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  xpLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  xpValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CFB53B',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E85',
    marginBottom: 12,
    marginTop: 20,
    marginHorizontal: 16,
  },
  statsContainer: {
    marginVertical: 16,
  },
  statsCard: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#CFB53B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#565B49',
    textAlign: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#E0D7C2',
    marginHorizontal: 8,
  },
  missionsButton: {
    alignSelf: 'center',
    marginTop: 20,
    minWidth: 150,
  },
});