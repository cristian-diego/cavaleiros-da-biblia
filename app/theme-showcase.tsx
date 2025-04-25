import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useThemeStore } from '@/store/themeStore';
import KidButton from '@/components/ui/KidButton';
import ThemeSelector from '@/components/ui/ThemeSelector';

const variants = ['primary', 'secondary', 'success', 'danger', 'fun'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function ThemeShowcase() {
  const { width } = useWindowDimensions();
  const { currentTheme } = useThemeStore();
  const isSmallScreen = width < 768;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Theme Showcase',
          headerStyle: {
            backgroundColor: currentTheme === 'kid-bible' ? '#4A90E2' : '#6B46C1',
          },
          headerTintColor: '#FFFFFF',
        }}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Selector</Text>
        <ThemeSelector />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Theme: {currentTheme}</Text>
        <Text style={styles.themeDescription}>
          {currentTheme === 'kid-bible'
            ? 'Classic and friendly theme with blue primary colors'
            : 'Mystical and adventurous theme with purple primary colors'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Variants</Text>
        <View style={[styles.buttonsGrid, isSmallScreen && styles.buttonsGridSmall]}>
          {variants.map((variant) => (
            <View key={variant} style={styles.buttonWrapper}>
              <Text style={styles.variantLabel}>{variant}</Text>
              <KidButton
                title={`${variant} Button`}
                theme={currentTheme}
                variant={variant}
                size="md"
                animated={true}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Sizes</Text>
        <View style={styles.buttonsList}>
          {sizes.map((size) => (
            <View key={size} style={styles.buttonWrapper}>
              <Text style={styles.variantLabel}>{size}</Text>
              <KidButton
                title={`${size} size`}
                theme={currentTheme}
                variant="primary"
                size={size}
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button States</Text>
        <View style={styles.buttonsList}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.variantLabel}>Loading</Text>
            <KidButton title="Loading" theme={currentTheme} variant="primary" loading={true} />
          </View>
          <View style={styles.buttonWrapper}>
            <Text style={styles.variantLabel}>Disabled</Text>
            <KidButton title="Disabled" theme={currentTheme} variant="primary" disabled={true} />
          </View>
          <View style={styles.buttonWrapper}>
            <Text style={styles.variantLabel}>Full Width</Text>
            <KidButton
              title="Full Width Button"
              theme={currentTheme}
              variant="primary"
              fullWidth={true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  themeDescription: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 16,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  buttonsGridSmall: {
    flexDirection: 'column',
  },
  buttonsList: {
    gap: 16,
  },
  buttonWrapper: {
    alignItems: 'flex-start',
    gap: 8,
  },
  variantLabel: {
    fontSize: 14,
    color: '#718096',
    textTransform: 'capitalize',
  },
});
