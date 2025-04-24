import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { Avatar } from '@/types';

interface AvatarSelectProps {
  avatars: Avatar[];
  selectedAvatar: string | null;
  onSelect: (avatar: Avatar) => void;
}

const AvatarSelect: React.FC<AvatarSelectProps> = ({ avatars, selectedAvatar, onSelect }) => {
  const renderAvatarItem = ({ item }: { item: Avatar }) => {
    const isSelected = selectedAvatar === item.id;

    return (
      <TouchableOpacity
        className={`border-3 m-2 w-[130px] items-center rounded-2xl bg-[#F5F1EB] p-3 ${
          isSelected ? 'border-[#CFB53B] bg-[#FAF5DD]' : 'border-transparent'
        }`}
        onPress={() => onSelect(item)}
        activeOpacity={0.7}>
        <Image source={{ uri: item.image }} className="mb-2 h-20 w-20 rounded-full" />
        <Text className="text-center text-base font-medium text-[#2C3E85]">{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="my-4 w-full">
      <Text className="mb-4 text-center text-lg font-semibold text-[#2C3E85]">
        Escolha seu guardião
      </Text>

      <FlatList
        data={avatars}
        renderItem={renderAvatarItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 8 }}
      />
    </View>
  );
};

export default AvatarSelect;
