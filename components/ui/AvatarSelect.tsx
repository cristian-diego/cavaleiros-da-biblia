import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  FlatList
} from 'react-native';
import { Avatar } from '@/types';

interface AvatarSelectProps {
  avatars: Avatar[];
  selectedAvatar: string | null;
  onSelect: (avatar: Avatar) => void;
}

const AvatarSelect: React.FC<AvatarSelectProps> = ({
  avatars,
  selectedAvatar,
  onSelect,
}) => {
  const renderAvatarItem = ({ item }: { item: Avatar }) => {
    const isSelected = selectedAvatar === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.avatarContainer,
          isSelected && styles.selected,
        ]}
        onPress={() => onSelect(item)}
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.avatarImage}
        />
        <Text style={styles.avatarName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu guardião</Text>
      
      <FlatList
        data={avatars}
        renderItem={renderAvatarItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#2C3E85',
  },
  gridContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  avatarContainer: {
    width: 130,
    margin: 8,
    padding: 12,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#F5F1EB',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#CFB53B',
    backgroundColor: '#FAF5DD',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  avatarName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E85',
    textAlign: 'center',
  },
});

export default AvatarSelect;