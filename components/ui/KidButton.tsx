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
type ThemeType = 'kid-bible' | 'kid-adventurers';

interface KidButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  theme?: ThemeType;
  animated?: boolean;
}

// Brand themes with specific color palettes
const themes: Record<
  ThemeType,
  {
    colors: Record<ButtonVariant, [string, string, string]>;
    fonts: {
      regular: string;
      bold: string;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
    };
  }
> = {
  'kid-bible': {
    colors: {
      primary: ['#4A90E2', '#357ABD', '#2C3E50'] as [string, string, string],
      secondary: ['#FFD700', '#FFC107', '#FFB300'] as [string, string, string],
      success: ['#2ECC71', '#27AE60', '#219A52'] as [string, string, string],
      danger: ['#E74C3C', '#C0392B', '#962E23'] as [string, string, string],
      fun: ['#9B59B6', '#8E44AD', '#6C3483'] as [string, string, string],
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
  'kid-adventurers': {
    colors: {
      primary: ['#6B46C1', '#553C9A', '#44337A'] as [string, string, string], // Deep purple
      secondary: ['#9F7AEA', '#805AD5', '#6B46C1'] as [string, string, string], // Bright purple
      success: ['#48BB78', '#38A169', '#2F855A'] as [string, string, string], // Forest green
      danger: ['#F56565', '#E53E3E', '#C53030'] as [string, string, string], // Vibrant red
      fun: ['#ED64A6', '#D53F8C', '#B83280'] as [string, string, string], // Magenta
    },
    fonts: {
      regular: 'Nunito-Regular',
      bold: 'Nunito-Bold',
    },
    borderRadius: {
      sm: 16,
      md: 20,
      lg: 24, // More rounded corners for adventurous feel
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
  theme = 'kid-bible',
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

  const buttonStyles: ViewStyle = {
    ...styles.button,
    borderRadius: currentTheme.borderRadius[size],
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    transform: [{ scale: scaleAnim }],
    ...style,
  };

  const textStyles: TextStyle = {
    ...styles.text,
    fontSize: getButtonSize().fontSize,
    fontFamily: currentTheme.fonts.bold,
    ...textStyle,
  };

  return (
    <Animated.View style={buttonStyles}>
      <TouchableOpacity
        style={styles.touchable}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}>
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
  touchable: {
    width: '100%',
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
