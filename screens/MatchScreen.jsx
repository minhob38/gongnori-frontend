import produce from "immer";
import React, { useEffect } from "react";
import { StyleSheet, View, FlatList, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import _ from "lodash";
import MatchHeader from "../components/MatchHeader";
import MatchItem from "../components/MatchItem";
import SideButton from "../components/SideButton";
import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";
import * as device from "../constants/device";

export default function MatchListScreen({ navigation }) {
  const matches = useSelector((state) => {
    return state.appReducer.matches;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const _matches = _.cloneDeep(matches);

  const sortedMatches = _matches.sort((a, b) => {
    const milliSecA = new Date(a.playtime.start).getTime();
    const milliSecB = new Date(b.playtime.start).getTime();
    return milliSecA - milliSecB;
  });

  return (
    <View style={styles.container}>
      <MatchHeader />
        <FlatList
          style={styles.flatlist}
          contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center" }}
          keyExtractor={(item) => item.id}
          data={sortedMatches}
          renderItem={({ item }) => <MatchItem item={item} navigation={navigation} />}
        />

      <SideButton
        navigation={navigation}
        path={"MatchCreate"}
        rank={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: device.OS === "androind" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.PRIMARY_GRAY,
  },
  flatlist: {
    flex: 1,
    width: sizes.DEVICE_WIDTH,
    marginTop: 30,
  },
});
