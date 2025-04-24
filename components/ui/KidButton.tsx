import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'fun';
type ButtonSize = 'sm' | 'md' | 'lg';

interface KidButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  theme?: 'kid' | 'teen' | 'classic';
  animated?: boolean;
}

const themes = {
  kid: {
    colors: {
      primary: ['#4A90E2', '#357ABD', '#2C3E50'],
      secondary: ['#FFD700', '#FFC107', '#FFB300'],
      success: ['#2ECC71', '#27AE60', '#219A52'],
      danger: ['#E74C3C', '#C0392B', '#962E23'],
      fun: ['#9B59B6', '#8E44AD', '#6C3483'],
    },
    fonts: {
      regular: 'Nunito-Regular',
      bold: 'Nunito-Bold',
    },
    borderRadius: {
      sm: 12,
      md: 16,
      lg: 20,
    },
  },
  teen: {
    colors: {
      primary: ['#3498DB', '#2980B9', '#1F6DA5'],
      secondary: ['#F1C40F', '#D4AC0D', '#B7950B'],
      success: ['#2ECC71', '#27AE60', '#219A52'],
      danger: ['#E74C3C', '#C0392B', '#962E23'],
      fun: ['#9B59B6', '#8E44AD', '#6C3483'],
    },
    fonts: {
      regular: 'Inter-Regular',
      bold: 'Inter-Bold',
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 16,
    },
  },
  classic: {
    colors: {
      primary: ['#2C3E50', '#34495E', '#2C3E50'],
      secondary: ['#95A5A6', '#7F8C8D', '#6C7A7D'],
      success: ['#27AE60', '#219A52', '#1E8449'],
      danger: ['#C0392B', '#962E23', '#7B241C'],
      fun: ['#8E44AD', '#6C3483', '#5B2C6F'],
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
    },
  },
};

const KidButton: React.FC<KidButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  theme = 'kid',
  animated = true,
  disabled = false,
  ...props
}) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const currentTheme = themes[theme];

  React.useEffect(() => {
    if (animated && !disabled && !loading) {
      const floatAnimation = Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]);

      Animated.loop(floatAnimation).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [animated, disabled, loading]);

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
        };
      case 'lg':
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
          fontSize: 18,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16,
        };
    }
  };

  const buttonStyles = [
    styles.button,
    {
      borderRadius: currentTheme.borderRadius[size],
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
      transform: [{ scale: scaleAnim }],
    },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      fontSize: getButtonSize().fontSize,
      fontFamily: currentTheme.fonts.bold,
    },
    textStyle,
  ];

  return (
    <Animated.View style={buttonStyles}>
      <TouchableOpacity disabled={disabled || loading} activeOpacity={0.8} {...props}>
        <LinearGradient
          colors={currentTheme.colors[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradient,
            {
              paddingVertical: getButtonSize().paddingVertical,
              paddingHorizontal: getButtonSize().paddingHorizontal,
              borderRadius: currentTheme.borderRadius[size],
            },
          ]}>
          {loading ? (
            <ActivityIndicator color="#FFF" size={size === 'sm' ? 'small' : 'large'} />
          ) : (
            <Text style={textStyles}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default KidButton;
