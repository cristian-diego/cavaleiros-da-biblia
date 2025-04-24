import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import KidButton from './KidButton';

const variants = ['primary', 'secondary', 'success', 'danger', 'fun'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export function ThemePreview() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768;

  return (
    <ScrollView style={styles.container}>
      {/* Kid Bible Theme */}
      <View style={styles.themeContainer}>
        <View style={styles.themeHeader}>
          <Text style={styles.themeTitle}>Kid Bible Theme</Text>
          <Text style={styles.themeDescription}>
            Classic and friendly theme with blue primary colors
          </Text>
        </View>

        <View style={styles.variantsContainer}>
          <Text style={styles.sectionTitle}>Button Variants</Text>
          <View style={[styles.buttonsGrid, isSmallScreen && styles.buttonsGridSmall]}>
            {variants.map((variant) => (
              <View key={variant} style={styles.buttonWrapper}>
                <Text style={styles.variantLabel}>{variant}</Text>
                <KidButton
                  title={`${variant} Button`}
                  theme="kid-bible"
                  variant={variant}
                  size="md"
                  animated={true}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sizesContainer}>
          <Text style={styles.sectionTitle}>Button Sizes</Text>
          <View style={styles.buttonsList}>
            {sizes.map((size) => (
              <View key={size} style={styles.buttonWrapper}>
                <Text style={styles.variantLabel}>{size}</Text>
                <KidButton title={`${size} size`} theme="kid-bible" variant="primary" size={size} />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Kid Adventurers Theme */}
      <View style={styles.themeContainer}>
        <View style={styles.themeHeader}>
          <Text style={styles.themeTitle}>Kid Adventurers Theme</Text>
          <Text style={styles.themeDescription}>
            Mystical and adventurous theme with purple primary colors
          </Text>
        </View>

        <View style={styles.variantsContainer}>
          <Text style={styles.sectionTitle}>Button Variants</Text>
          <View style={[styles.buttonsGrid, isSmallScreen && styles.buttonsGridSmall]}>
            {variants.map((variant) => (
              <View key={variant} style={styles.buttonWrapper}>
                <Text style={styles.variantLabel}>{variant}</Text>
                <KidButton
                  title={`${variant} Button`}
                  theme="kid-adventurers"
                  variant={variant}
                  size="md"
                  animated={true}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.sizesContainer}>
          <Text style={styles.sectionTitle}>Button Sizes</Text>
          <View style={styles.buttonsList}>
            {sizes.map((size) => (
              <View key={size} style={styles.buttonWrapper}>
                <Text style={styles.variantLabel}>{size}</Text>
                <KidButton
                  title={`${size} size`}
                  theme="kid-adventurers"
                  variant="primary"
                  size={size}
                />
              </View>
            ))}
          </View>
        </View>

        {/* States Preview */}
        <View style={styles.statesContainer}>
          <Text style={styles.sectionTitle}>Button States</Text>
          <View style={styles.buttonsList}>
            <View style={styles.buttonWrapper}>
              <Text style={styles.variantLabel}>Loading</Text>
              <KidButton title="Loading" theme="kid-adventurers" variant="primary" loading={true} />
            </View>
            <View style={styles.buttonWrapper}>
              <Text style={styles.variantLabel}>Disabled</Text>
              <KidButton
                title="Disabled"
                theme="kid-adventurers"
                variant="primary"
                disabled={true}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Text style={styles.variantLabel}>Full Width</Text>
              <KidButton
                title="Full Width Button"
                theme="kid-adventurers"
                variant="primary"
                fullWidth={true}
              />
            </View>
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
  themeContainer: {
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
  themeHeader: {
    marginBottom: 24,
  },
  themeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  themeDescription: {
    fontSize: 16,
    color: '#718096',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: 16,
  },
  variantsContainer: {
    marginBottom: 32,
  },
  sizesContainer: {
    marginBottom: 32,
  },
  statesContainer: {
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

export default ThemePreview;
