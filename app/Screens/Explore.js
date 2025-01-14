import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import { TabView, SceneMap } from "react-native-tab-view";
import "react-native-get-random-values";

import { v4 as uuidv4 } from "uuid";

const uniqueId = uuidv4();
console.log("Generated UUID:", uniqueId);

export default function ExploreScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [places, setPlaces] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [index, setIndex] = useState(0); // For TabView index
  const [routes] = useState([
    { key: "map", title: "Map View" },
    { key: "list", title: "List View" },
  ]);

  const apiKey = "AIzaSyB3CHkuLu_BUFQ5DT-QOg3SaSitPmyETmA"; // Replace with your actual API key

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied!");
        alert("Permission to access location was denied!");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Error fetching location: ", error);
      alert("An error occurred while fetching the location!");
    }
  };

  const fetchPlaces = async (type) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
        {
          params: {
            location: `${region.latitude},${region.longitude}`,
            radius: 10000,
            type,
            key: apiKey,
          },
        }
      );

      setPlaces(response.data.results);
    } catch (error) {
      console.error("Error fetching places: ", error);
      alert("Unable to fetch places!");
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  // Map View Component
  const MapRoute = () => (
    <View style={{ flex: 1 }}>
      {/* Google Places Autocomplete */}
      <View style={styles.searchContainer}>
        <GooglePlacesAutocomplete
          placeholder="Search for a place"
          onPress={(data, details = null) => {
            if (details) {
              setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          }}
          fetchDetails={true}
          query={{
            key: apiKey,
            language: "en",
          }}
          styles={{
            textInputContainer: {
              backgroundColor: "white",
              borderRadius: 5,
              marginHorizontal: 10,
              marginTop: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
              elevation: 5,
            },
            textInput: {
              height: 40,
              color: "#5d5d5d",
              fontSize: 16,
            },
          }}
        />
      </View>

      {/* Map View */}
      <MapView
        style={StyleSheet.absoluteFill}
        region={region}
        showsUserLocation
        showsMyLocationButton
      >
        <Marker coordinate={region} />

        {/* Render markers for fetched places */}
        {places.map((place) => (
          <Marker
            key={place.place_id}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.vicinity}
          />
        ))}
      </MapView>

      {/* Categories */}
      <ScrollView
        horizontal
        style={styles.categoryContainer}
        showsHorizontalScrollIndicator={false}
      >
        {[
          { label: "Attractions", type: "tourist_attraction" },
          { label: "Food", type: "restaurant" },
          { label: "Hotels", type: "lodging" },
          { label: "Parks", type: "park" },
          { label: "Spots", type: "point_of_interest" },
        ].map((category) => (
          <TouchableOpacity
            key={category.type}
            style={styles.categoryButton}
            onPress={() => fetchPlaces(category.type)}
          >
            <Text style={styles.categoryText}>{category.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Button to get user's location */}
      <View style={styles.buttonContainer}>
        <Button title="Get Location" onPress={userLocation} />
      </View>
    </View>
  );

  // List View Component (Currently Empty)
  const ListRoute = () => (
    <View style={styles.listContainer}>
      <Text style={styles.emptyText}>List View Coming Soon!</Text>
    </View>
  );

  const renderScene = SceneMap({
    map: MapRoute,
    list: ListRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
    />
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  categoryContainer: {
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    flexDirection: "row",
  },
  categoryButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  categoryText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
  },
});
