import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Trophy, Crown, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { mockWeeklyRankings } from '../../data/mockRankings';
import { leagues, League } from '../../data/mockLeagues';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

export default function RankingsScreen() {
  const insets = useSafeAreaInsets();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderLeagueCard = ({ item, index }: { item: League; index: number }) => {
    const isActive = index === activeSlide;
    return (
      <View
        className={`mx-2 rounded-2xl p-4 ${isActive ? 'bg-white shadow-lg' : 'bg-gray-100'}`}
        style={{
          width: screenWidth * 0.8,
          borderWidth: isActive ? 2 : 0,
          borderColor: item.color,
        }}>
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-4xl">{item.icon}</Text>
          <Text className="text-lg font-bold" style={{ color: item.color }}>
            {item.name}
          </Text>
        </View>
        <Text className="mb-2 text-sm text-gray-600">{item.description}</Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-sm text-gray-500">
            XP: {item.minXp} - {item.maxXp}
          </Text>
          {isActive && (
            <View className="rounded-full bg-green-100 px-2 py-1">
              <Text className="text-xs font-semibold text-green-800">Atual</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row items-center border-b border-gray-200 px-4 py-4"
        style={{ paddingTop: insets.top }}>
        <Trophy size={24} color="#FF6B6B" />
        <Text className="ml-2 text-xl font-bold text-gray-800">Ranking Semanal</Text>
      </View>

      <View className="py-4">
        {/* <Carousel
          data={leagues}
          renderItem={renderLeagueCard}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.8}
          onSnapToItem={(index: number) => setActiveSlide(index)}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={0.7}
          firstItem={1}
        /> */}
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="mb-4 text-lg font-semibold text-gray-700">Top 10 Cavaleiros</Text>

        {mockWeeklyRankings.map((user) => (
          <View key={user.id} className="mb-3 flex-row items-center rounded-xl bg-gray-50 p-4">
            <View className="h-10 w-10 items-center justify-center">
              {user.position <= 3 ? (
                <Crown
                  size={24}
                  color={
                    user.position === 1 ? '#FFD700' : user.position === 2 ? '#C0C0C0' : '#CD7F32'
                  }
                />
              ) : (
                <Text className="font-bold text-gray-600">{user.position}</Text>
              )}
            </View>

            <Image source={{ uri: user.avatar }} className="ml-3 h-12 w-12 rounded-full" />

            <View className="ml-3 flex-1">
              <Text className="font-semibold text-gray-800">{user.name}</Text>
              <Text className="text-sm text-gray-500">Nível {user.level}</Text>
            </View>

            <View className="items-end">
              <Text className="font-bold text-gray-800">{user.xp} XP</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
