import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import Explore from "./Explore"; // Import ExploreScreen

// Screen Components
function HomeScreen({ navigation }) {
  const handlePress = (screenName) => {
    Alert.alert(`Navigating to ${screenName}`);
  };
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.headerText}>Welcome to AI Travel Assistant</Text>

      {/* Tiles */}
      <View style={styles.tilesContainer}>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => handlePress("Rent Cars")}
        >
          <Icon name="drive-eta" size={40} color="tomato" />
          <Text style={styles.tileText}>Rent Car</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tile}
          onPress={() => handlePress("Book Flight")}
        >
          <Icon name="flight-takeoff" size={40} color="tomato" />
          <Text style={styles.tileText}>Book Flight</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tile}
          onPress={() => handlePress("Activities")}
        >
          <Icon name="local-activity" size={40} color="tomato" />
          <Text style={styles.tileText}> Activities</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tile}
          onPress={() => handlePress("Stays")}
        >
          <Icon name="hotel" size={40} color="tomato" />
          <Text style={styles.tileText}>Stays</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function PlanScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Plan your trips here!</Text>
    </View>
  );
}

function ExploreScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Explore destinations and experiences</Text>
    </View>
  );
}

function AIChatScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Ask AI for travel advice</Text>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Manage your account here</Text>
    </View>
  );
}

function MyTripsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>View your saved and upcoming trips here!</Text>
    </View>
  );
}

// Create Tab Navigator
const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Plan":
                iconName = "event";
                break;
              case "Explore":
                iconName = "explore";
                break;
              case "AI Chat":
                iconName = "chat";
                break;
              case "Account":
                iconName = "account-circle";
                break;
              default:
                iconName = "circle";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Plan" component={PlanScreen} />
        <Tab.Screen name="Explore" component={Explore} />
        <Tab.Screen name="AI Chat" component={AIChatScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  tilesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  tile: {
    width: 120,
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tileText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    textAlign: "center",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
