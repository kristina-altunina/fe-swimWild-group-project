import { Text, View } from "react-native"
import PagerView from 'react-native-pager-view';
import { Image } from "react-native";
import NavBar from "./NavBar";
import PaginationDot from 'react-native-animated-pagination-dot';
import { useState } from "react";
import StarRating from 'react-native-star-rating'

export default function SwimSpot({navigation, route:{params:{swim}}}) {
  const [curImagePage, setCurImagePage] = useState(0)

  function StarRatingDisplay({num}) {
    return (
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3
      }}>
            <Text>
                Rating: 
            </Text>
            <StarRating
            disabled={true}
            maxStars={5}
            starSize={18}
            rating={4}
            fullStarColor="yellow"
            />
        </View>
    )
}

  // const swim = {
  //   "date": "2023-08-14T11:00:00.000Z",
  //   "location": {
  //   "name": "Burnsall, River Wharfe",
  //   "id": "650dd24c667ea748708385ab",
  //   "_id": "650dd24c667ea748708385f0"
  //   },
  //   "notes": "Was told to come here by some friends but afraid I can't recommend - water was cold and fast flowing, also no easy access into the river",
  //   "stars": 2,
  //   "recordTemp": "test",
  //   "feelTemp": "cold",
  //   "mins": "test",
  //   "km": "test",
  //   "outOfDepth": false,
  //   "sizeKey": "medium",
  //   "shore": "rocky",
  //   "bankAngle": "medium",
  //   "clarity": "murky",
  //   "imgUrls": [
  //   "https://www.yorkshire-dales.com/appletreewick-05.jpg",
  //   "https://static.independent.co.uk/2022/04/12/08/newFile-2.jpg?width=1200",
  //   "https://www.yorkshire-dales.com/appletreewick-05.jpg",
  //   "https://files.holidaycottages.co.uk/gorgeouscottages%2Fguides%2F1689166492104-Kisdon+Force.jpg"
  //   ],
  //   "_id": "650dd24c667ea748708385ef",
  //   "uid": "g1JGTlWQKka03Kza0bVyQIXR25u1",
  //   "name": "Greg Seymour",
  //   "nickname": "gregthemeg",
  //   "profileImg": "https://media.istockphoto.com/id/1125707375/photo/businessman-going-to-office-on-bicycle.jpg?s=612x612&w=0&k=20&c=gnUglrbu8j0g7oDNsmSKMzoY1_Ho7sGZ0xSboVXkS_8="
  //   }

    function handleSelectedPage(e) {
      setCurImagePage(curImagePage => e.nativeEvent.position)
    }

  return (
    <View style={{ flex: 1 }}>
      <NavBar navigation={navigation}/>
      <View style={{width: '100%',
      height: '50%',
      padding: '5%',
      display: 'flex',
      alignItems: 'center'}}>
        <PagerView style={{width: '100%', height: '100%'}}
        initialPage={0}
        scrollEnabled={true}
        orientation='horizontal'
        onPageSelected={(e) => handleSelectedPage(e)}>
          {
            swim.imgUrls.map((picture, i) => {
              return (
                <View key={i}
                collapsable={false}>
                <Image style={{width: '100%', height: '100%'}}
                source={{uri: picture}}
                collapsable={false}
                />
                </View>
              )
            })
          }
          </PagerView>
          <PaginationDot
          activeDotColor="black"
          curPage={curImagePage}
          maxPage={swim.imgUrls.length}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>
          {swim.location.name}
          </Text>
          <Text>
          {new Date(swim.date).toDateString()}
          </Text>
        </View>
        <Text>
          name: {swim.name} / nickname: {swim.nickname}
        </Text>
        <StarRatingDisplay num={swim.stars}/>
        <View>
          <Text>
            feelTemp: {swim.feelTemp} / recordTemp: {swim.recordTemp}
          </Text>
          <Text>
            distance: {swim.km} / time : {swim.mins}
          </Text>
        </View>
        <Text>
          {swim.notes}
        </Text>
        <Text>
            Bank Angle: {swim.bankAngle}
        </Text>
        <Text>
            Clarity: {swim.clarity}
        </Text>
        <Text>
            Out of Depth: {swim.outOfDepth}
        </Text>
        <Text>
            Shore Condition: {swim.shore}
        </Text>
      </View>
      
  );
};