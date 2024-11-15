// Updated code
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/screenprops';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(true);

interface LoginData {
  email: string;
  password: string;
}

type Props = NativeStackScreenProps<StackParamList, 'Login'>;

interface Hospital {
  name: string;
  distance: string;
  cost: string;
  waitingTime: string;
  latitude: number;
  longitude: number;
  acceptedInsurances: string[];
}

const insuranceOptions = [
  'Kaiser Permanente',
  'Anthem Blue Cross of California',
  'Blue Shield of California',
  'Health Net',
  'Aetna',
  'Cigna',
  'UnitedHealthcare',
  'Molina Healthcare',
  'Oscar Health',
];

const injuryOptions = [
  'Sprains and strains',
  'Fractures',
  'Contusions and abrasions',
  'Cuts and lacerations',
  'Burns',
  'Insect bites and stings',
  'Concussions and head injuries',
  'Poisoning',
  'Foreign objects in body',
  'Back injuries',
];

const LoginScreen = ({ navigation }: Props) => {

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const [region, setRegion] = useState({
    latitude: 32.7757,
    longitude: -117.0719,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [filterOption, setFilterOption] = useState('distance');
  const [selectedInsurance, setSelectedInsurance] = useState<string | null>(null);
  const [selectedInjury, setSelectedInjury] = useState<string | null>(null);
  const [showInsuranceSelector, setShowInsuranceSelector] = useState(false);
  const [showInjurySelector, setShowInjurySelector] = useState(false);
  const [calculatedCosts, setCalculatedCosts] = useState<{ [hospitalName: string]: number }>({});
  const mapRef = useRef<MapView | null>(null);
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });


    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
  
      setUserLocation(currentLocation);
  
      // Animate to user location when the app starts
      mapRef.current?.animateToRegion({
        ...currentLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    })();
  }, []);

  const openGoogleMaps = (hospitalLatitude: number, hospitalLongitude: number) => {
    if (!userLocation) {
      Alert.alert('Error', 'User location not available');
      return;
    }
  
    const origin = `${userLocation.latitude},${userLocation.longitude}`;
    const destination = `${hospitalLatitude},${hospitalLongitude}`;
  
    const url = Platform.select({
      ios: `http://maps.apple.com/?saddr=${origin}&daddr=${destination}`,
      android: `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`,
    });
  
    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Failed to open maps')
    );
  };
  

  const hospitals: Hospital[] = [
    {
      name: 'Alvarado Hospital Medical Center',
      distance: '1.2 miles',
      cost: '$2,500 - $5,000',
      waitingTime: '30 mins',
      latitude: 32.78,
      longitude: -117.0636,
      acceptedInsurances: ['Kaiser Permanente', 'Aetna', 'Cigna'],
    },
    {
      name: 'Sharp Grossmont Hospital',
      distance: '3.5 miles',
      cost: '$1,500 - $3,500',
      waitingTime: '45 mins',
      latitude: 32.7806,
      longitude: -117.01,
      acceptedInsurances: ['Anthem Blue Cross of California', 'UnitedHealthcare', 'Molina Healthcare'],
    },
    {
      name: 'Scripps Mercy Hospital',
      distance: '4.8 miles',
      cost: '$3,000 - $7,000',
      waitingTime: '20 mins',
      latitude: 32.7558,
      longitude: -117.1492,
      acceptedInsurances: ['Blue Shield of California', 'Health Net', 'Oscar Health'],
    },
    {
      name: 'Kaiser Permanente San Diego Medical Center',
      distance: '5.2 miles',
      cost: '$2,000 - $4,500',
      waitingTime: '60 mins',
      latitude: 32.7642,
      longitude: -117.1569,
      acceptedInsurances: ['Kaiser Permanente'],
    },
    {
      name: 'Rady Children Hospital-San Diego',
      distance: '6.0 miles',
      cost: '$2,500 - $6,000',
      waitingTime: '50 mins',
      latitude: 32.7919,
      longitude: -117.1497,
      acceptedInsurances: ['Aetna', 'Cigna', 'UnitedHealthcare'],
    },
    {
      name: 'UC San Diego Health – Hillcrest',
      distance: '7.2 miles',
      cost: '$3,500 - $8,000',
      waitingTime: '35 mins',
      latitude: 32.7614,
      longitude: -117.1675,
      acceptedInsurances: ['Health Net', 'Molina Healthcare', 'Oscar Health'],
    },
    {
      name: 'Sharp Coronado Hospital',
      distance: '10.5 miles',
      cost: '$2,500 - $5,500',
      waitingTime: '40 mins',
      latitude: 32.6915,
      longitude: -117.173,
      acceptedInsurances: ['Anthem Blue Cross of California', 'Blue Shield of California', 'Cigna'],
    },
    {
      name: 'Paradise Valley Hospital',
      distance: '8.3 miles',
      cost: '$1,000 - $3,000',
      waitingTime: '55 mins',
      latitude: 32.6709,
      longitude: -117.0984,
      acceptedInsurances: ['UnitedHealthcare', 'Molina Healthcare', 'Oscar Health'],
    },
  ];

  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      if (response.data.token) {
        await AsyncStorage.setItem('authToken', response.data.token);
        navigation.navigate('Map');
      }
    } catch (error) {
      Alert.alert('Something went wrong');
    }
  };

  const handleHospitalClick = (hospital: Hospital) => {
    // Retrieve the latest cost from the calculatedCosts object if available
    const updatedCost = calculatedCosts[hospital.name]
      ? `$${calculatedCosts[hospital.name].toLocaleString()}`
      : hospital.cost;

    // Update the selected hospital with the new cost
    setSelectedHospital({
      ...hospital,
      cost: updatedCost,
    });

    // Scroll to the top to show the selected hospital
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });

    if (userLocation) {
      // Calculate the latitude and longitude deltas to include both points
      const minLatitude = Math.min(userLocation.latitude, hospital.latitude);
      const maxLatitude = Math.max(userLocation.latitude, hospital.latitude);
      const minLongitude = Math.min(userLocation.longitude, hospital.longitude);
      const maxLongitude = Math.max(userLocation.longitude, hospital.longitude);
  
      const latitudeDelta = (maxLatitude - minLatitude) * 1.5; // Zoom out a bit to ensure both are visible
      const longitudeDelta = (maxLongitude - minLongitude) * 1.5;
  
      // Set region to fit both user and hospital
      setRegion({
        latitude: (userLocation.latitude + hospital.latitude) / 2,
        longitude: (userLocation.longitude + hospital.longitude) / 2,
        latitudeDelta,
        longitudeDelta,
      });
  
      // Animate to the new region
      mapRef.current?.animateToRegion({
        latitude: (userLocation.latitude + hospital.latitude) / 2,
        longitude: (userLocation.longitude + hospital.longitude) / 2,
        latitudeDelta,
        longitudeDelta,
      }, 1000);
    } else {
      // Fallback to zoom into the hospital if user location is not available
      setRegion({
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      mapRef.current?.animateToRegion({
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };
  

  const handleFilter = (option: string) => {
    setFilterOption(option);
    let sorted;
  
    switch (option) {
      case 'distance':
        sorted = [...hospitals].sort(
          (a, b) => parseFloat(a.distance) - parseFloat(b.distance),
        );
        break;
      case 'price':
        sorted = [...hospitals].sort((a, b) => {
          const aPrice = parseInt(a.cost.split('-')[0].replace(/\D/g, ''));
          const bPrice = parseInt(b.cost.split('-')[0].replace(/\D/g, ''));
          return aPrice - bPrice;
        });
        break;
      case 'waitingTime':
        sorted = [...hospitals].sort(
          (a, b) => parseInt(a.waitingTime) - parseInt(b.waitingTime),
        );
        break;
      default:
        sorted = hospitals;
    }
  
    setFilteredHospitals(sorted);
  
    // If a hospital is selected, update its details with the new filtered list
    if (selectedHospital) {
      const updatedHospital = sorted.find(
        (hospital) => hospital.name === selectedHospital.name
      );
      if (updatedHospital) {
        setSelectedHospital(updatedHospital); // Update the selected hospital details
      }
    }
  };
  

  // Generate random costs when injury or insurance changes
  useEffect(() => {
    if (selectedInjury) {
      const newCosts: { [hospitalName: string]: number } = {};
      hospitals.forEach((hospital) => {
        // Parse the cost range
        const [minCostStr, maxCostStr] = hospital.cost
          .split('-')
          .map((s) => s.trim().replace(/\D/g, ''));
        const minCost = parseInt(minCostStr);
        const maxCost = parseInt(maxCostStr);
  
        // Generate random cost within range
        let randomCost = Math.floor(Math.random() * (maxCost - minCost + 1)) + minCost;
  
        // If insurance is accepted, lower the cost by 30%
        if (selectedInsurance && hospital.acceptedInsurances.includes(selectedInsurance)) {
          randomCost = randomCost * 0.7;
        }
  
        // Round to nearest dollar
        randomCost = Math.round(randomCost);
  
        newCosts[hospital.name] = randomCost;
      });
  
      setCalculatedCosts(newCosts);
  
      // Update the selected hospital cost if it is selected
      if (selectedHospital) {
        const updatedCost = newCosts[selectedHospital.name];
        if (updatedCost) {
          setSelectedHospital((prev) => ({
            ...prev!,
            cost: `$${updatedCost}`,
          }));
        }
      }
    } else {
      setCalculatedCosts({});
    }
  }, [selectedInjury, selectedInsurance]);
  

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
      <View style={styles.content}>
        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            region={region}>
            <UrlTile
              urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              zIndex={-1}
            />
            {userLocation && (
              <Marker
                coordinate={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude,
                }}
                title="You are here"
                pinColor="blue"
              />
            )}

            {selectedHospital && (
              <Marker
                coordinate={{
                  latitude: selectedHospital.latitude,
                  longitude: selectedHospital.longitude,
                }}
                title={selectedHospital.name}
              />
            )}
          </MapView>
        </View>
        {selectedHospital && (
        <View style={styles.selectedHospitalContainer}>
          <Text style={styles.selectedHospitalName}>{selectedHospital.name}</Text>
          <Text>Distance: {selectedHospital.distance}</Text>
          <Text>Waiting Time: {selectedHospital.waitingTime}</Text>
          <Text>Cost Range: {selectedHospital.cost}</Text>
          
          <TouchableOpacity
            style={styles.directionsButton}
            onPress={() =>
              openGoogleMaps(selectedHospital.latitude, selectedHospital.longitude)
            }
          >
            <MaterialIcons name="directions" size={20} color="white" />
            <Text style={styles.directionsButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      )}

        {/* Insurance Selector */}
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setShowInsuranceSelector(true)}
        >
          <Text style={styles.selectorButtonText}>
            {selectedInsurance ? selectedInsurance : 'No Insurance Selected'}
          </Text>
        </TouchableOpacity>

        <Modal visible={showInsuranceSelector} transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Picker
                selectedValue={selectedInsurance}
                onValueChange={(itemValue) => {
                  setSelectedInsurance(itemValue);
                  setShowInsuranceSelector(false); // Close the modal
                }}
              >
                <Picker.Item label="Select Insurance" value="" />
                {insuranceOptions.map((insurance, index) => (
                  <Picker.Item key={index} label={insurance} value={insurance} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>

        {/* Injury Selector */}
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setShowInjurySelector(true)}
        >
          <Text style={styles.selectorButtonText}>
            {selectedInjury ? selectedInjury : 'No Injury Selected'}
          </Text>
        </TouchableOpacity>

        <Modal visible={showInjurySelector} transparent>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Picker
                selectedValue={selectedInjury}
                onValueChange={(itemValue) => {
                  setSelectedInjury(itemValue);
                  setShowInjurySelector(false); // Close the modal
                }}
              >
                <Picker.Item label="Select Injury" value="" />
                {injuryOptions.map((injury, index) => (
                  <Picker.Item key={index} label={injury} value={injury} />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>



        {/* Filter Options */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Filter by:</Text>
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterOption === 'distance' && styles.activeFilterButton,
              ]}
              onPress={() => handleFilter('distance')}>
              <Text style={styles.filterButtonText}>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterOption === 'price' && styles.activeFilterButton,
              ]}
              onPress={() => handleFilter('price')}>
              <Text style={styles.filterButtonText}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterOption === 'waitingTime' && styles.activeFilterButton,
              ]}
              onPress={() => handleFilter('waitingTime')}>
              <Text style={styles.filterButtonText}>Wait</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Hospital List */}
        <Text style={styles.hospitalTitle}>Hospitals near You:</Text>
        {filteredHospitals.map((hospital, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleHospitalClick(hospital)}
            style={[
              styles.hospitalItem,
              selectedHospital?.name === hospital.name && styles.selectedHospitalItem,
            ]}
          >
            <View style={styles.hospitalRow}>
              <View style={styles.hospitalDetails}>
                <Text style={styles.hospitalName}>{hospital.name}</Text>
                <Text>Distance: {hospital.distance}</Text>
                <Text>Waiting Time: {hospital.waitingTime}</Text>
                {selectedInjury ? (
                  <Text>
                    Estimated Cost: $
                    {calculatedCosts[hospital.name]
                      ? calculatedCosts[hospital.name].toLocaleString()
                      : 'Calculating...'}
                  </Text>
                ) : (
                  <Text>Cost Range: {hospital.cost}</Text>
                )}
                {selectedInsurance && hospital.acceptedInsurances.includes(selectedInsurance) ? (
                  <Text style={styles.insuranceAccepted}>Insurance Accepted</Text>
                ) : selectedInsurance ? (
                  <Text style={styles.insuranceNotAccepted}>Insurance Not Accepted</Text>
                ) : null}
              </View>

              {/* Arrow Button for Directions */}
              <TouchableOpacity
                onPress={() => openGoogleMaps(hospital.latitude, hospital.longitude)}
                style={styles.arrowButton}
              >
                <MaterialIcons name="directions" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  selectorContainer: {
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  selectorButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  selectorButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  hospitalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hospitalItem: {
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },  
  hospitalRow: {
    flexDirection: 'row', // Aligns hospital details and arrow horizontally
    justifyContent: 'space-between', // Space between the details and arrow
    alignItems: 'center', // Aligns content vertically in the center
  },
  hospitalDetails: {
    flex: 1, // Allows the details to take available space
  },
  selectedHospitalItem: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  hospitalName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 2, // Add a slight shadow for depth
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  insuranceAccepted: {
    marginTop: 5,
    color: 'green',
    fontWeight: 'bold',
  },
  insuranceNotAccepted: {
    marginTop: 5,
    color: 'red',
    fontWeight: 'bold',
  },
  inlineContainer: {
    marginTop: 5, // Control space between button and picker
    marginBottom: 10, // Optional: control space below the picker
    paddingHorizontal: 10, // Add slight padding to prevent crowding
    backgroundColor: 'white',
    borderRadius: 5,
  },
  arrowContainer: {
    marginLeft: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#007AFF',
  },
  arrowButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
  },
  selectedHospitalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2, // Shadow on Android
    shadowColor: '#000', // Shadow on iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectedHospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  directionsButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  
  
  
});

export default LoginScreen;
