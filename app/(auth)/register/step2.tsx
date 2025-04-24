import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { avatars } from '@/data/avatars';
import { Avatar } from '@/types';
import useUserStore from '@/store/userStore';
import AvatarSelect from '@/components/ui/AvatarSelect';

export default function RegisterStep2() {
  const { user, setUser } = useUserStore();
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedAvatar || !user) return;

    setIsLoading(true);
    try {
      // Update profile in profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update([
          {
            avatar_url: selectedAvatar.image,
          },
        ])
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update user in store
      setUser({
        ...user,
        avatar: selectedAvatar.image,
      });

      // Navigate to home screen
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-[#F5F1EB]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 40 }}
        showsVerticalScrollIndicator={false}>
        <View className="mb-8 items-center">
          <Text className="mb-2 text-2xl font-bold text-[#2C3E85]">Escolha seu Avatar</Text>
          <Text className="text-center text-base text-[#565B49]">
            Selecione um avatar que represente você como Guardião da Verdade
          </Text>
        </View>

        <AvatarSelect
          avatars={avatars}
          selectedAvatar={selectedAvatar?.id || null}
          onSelect={setSelectedAvatar}
        />
        {/* {errors.avatar && (
          <Text className="mt-1 text-center text-sm text-red-600">{errors.avatar}</Text>
        )} */}

        <TouchableOpacity
          className={`rounded-lg p-4 ${selectedAvatar ? 'bg-[#2C3E85]' : 'bg-gray-400'}`}
          onPress={handleSubmit}
          disabled={!selectedAvatar || isLoading}>
          <Text className="text-center font-semibold text-white">
            {isLoading ? 'Finalizando...' : 'Concluir Cadastro'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4" onPress={() => router.back()}>
          <Text className="text-center text-[#2C3E85]">Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
