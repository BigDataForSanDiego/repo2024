import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView >
        <View style={styles.topHalf}>
            <View style={styles.header}>
            <Text style={styles.userName}>Wilma</Text>
            <TouchableOpacity>
                <Text style={styles.switchPatient}><Icon name='person-outline' size={35} color="#007783" /></Text>
            </TouchableOpacity>
        </View>
  
        <View style={styles.appointmentCard}>
          <Text style={styles.timeSensitive}>⚠️ Time sensitive</Text>
          <Text style={styles.appointmentTitle}>Schedule your appointment</Text>
          <Text style={styles.appointmentDesc}>AMB REFERRAL TO ALLERGY</Text>
          <View style={styles.scheduleDate}>
            <View style={styles.eventNotif}>
              <Icon name='event' />
            </View>
            <Text style={styles.eventText}>Schedule before Wednesday, <br/>Apr. 21</Text>
          </View>
        </View>
        </View>

        <Text style={styles.heading}>
          Get Care
        </Text>
  
        <View style={styles.careSection}>
          <TouchableOpacity style={styles.careCard}>
            <Text style={styles.careTitle}>Doctor's appointment</Text>
            <Text style={styles.careDesc}>Schedule with your care team</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.careCard}>
            <Text style={styles.careTitle}>Same-day care</Text>
            <Text style={styles.careDesc}>In-person and virtual visits for urgent health concerns</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.careCard}>
            <Text style={styles.careTitle}>Schedule a service</Text>
            <Text style={styles.careDesc}>Lab work, screenings, vaccines</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.careCard}>
            <Text style={styles.careTitle}>Covid, Flu, or Cough</Text>
            <Text style={styles.careDesc}>Get care advice based off your current symptoms</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>
          Appointments
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.appointments}>
        <View style={styles.section}>
          <View style={styles.card}>
            <Text style={styles.doctorName}>Julie Powers, MD</Text>
            <Text style={styles.clinic}>Sharp Rees-Stealy Primary Care</Text>
            <Text style={styles.appointmentTime}>Friday, Feb 23 - 8:30 AM</Text>
            <Text style={styles.visitType}>In-person visit</Text>
            <Button title="Early check-in available" onPress={() => {}} />
          </View>
          <View style={styles.card}>
            <Text style={styles.doctorName}>John Smith, MD</Text>
            <Text style={styles.clinic}>Downtown Family Medicine</Text>
            <Text style={styles.appointmentTime}>Monday, Feb 26 - 9:00 AM</Text>
            <Text style={styles.visitType}>Telehealth visit</Text>
            <Button title="Early check-in available" onPress={() => {}} />
          </View>
          <View style={styles.card}>
            <Text style={styles.doctorName}>Mary Johnson, MD</Text>
            <Text style={styles.clinic}>City Center Medical</Text>
            <Text style={styles.appointmentTime}>Tuesday, Feb 27 - 10:30 AM</Text>
            <Text style={styles.visitType}>In-person visit</Text>
            <Button title="Early check-in available" onPress={() => {}} />
          </View>
        </View>
      </ScrollView>

      <Text style={styles.heading}>
          Medication
      </Text>
      
      <View style={styles.medication}>
        <Icon name='medication' size={35} color= '#007B7F'/>
        <Text style={styles.perscription} >View perscriptions</Text>
      </View>

      <Text style={styles.heading}>
          Trials  
      </Text>

        <TouchableOpacity
          style={styles.medication}
          onPress={() => navigation.navigate('TrialPage')} 
        >
        <Icon name='wysiwyg' size={35} color= '#007B7F'/>
        <View style={styles.trials}>
          <Text style={styles.perscription} >View Trials</Text>
          <Text style={styles.perscriptionDesc}>Search for clinical trials near you based on your profile</Text>
        </View>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    topHalf: {
        backgroundColor: '#E5F3F4',
        padding: 16,
        marginBottom: 20
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    switchPatient: {
      
      color: '#00A3CF',
    },
    appointmentCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      borderColor: '#000000',
      paddingBottom: 20,
      marginBottom: 20, 
    },
    timeSensitive: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 15,
      marginBottom: 8,
      backgroundColor: '#007783',
      borderTopLeftRadius: 10,   
      borderTopRightRadius: 10,
      padding: 10
    },
    eventNotif: {
      marginRight: 16
    },
    appointmentTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#007B7F',
      paddingLeft: 10
    },
    appointmentDesc: {
      fontSize: 16,
      color: '#333',
      marginVertical: 8,
      paddingLeft: 10,
    },
    scheduleDate: {
      padding: 10,
      backgroundColor: '#C6E3E6',
      borderRadius: 10,
      alignSelf: 'center',
      flexDirection: 'row',
      paddingLeft: 50,
      paddingRight: 50
    },
    eventText: {
      fontSize: 14,
      color: '#414141',
      fontWeight: 'bold',
      textAlign: 'left'
    },
    careSection: {
      padding: 20,
      backgroundColor: '#FFFFFF'
    },
    careCard: {
      backgroundColor: '#E5F3F4',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
    },
    careTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#007B7F',
    },
    careDesc: {
      fontSize: 14,
      color: '#555',
      marginTop: 4,
    },
    heading: {
      fontWeight: 'bold',
      fontSize: 18,
      paddingLeft: 20,
    },

    appointments: {
      flex: 1
    },
    section: {
      padding: 24,
      flexDirection: 'row'
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    card: {
      backgroundColor: '#E5F3F4',
      maxWidth: 250,
      padding: 16,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      marginRight: 10
    },
    doctorName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    clinic: {
      color: '#666',
      marginBottom: 4,
    },
    appointmentTime: {
      color: '#666',
      marginBottom: 4,
    },
    visitType: {
      color: '#666',
      marginBottom: 12,
    },

    medication: {
      display: 'flex',
      backgroundColor: '#E5F3F4', 
      flexDirection: 'row',
      paddingTop: 20,
      paddingBottom: 20,
      margin: 20,
      paddingLeft: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    trials: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center'
    },
    perscription: {
      color: '#007B7F',
      borderRadius: 10,
      fontWeight: 'bold',
      fontSize: 15,
      paddingLeft: 10,
    },
    perscriptionDesc: {
      fontSize: 14,
      color: '#666',
      flexWrap: 'wrap',
      lineHeight: 20, 
      maxWidth: 250,
      paddingLeft: 10
    }
  });
