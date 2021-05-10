import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
// import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from "react-native-maps";
import produce from "immer";
import DropDown from "../components/DropDown";
import useMyLocation from "../hooks/useMyLocation";
import getDateFromMonth from "../utils/getDateFromMonth";
import { getPlayground } from "../actions/actions";
import PlaceMap from "../components/PlaceMap";

const CURRENT_YEAR = (new Date().getFullYear()).toString();
const CURRENT_MONTH = (new Date().getMonth() + 1).toString();
const CURRENT_DATE = (new Date().getDate()).toString();

export default function MatchCreateScreen() {
  const playgrounds = useSelector((state) => {
    return state.playgroundReducer.playgrounds;
  }, (prev, next) => {
    return produce(prev, (draft) => draft) === produce(next, (draft) => draft);
  });

  const dispatch = useDispatch();

  const [match, setMatch] = useState({
    type: "",
    year: CURRENT_YEAR,
    month: "",
    date: "",
    meridiem: "",
    start: "",
    end: "",
    playGround: "",
  });
  const [myLocation, myGeoCode] = useMyLocation();

  useEffect(() => {
    dispatch(getPlayground("경기도", "용인시", "수지구"));
  }, []);

  const handleSelectType = (index, value) => setMatch({ ...match, type: value });
  const handleSelectMonth = (index, value) => setMatch({ ...match, month: value });
  const handleSelectDate = (index, value) => setMatch({ ...match, date: value });
  const handleSelectMeridiem = (index, value) => setMatch({ ...match, meridiem: value });
  const handleSelectStart = (index, value) => setMatch({ ...match, start: value });
  const handleSelectEnd = (index, value) => setMatch({ ...match, end: value });
  const handleSelectGround = (index, value) => setMatch({ ...match, playGround: value });

  return (
    <View style={styles.container}>
      <View style={styles.type}>
        <Text>경기 방식</Text>
        <DropDown
          value={"5:5"}
          options={["5:5", "6:6", "7:7"]}
          width={60}
          height={30}
          fontSize={15}
          onSelect={handleSelectType}
        />
      </View>
      <View style={styles.date}>
        <Text>경기 날짜</Text>
        <DropDown
          value={CURRENT_MONTH}
          options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
          width={60}
          height={30}
          fontSize={15}
          onSelect={handleSelectMonth}
        />
        <Text>월</Text>
        <DropDown
          value={CURRENT_DATE}
          options={getDateFromMonth(match.year, match.month)}
          width={60}
          height={30}
          fontSize={15}
          onSelect={handleSelectDate}
        />
        <Text>일</Text>
      </View>
      <View style={styles.time}>
        <Text>경기 시간</Text>
        <DropDown
          value="AM"
          options={["AM", "PM"]}
          width={60}
          height={30}
          fontSize={15}
          onSelect={handleSelectMeridiem}
        />
        <DropDown
          value="12:00"
          options={["12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "1:00"]}
          width={60}
          height={30}
          fontSize={15}
          onSelect={handleSelectStart}
        />
        <Text>~</Text>
        <DropDown
          value="12:00"
          options={["12:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "1:00"]}
          width={60}
          height={30}
          fontSize={15}
          onSelect={handleSelectEnd}
        />
      </View>
      <View style={styles.stadium}>
        <Text>경기장소</Text>
      </View>
      <View style={styles.map}>
        {myLocation && <PlaceMap origin={myLocation} places={playgrounds} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#FAF2E0",
  },
  type: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  date: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  time: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  playground: {
    flex: 1,
    justifyContent: "flex-start",
  },
  map: {
    flex: 5,
    justifyContent: "flex-start",
  },
});
