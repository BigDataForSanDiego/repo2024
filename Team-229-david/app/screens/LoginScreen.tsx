// Updated code
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../types/screenprops';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

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
  const [region, setRegion] = useState({
    latitude: 32.7757,
    longitude: -117.0719,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [filterOption, setFilterOption] = useState('none');
  const [selectedInsurance, setSelectedInsurance] = useState('');
  const [selectedInjury, setSelectedInjury] = useState('');
  const [showInsuranceSelector, setShowInsuranceSelector] = useState(false);
  const [showInjurySelector, setShowInjurySelector] = useState(false);
  const [calculatedCosts, setCalculatedCosts] = useState<{ [hospitalName: string]: number }>({});
  const mapRef = useRef<MapView | null>(null);

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
    setSelectedHospital(hospital);
    setRegion({
      latitude: hospital.latitude,
      longitude: hospital.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current?.animateToRegion(
      {
        latitude: hospital.latitude,
        longitude: hospital.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000,
    );
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
    } else {
      setCalculatedCosts({});
    }
  }, [selectedInjury, selectedInsurance]);

  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.filterTitle}>Your info:</Text>
        {/* Insurance Selector */}
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setShowInsuranceSelector(!showInsuranceSelector)}>
          <Text style={styles.selectorButtonText}>
            {showInsuranceSelector ? 'Hide Insurance Options' : 'Show Insurance Options'}
          </Text>
        </TouchableOpacity>
        {showInsuranceSelector && (
          <View style={styles.selectorContainer}>
            <Text style={styles.selectorTitle}>Select Insurance:</Text>
            <Picker
              selectedValue={selectedInsurance}
              onValueChange={(itemValue, itemIndex) => setSelectedInsurance(itemValue)}>
              <Picker.Item label="Select Insurance" value="" />
              {insuranceOptions.map((insurance, index) => (
                <Picker.Item key={index} label={insurance} value={insurance} />
              ))}
            </Picker>
          </View>
        )}

        {/* Injury Selector */}
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={() => setShowInjurySelector(!showInjurySelector)}>
          <Text style={styles.selectorButtonText}>
            {showInjurySelector ? 'Hide Injury Options' : 'Show Injury Options'}
          </Text>
        </TouchableOpacity>
        {showInjurySelector && (
          <View style={styles.selectorContainer}>
            <Text style={styles.selectorTitle}>Select Injury:</Text>
            <Picker
              selectedValue={selectedInjury}
              onValueChange={(itemValue, itemIndex) => setSelectedInjury(itemValue)}>
              <Picker.Item label="Select Injury" value="" />
              {injuryOptions.map((injury, index) => (
                <Picker.Item key={index} label={injury} value={injury} />
              ))}
            </Picker>
          </View>
        )}

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
        <Text style={styles.hospitalTitle}>Hospitals near SDSU:</Text>
        {filteredHospitals.map((hospital, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleHospitalClick(hospital)}>
            <View
              style={[
                styles.hospitalItem,
                selectedHospital?.name === hospital.name && styles.selectedHospitalItem,
              ]}>
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
    marginBottom: 10,
  },
  selectorButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
    marginVertical: 20,
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
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
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
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    textAlign: 'center',
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
});

export default LoginScreen;
