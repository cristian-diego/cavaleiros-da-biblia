import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BibleVerse } from '@/data/bibleVerses';
import Card from './Card';
import { BookOpen } from 'lucide-react-native';

interface VerseCardProps {
  verse: BibleVerse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  return (
    <Card variant="elevated" style={styles.container}>
      <View style={styles.header}>
        <BookOpen size={24} color="#CFB53B" />
        <Text style={styles.title}>Versículo do Dia</Text>
      </View>
      
      <Text style={styles.verseText}>"{verse.text}"</Text>
      <Text style={styles.reference}>{verse.reference}</Text>
      
      {verse.theme && (
        <View style={styles.themeContainer}>
          <Text style={styles.themeText}>{verse.theme}</Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E85',
    marginLeft: 8,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#565B49',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  reference: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A6912F',
    textAlign: 'right',
    marginTop: 4,
  },
  themeContainer: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#FAF5DD',
    borderRadius: 16,
  },
  themeText: {
    fontSize: 12,
    color: '#7D6D23',
    textTransform: 'capitalize',
  },
});

export default VerseCard;