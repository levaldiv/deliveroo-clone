import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestCards from "./RestCards";
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([])

  // when the functional component loads
  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type->{
          name
        }
      },
    }[0]`, { id }).then(data => {
      setRestaurants(data?.restaurants)
    })
  }, [id])
  // console.log(restaurants)

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-sm text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >

        {/* Rest cards */}
        {restaurants?.map(restaurant => (
          <RestCards
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            addr={restaurant.address}
            title={restaurant.name}
            dishes={restaurant.dishes}
            rating={restaurant.rating}
            short_desc={restaurant.short_description}
            genre={restaurant.type?.name}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        
        {/* <RestCards
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Sushi"
          rating={4.5}
          genre="Japanese"
          addr="123 Main St"
          short_desc="This is a short description"
          dishes={[]}
          long={12}
          lat={32}
        />
        <RestCards
          id={123}
          imgUrl="https://links.papareact.com/gn7"
          title="Sushi"
          rating={4.5}
          genre="Japanese"
          addr="123 Main St"
          short_desc="This is a short description"
          dishes={[]}
          long={12}
          lat={32}
        /> */}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
