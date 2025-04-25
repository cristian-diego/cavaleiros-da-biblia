import React, { ReactNode } from 'react';
import { View, ViewStyle } from 'react-native';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  className?: string;
  variant?: 'default' | 'elevated' | 'outline';
}

const Card: React.FC<CardProps> = ({ children, style, className = '', variant = 'default' }) => {
  const getCardClasses = () => {
    const baseClasses = ['rounded-2xl p-4 bg-white m-2'];

    switch (variant) {
      case 'elevated':
        baseClasses.push(
          'shadow-black shadow-offset-[0px/4px] shadow-opacity-15 shadow-radius-8 elevation-4'
        );
        break;
      case 'outline':
        baseClasses.push('border border-[#E0D7C2] bg-transparent');
        break;
      default:
        baseClasses.push(
          'shadow-black shadow-offset-[0px/2px] shadow-opacity-10 shadow-radius-4 elevation-2'
        );
    }

    return [...baseClasses, className].join(' ');
  };

  return (
    <View className={getCardClasses()} style={style}>
      {children}
    </View>
  );
};

export default Card;
