import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import * as size from  "../constants/sizes";
import * as font from  "../constants/fonts";

export default function MyTeamOverview() {
  return (
    <View style={styles.overview}>
      <View style={styles.emblemContainer}>
        <Image
          style={styles.emblem}
          source={require("../assets/realmadrid_emblem.png")}
        />
      </View>
      <View style={styles.descripitonContainer}>
        <View style={styles.description}>
          <Text style={styles.title}>팀이름</Text>
          <Text style={styles.content}>양민FC</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>지역</Text>
          <Text style={styles.content}>용인시 수지구</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>전적</Text>
          <Text style={styles.content}>10승5패</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>매너</Text>
          <Text style={styles.content}>5/5</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.title}>팀원</Text>
          <Text style={styles.content}>10명</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overview: {
    height: size.MY_TEAM_OVERVIEW_HEIGHT,
    width: size.MY_TEAM_OVERVIEW_WIDTH,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "yellow",
  },
  emblemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  emblem: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  descripitonContainer: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    height: "100%",
    paddingLeft: 10,
  },
  description: {
    flexDirection: "row",
  },
  title: {
    flex: 1,
    flexDirection: "row",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: size.MY_TEAM_OVERVIEW_TITLE_FONT_SIZE,
    fontFamily: font.BLACK_HANS_SANS_400_REGULAR,
  },
  content: {
    flex: 3,
    flexDirection: "row",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: font.MY_TEAM_OVERVIEW_CONTENT_FONT_SIZE,
    fontFamily: font.DO_HYEON_400_REGULAR,
  },
});
