import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle
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
        return ['#3747A0', '#2C3E85', '#19254E'];
      case 'secondary':
        return ['#D6AD14', '#CFB53B', '#A6912F'];
      case 'outline':
        return ['transparent', 'transparent'];
      default:
        return ['#3747A0', '#2C3E85', '#19254E'];
    }
  };

  const getButtonStyles = () => {
    const baseStyles = [styles.button];
    
    // Add size styles
    switch (size) {
      case 'sm':
        baseStyles.push(styles.buttonSm);
        break;
      case 'lg':
        baseStyles.push(styles.buttonLg);
        break;
      default:
        baseStyles.push(styles.buttonMd);
    }
    
    // Add full width style if needed
    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }
    
    // Add variant-specific styles
    if (variant === 'outline') {
      baseStyles.push(styles.buttonOutline);
    }
    
    // Add disabled style
    if (disabled) {
      baseStyles.push(styles.buttonDisabled);
    }
    
    // Add custom styles
    if (style) {
      baseStyles.push(style);
    }
    
    return baseStyles;
  };

  const getTextStyles = () => {
    const baseTextStyles = [styles.text];
    
    // Add size-specific text styles
    switch (size) {
      case 'sm':
        baseTextStyles.push(styles.textSm);
        break;
      case 'lg':
        baseTextStyles.push(styles.textLg);
        break;
      default:
        baseTextStyles.push(styles.textMd);
    }
    
    // Add variant-specific text styles
    if (variant === 'outline') {
      baseTextStyles.push(styles.textOutline);
    }
    
    // Add disabled text style
    if (disabled) {
      baseTextStyles.push(styles.textDisabled);
    }
    
    // Add custom text styles
    if (textStyle) {
      baseTextStyles.push(textStyle);
    }
    
    return baseTextStyles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {variant !== 'outline' ? (
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={getTextStyles()}>{title}</Text>
          )}
        </LinearGradient>
      ) : (
        <>
          {loading ? (
            <ActivityIndicator color="#2C3E85" size="small" />
          ) : (
            <Text style={getTextStyles()}>{title}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonSm: {
    height: 36,
    paddingHorizontal: 16,
  },
  buttonMd: {
    height: 48,
    paddingHorizontal: 24,
  },
  buttonLg: {
    height: 56,
    paddingHorizontal: 32,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2C3E85',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  textSm: {
    fontSize: 14,
  },
  textMd: {
    fontSize: 16,
  },
  textLg: {
    fontSize: 18,
  },
  textOutline: {
    color: '#2C3E85',
  },
  textDisabled: {
    color: '#999',
  },
});

export default Button;