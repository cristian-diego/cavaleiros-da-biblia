import React from 'react';
import { View, Text } from 'react-native';
import { BibleVerse } from '@/data/bibleVerses';
import Card from './Card';
import { BookOpen, Star, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface VerseCardProps {
  verse: BibleVerse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  return (
    <Card variant="elevated" className="kid-card overflow-hidden">
      <LinearGradient colors={['#FFFFFF', '#F8F9FA']} className="p-4">
        {/* Header */}
        <View className="mb-4 flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="animate-bounce-soft">
              <BookOpen size={28} color="#4A90E2" />
            </View>
            <Text className="ml-3 text-kid-lg font-bold text-kid-blue">Versículo do Dia</Text>
          </View>
          <Star size={20} color="#FFD700" className="animate-pulse" />
        </View>

        {/* Verse Content */}
        <View className="rounded-kid bg-white/80 p-4 shadow-sm">
          <Text className="mb-3 text-kid-base italic leading-6 text-gray-700">"{verse.text}"</Text>
          <Text className="text-right text-kid-base font-bold text-kid-blue">
            {verse.reference}
          </Text>
        </View>

        {/* Theme Tag */}
        {verse.theme && (
          <View className="mt-4 flex-row items-center">
            <View className="animate-float flex-row items-center rounded-full bg-kid-yellow/10 px-4 py-2">
              <Heart size={16} color="#FFD700" className="mr-2" />
              <Text className="text-kid-sm font-semibold capitalize text-kid-yellow">
                {verse.theme}
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>
    </Card>
  );
};

export default VerseCard;
