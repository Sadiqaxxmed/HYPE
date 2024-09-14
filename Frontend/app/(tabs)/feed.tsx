import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';


export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <View style={navStyles.container}>
        <View style={{ backgroundColor: 'black', height: 30, marginLeft: 20, marginTop: 15}}>
            <Ionicons name="search-outline" size={25} color={'white'} />
          </View>
          <View style={{ backgroundColor: 'black', width: 150, alignItems: 'center'}}>
            <Text style={{ color: Colors.customRed.tint, fontSize: 20, fontFamily: 'Pacifico'}}> Hype </Text>
            <View style={{ backgroundColor: 'black', width: 130, flexDirection: 'row', paddingTop: 5}}>
              <Text style={{ color: 'white', fontSize: 12, fontFamily: ''}}> Subscribed </Text>
              <Text style={{ color: 'white', fontSize: 12, fontFamily: ''}}> Featured </Text>
            </View>           
          </View>
          <View style={{ backgroundColor: 'black', height: 30, marginRight: 20, marginTop: 15}}>
            <Ionicons name="notifications-outline" size={25} color={'white'} />         
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});

const navStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '7%',
    width: '100%',
    backgroundColor: 'black'
  },
});

const postcardStyles = StyleSheet.create({
  container: {
  },
});

