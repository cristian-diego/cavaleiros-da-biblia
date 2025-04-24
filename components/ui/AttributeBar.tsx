import React from 'react';
import { View, Text } from 'react-native';
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
    <View className="my-1.5 w-full">
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-[#565B49]">{name}</Text>
        <Text className="text-xs font-semibold text-[#8B877D]">
          {value}/{maxValue}
        </Text>
      </View>
      <ProgressBar progress={percentage} height={8} color={color} />
    </View>
  );
};

export default AttributeBar;
