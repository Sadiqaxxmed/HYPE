import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/store';
import { fetchOutfits } from '@/store/outfit';
import { fetchCurrentUser, getAllUsers } from '@/store/session';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';


export default function FeedScreen() {

  const dispatch = useDispatch<AppDispatch>();
  const { outfits, status: outfitStatus, error: outfitError } = useSelector((state: RootState) => state.outfit);
  const { user: currentUser, users, status: userStatus, error: userError } = useSelector((state: RootState) => state.session);

  useEffect(() => {
    if (outfitStatus === 'idle') {
      dispatch(fetchOutfits());
    }
    if (userStatus === 'idle') {
      dispatch(fetchCurrentUser());
      dispatch(getAllUsers());
    }
  }, [dispatch, outfitStatus, userStatus]);

    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options);
    };

  return (
    <View style={{}}>

      <View style={navStyle.nav}>
        <View style={{ backgroundColor: 'transparent', height: 30, marginLeft: 20, marginTop: 15}}>
            <Ionicons name="search-outline" size={25} color={'white'} />
          </View>
          <View style={{ backgroundColor: 'transparent', height: 30, width: 150, alignItems: 'center'}}>
            <Text style={{ color: Colors.dark.hypeColor, fontSize: 20, fontFamily: 'Pacifico'}}> Hype </Text>
            <View style={{ backgroundColor: 'transparent', width: 130, flexDirection: 'row', paddingTop: 5}}>
              <Text style={{ color: 'white', fontSize: 12, fontFamily: ''}}> Subscribed </Text>
              <Text style={{ color: 'white', fontSize: 12, fontFamily: ''}}> Featured </Text>
            </View>           
          </View>
          <View style={{ backgroundColor: 'transparent', height: 30, marginRight: 20, marginTop: 15}}>
            <Ionicons name="notifications-outline" size={25} color={'white'} />         
          </View>
      </View>

      <ScrollView style={postCardStyle.container}>
        {Object.keys(outfits).length > 0 ? (
          Object.keys(outfits).map(key => {
            const outfit = outfits[key];
            const userOutfis = users[outfit.user_id]; 

            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 0 }} key={key}>
                {outfit.images && outfit.images.length > 0 && (
                  <Image
                    style={{ height: 500, width: 380, borderRadius: 20 }}
                    source={{ uri: outfit.images[0] }}
                  />
                )}
                <View style={postCardStyle.postCard}>
                  {userOutfis && (
                    <>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center'}}>
                      <View style={{flex: 1, flexDirection: 'row' }}>
                        <View style={{paddingTop: 10, paddingLeft: 10}}>
                          <Image  style={{height: 50, width: 50, borderRadius: 50}} source={{ uri: userOutfis.profile_pic}}/>
                        </View>
                      <View style={{flex: 1, flexDirection: 'column', paddingTop: 10, paddingLeft: 13, gap: 5}}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{userOutfis.username}</Text>
                        <Text style={{ color: Colors.dark.lightGrey, fontSize: 13, fontWeight: '700' }}>{formatDate(userOutfis.created_at)}</Text>
                      </View>
                      </View>
                      <View style={{paddingTop: 12, paddingRight: 10}}>
                        <Ionicons name="star-outline" size={40} color={'white'}/>
                      </View>
                    </View>
                    </>
                  )} 
                </View>
              </View>
            );
          })
        ) : (
          <Text>No outfits available.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const postCardStyle = StyleSheet.create({
  container: {
    top: 120,
    height: 750,
  },
  postCard: {
    top: -30,
    left: 3,
    height: 70,
    width: 350,
    borderRadius: 20,
    backgroundColor: Colors.dark.darkGrey
  }
})

const navStyle = StyleSheet.create({
  nav: {
    flex: 1,
    flexDirection: 'row',
    top: 50,
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
})