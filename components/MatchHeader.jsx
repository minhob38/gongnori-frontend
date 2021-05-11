import React from "react";
import { StyleSheet, View } from "react-native";
import DropDown from "./DropDown";
import DateController from "./DateController";
import * as color from "../constants/colors";
import * as size from "../constants/sizes";

export default function MatchHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <DropDown
          value="보정동"
          options={["보정동", "성복동"]}
          width={size.MATCH_HEADER_DROPDOWN_WIDTH}
          height={size.MATCH_HEADER_DROPDOWN_HEIGHT}
          fontSize={15}
        />
      </View>
      <View style={styles.date}>
        <DateController />
      </View>
      <View style={styles.sports}>
        <DropDown
          value="축구"
          options={["축구", "농구", "야구"]}
          width={size.MATCH_HEADER_DROPDOWN_WIDTH}
          height={size.MATCH_HEADER_DROPDOWN_HEIGHT}
          fontSize={15}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: size.MATCH_HEADER_HEIGHT,
    backgroundColor: color.PRIMARY_BLUE,
  },
  location: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  sports: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
