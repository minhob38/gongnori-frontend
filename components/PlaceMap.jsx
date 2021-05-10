import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";

export default function PlaceMap({ origin, places }) {
  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: origin.latitude,
          longitude: origin.longitude,
        }}
        pinColor={"blue"}
      />
      {places.map((place) => {
        const { latitude, longitude } = place.location;
        const { city, district, town, detail } = place.address;

        return (
          <Marker
            key={place._id}
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <Callout tootip>
              <View>
                <Text>{place.name}</Text>
                <Text>{city} {district} {town} {detail}</Text>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
