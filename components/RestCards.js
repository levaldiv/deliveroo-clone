import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { StarIcon } from 'react-native-heroicons/solid'
import { LocationMarkerIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestCards = ({ id, imgUrl, title, rating, genre, addr, short_desc, dishes, long, lat }) => {
    const navigation = useNavigation()

  return (
    <TouchableOpacity className="bg-white mr-3 shadow"
        onPress={() => { navigation.navigate('Restaurant', 
        { id, imgUrl, title, rating, genre, addr, short_desc, dishes, long, lat })}}
    >
        <Image source={{ uri: urlFor(imgUrl).url() }} className="h-36 w-64 rounded-sm" />

        <View className="px-3 pb-4">
            <Text className="font-bold text-lg pt-3">{title}</Text>

            <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={22} />

                <Text className="text-xs text-gray-500">
                    <Text className="text-green-500">{rating}</Text> • {genre}
                </Text>
            </View>

            <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500"> Nearby • {addr}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default RestCards