import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

interface AttributeBarProps {
  name: string;
  value: number;
  maxValue?: number;
  color?: string;
}

const AttributeBar: React.FC<AttributeBarProps> = ({
  name,
  value,
  maxValue = 10,
  color = '#CFB53B',
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{name}</Text>
        <Text style={styles.value}>
          {value}/{maxValue}
        </Text>
      </View>
      <ProgressBar
        progress={percentage}
        height={8}
        color={color}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#565B49',
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8B877D',
  },
});

export default AttributeBar;