import React from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { Character } from '@/types/character';
import AttributeBar from './AttributeBar';
import Animated, {
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import ProgressBar from './ProgressBar';
import { Medal, BookOpen, Calendar, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CharacterCardProps {
  character: Character;
  onPress?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onPress }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const calculateLevelProgress = () => {
    const currentLevelXp = (character.level - 1) * 100;
    const nextLevelXp = character.level * 100;
    const xpInCurrentLevel = character.xp - currentLevelXp;
    const xpNeededForNextLevel = nextLevelXp - currentLevelXp;
    return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <ScrollView className="flex-1">
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          className="overflow-hidden rounded-3xl bg-white p-4 shadow-lg"
          entering={FadeIn.delay(200).springify()}
          style={animatedStyle}>
          {/* Header Section */}
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            className="mb-4 overflow-hidden rounded-2xl p-4">
            <View className="flex-row items-center space-x-4">
              <Animated.View
                className="h-24 w-24 overflow-hidden rounded-kid-lg border-4 border-white bg-gray-100"
                entering={FadeInDown.delay(400).springify()}>
                <Image
                  source={{ uri: character.image }}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </Animated.View>

              <View className="ml-2 flex flex-1 justify-center gap-1">
                <Animated.Text
                  className="text-kid-xl font-bold text-white"
                  entering={FadeInDown.delay(500).springify()}>
                  {character.name}
                </Animated.Text>
                <Animated.Text
                  className="text-kid-base text-white/90"
                  entering={FadeInDown.delay(600).springify()}>
                  {character.description}
                </Animated.Text>

                <Animated.Text
                  className="text-kid-base text-white/90"
                  entering={FadeInDown.delay(600).springify()}>
                  {character.churchName}
                </Animated.Text>
              </View>
            </View>
          </LinearGradient>

          {/* Level and XP Section */}
          <View className="mb-4 rounded-2xl bg-blue-50 p-4">
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Star size={20} color="#4A90E2" className="mr-2" />
                <Text className="text-kid-base font-bold text-blue-800">
                  Nível {character.level}
                </Text>
              </View>
              <Text className="text-kid-sm font-bold text-blue-600">{character.xp} XP</Text>
            </View>
            <ProgressBar
              progress={calculateLevelProgress()}
              height={8}
              color="#4A90E2"
              backgroundColor="rgba(74, 144, 226, 0.1)"
            />
          </View>

          {/* Attributes Section */}
          <View className="mb-4 rounded-2xl bg-purple-50 p-4">
            <Text className="mb-2 text-kid-base font-bold text-purple-800">Atributos</Text>
            <AttributeBar name="Fé" value={character.faith} type="faith" />
            <AttributeBar name="Coragem" value={character.boldness} type="boldness" />
            <AttributeBar name="Sabedoria" value={character.wisdom} type="wisdom" />
          </View>

          {/* Achievements Section */}
          <View className="mb-4 rounded-2xl bg-yellow-50 p-4">
            <View className="mb-2 flex flex-row items-center gap-2">
              <Medal size={20} color="#FFD700" />
              <Text className="text-kid-base font-bold text-yellow-800">Conquistas</Text>
            </View>
            <View className="space-y-2">
              {character.achievements?.length > 0 ? (
                character.achievements.map((achievement) => (
                  <View
                    key={achievement.id}
                    className="flex-row items-center rounded-xl bg-white p-2">
                    <View className="mr-2 rounded-full bg-yellow-100 p-2">
                      <Medal size={16} color="#FFD700" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-kid-sm font-bold text-gray-800">
                        {achievement.title}
                      </Text>
                      <Text className="text-kid-xs text-gray-600">{achievement.description}</Text>
                      <Text className="text-kid-xs text-right text-gray-500">
                        {formatDate(achievement.date)}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text className="text-kid-sm text-gray-500">Nenhuma conquista ainda</Text>
              )}
            </View>
          </View>

          {/* Study Topics Section */}
          <View className="mb-4 rounded-2xl bg-green-50 p-4">
            <View className="mb-2 flex flex-row items-center gap-2">
              <BookOpen size={20} color="#2ECC71" />
              <Text className="text-kid-base font-bold text-green-800">Tópicos Estudados</Text>
            </View>
            <View className="space-y-2">
              {character.studyTopics?.length > 0 ? (
                character.studyTopics.map((topic) => (
                  <View key={topic.id} className="flex gap-2 rounded-xl bg-white p-2">
                    <Text className="text-kid-sm font-bold text-gray-800">{topic.title}</Text>
                    <Text className="text-kid-xs text-gray-500">
                      {formatDate(topic.lastStudied)}
                    </Text>

                    <ProgressBar
                      progress={topic.progress}
                      height={4}
                      color="#2ECC71"
                      backgroundColor="rgba(46, 204, 113, 0.1)"
                    />

                    <Text className="text-kid-xs text-right text-gray-500">
                      {formatDate(topic.lastStudied)}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-kid-sm text-gray-500">Nenhum tópico estudado ainda</Text>
              )}
            </View>
          </View>

          {/* Join Date Section */}
          <View className="rounded-2xl bg-pink-50 p-4">
            <View className="flex flex-row items-center gap-2">
              <Calendar size={20} color="#FF6B6B" />
              <Text className="text-kid-base font-bold text-pink-800">Membro desde</Text>
            </View>
            <Text className="mt-1 text-kid-sm text-pink-600">{formatDate(character.joinDate)}</Text>
          </View>
        </Animated.View>
      </Pressable>
    </ScrollView>
  );
};

export default CharacterCard;
