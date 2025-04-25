import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QuizCategory } from '../types/quiz';

interface QuizCategorySelectionProps {
  onSelectCategory: (category: QuizCategory) => void;
}

const categories = [
  {
    id: 'old-testament',
    title: 'Antigo Testamento',
    icon: '📜',
    description: 'Teste seu conhecimento sobre o Antigo Testamento',
    color: '#4A90E2',
  },
  {
    id: 'new-testament',
    title: 'Novo Testamento',
    icon: '✝️',
    description: 'Questões sobre o Novo Testamento e os ensinamentos de Jesus',
    color: '#FFD700',
  },
  {
    id: 'characters',
    title: 'Personagens Bíblicos',
    icon: '👥',
    description: 'Conheça mais sobre as principais figuras da Bíblia',
    color: '#2ECC71',
  },
  {
    id: 'verses',
    title: 'Versículos',
    icon: '📖',
    description: 'Teste sua memória com versículos famosos',
    color: '#9B59B6',
  },
  {
    id: 'history',
    title: 'História Bíblica',
    icon: '⏳',
    description: 'Eventos importantes e histórias marcantes',
    color: '#E67E22',
  },
  {
    id: 'teachings',
    title: 'Ensinamentos',
    icon: '💡',
    description: 'Princípios e lições da Bíblia',
    color: '#E74C3C',
  },
];

export function QuizCategorySelection({ onSelectCategory }: QuizCategorySelectionProps) {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4A90E2', '#3B5998', '#192F6A']} style={styles.gradient}>
        <Text style={styles.title}>Escolha uma Categoria</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { borderColor: category.color }]}
              onPress={() => onSelectCategory(category.id as QuizCategory)}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-ExtraBold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  categoriesContainer: {
    gap: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  categoryIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 22,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    textAlign: 'center',
  },
});
