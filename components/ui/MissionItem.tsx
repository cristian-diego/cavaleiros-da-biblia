import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Check, CheckCircle } from 'lucide-react-native';
import { Mission } from '@/types';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor 
} from 'react-native-reanimated';

interface MissionItemProps {
  mission: Mission;
  onComplete: (id: string) => void;
  disabled?: boolean;
}

const MissionItem: React.FC<MissionItemProps> = ({
  mission,
  onComplete,
  disabled = false,
}) => {
  const animatedValue = useSharedValue(mission.completed ? 1 : 0);
  
  const handleComplete = () => {
    if (disabled || mission.completed) return;
    
    onComplete(mission.id);
    animatedValue.value = withSpring(1, { damping: 15 });
  };
  
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 1],
        ['#FFFFFF', '#F5F1EB']
      ),
    };
  });
  
  const animatedCheckStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(animatedValue.value * 1 + 1) }],
      opacity: withSpring(animatedValue.value),
    };
  });
  
  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{mission.title}</Text>
          <Text style={styles.xp}>+{mission.xpReward} XP</Text>
        </View>
        
        <Text style={styles.description}>{mission.description}</Text>
        
        <View style={styles.attributeContainer}>
          <Text style={styles.attributeLabel}>Atributo:</Text>
          <Text style={[
            styles.attributeValue,
            mission.attribute === 'faith' && styles.faithAttribute,
            mission.attribute === 'boldness' && styles.boldnessAttribute,
            mission.attribute === 'wisdom' && styles.wisdomAttribute,
          ]}>
            {mission.attribute === 'faith' && 'Fé'}
            {mission.attribute === 'boldness' && 'Coragem'}
            {mission.attribute === 'wisdom' && 'Sabedoria'}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          mission.completed && styles.completedCheckbox,
          disabled && styles.disabledCheckbox,
        ]}
        onPress={handleComplete}
        disabled={disabled || mission.completed}
        activeOpacity={0.7}
      >
        {mission.completed ? (
          <Animated.View style={animatedCheckStyle}>
            <CheckCircle color="#8F9779" size={28} />
          </Animated.View>
        ) : (
          <Check color="#8F9779" size={24} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E85',
  },
  xp: {
    fontSize: 14,
    color: '#CFB53B',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#565B49',
    marginBottom: 8,
  },
  attributeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attributeLabel: {
    fontSize: 12,
    color: '#8B877D',
    marginRight: 4,
  },
  attributeValue: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  faithAttribute: {
    backgroundColor: '#E6E8F3',
    color: '#2C3E85',
  },
  boldnessAttribute: {
    backgroundColor: '#ECEEE9',
    color: '#6B784D',
  },
  wisdomAttribute: {
    backgroundColor: '#F5EBBC',
    color: '#A6912F',
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8F9779',
    borderRadius: 12,
    width: 40,
    height: 40,
  },
  completedCheckbox: {
    borderColor: '#8F9779',
    backgroundColor: '#ECEEE9',
  },
  disabledCheckbox: {
    opacity: 0.5,
  },
});

export default MissionItem;