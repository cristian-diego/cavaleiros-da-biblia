import React from 'react';
import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  disabled = false,
  ...props
}) => {
  // Define gradient colors based on variant
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['#3747A0', '#2C3E85', '#19254E'] as const;
      case 'secondary':
        return ['#D6AD14', '#CFB53B', '#A6912F'] as const;
      case 'outline':
        return ['transparent', 'transparent'] as const;
      default:
        return ['#3747A0', '#2C3E85', '#19254E'] as const;
    }
  };

  const getButtonClasses = () => {
    const baseClasses = [
      'rounded-2xl overflow-hidden ',
      'shadow-black shadow-offset-[0px/2px] shadow-opacity-10 shadow-radius-4',
    ];

    // Add size classes
    switch (size) {
      case 'sm':
        baseClasses.push('h-9 px-4');
        break;
      case 'lg':
        baseClasses.push('h-14 px-8');
        break;
      default:
        baseClasses.push('h-12 px-6');
    }

    // Add full width class if needed
    if (fullWidth) {
      baseClasses.push('w-full');
    }

    // Add variant-specific classes
    if (variant === 'outline') {
      baseClasses.push('bg-transparent border-2 border-[#2C3E85] elevation-2');
    }

    // Add disabled class
    if (disabled) {
      baseClasses.push('opacity-50');
    }

    return baseClasses.join(' ');
  };

  const getTextClasses = () => {
    const baseTextClasses = ['text-white font-semibold text-center'];

    // Add size-specific text classes
    switch (size) {
      case 'sm':
        baseTextClasses.push('text-sm');
        break;
      case 'lg':
        baseTextClasses.push('text-lg');
        break;
      default:
        baseTextClasses.push('text-base');
    }

    // Add variant-specific text classes
    if (variant === 'outline') {
      baseTextClasses.push('text-[#2C3E85]');
    }

    // Add disabled text class
    if (disabled) {
      baseTextClasses.push('text-gray-400');
    }

    return baseTextClasses.join(' ');
  };

  return (
    <TouchableOpacity
      className={getButtonClasses()}
      style={style}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}>
      {variant !== 'outline' ? (
        <LinearGradient
          colors={getGradientColors()}
          className="flex-1 items-center justify-center p-2"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className={getTextClasses()} style={textStyle}>
              {title}
            </Text>
          )}
        </LinearGradient>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator color="#2C3E85" size="small" />
          ) : (
            <Text className={getTextClasses()} style={textStyle}>
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
