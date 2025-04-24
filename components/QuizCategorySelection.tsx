import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
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
  },
  {
    id: 'new-testament',
    title: 'Novo Testamento',
    icon: '✝️',
    description: 'Questões sobre o Novo Testamento e os ensinamentos de Jesus',
  },
  {
    id: 'characters',
    title: 'Personagens Bíblicos',
    icon: '👥',
    description: 'Conheça mais sobre as principais figuras da Bíblia',
  },
  {
    id: 'verses',
    title: 'Versículos',
    icon: '📖',
    description: 'Teste sua memória com versículos famosos',
  },
  {
    id: 'history',
    title: 'História Bíblica',
    icon: '⏳',
    description: 'Eventos importantes e histórias marcantes',
  },
  {
    id: 'teachings',
    title: 'Ensinamentos',
    icon: '💡',
    description: 'Princípios e lições da Bíblia',
  },
];

export function QuizCategorySelection({ onSelectCategory }: QuizCategorySelectionProps) {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
        <Text style={styles.title}>Escolha uma Categoria</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  categoriesContainer: {
    gap: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
