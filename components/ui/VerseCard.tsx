import React from 'react';
import { View, Text } from 'react-native';
import { BibleVerse } from '@/data/bibleVerses';
import Card from './Card';
import { BookOpen } from 'lucide-react-native';

interface VerseCardProps {
  verse: BibleVerse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  return (
    <Card variant="elevated" className="mx-4 my-3 p-5">
      <View className="mb-4 flex-row items-center">
        <BookOpen size={24} color="#CFB53B" />
        <Text className="ml-2 text-lg font-semibold text-[#2C3E85]">Versículo do Dia</Text>
      </View>

      <Text className="mb-3 text-base italic leading-6 text-[#565B49]">"{verse.text}"</Text>
      <Text className="mt-1 text-right text-base font-semibold text-[#A6912F]">
        {verse.reference}
      </Text>

      {verse.theme && (
        <View className="mt-3 self-start rounded-2xl bg-[#FAF5DD] px-3 py-1">
          <Text className="text-xs capitalize text-[#7D6D23]">{verse.theme}</Text>
        </View>
      )}
    </Card>
  );
};

export default VerseCard;
