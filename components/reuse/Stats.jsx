import { StyleSheet, View } from "react-native";
import { Stat } from "./Stat";

export function Stats({
  data: {
    recordTemp,
    feelTemp,
    mins,
    km,
    outOfDepth,
    sizeKey,
    shore,
    bankAngle,
    clarity,
  },
}) {
  return (
    <View style={styles.stats}>
      {recordTemp !== null && <Stat icon={"recordTemp"} val={recordTemp} />}
      {feelTemp !== null && <Stat icon={"feelTemp"} val={feelTemp} />}
      {mins !== null && <Stat icon={"mins"} val={mins} />}
      {km !== null && <Stat icon={"km"} val={km} />}
      {outOfDepth !== null && <Stat icon={"outOfDepth"} val={outOfDepth} />}
      {sizeKey !== null && <Stat icon={"sizeKey"} val={sizeKey} />}
      {shore !== null && <Stat icon={"shore"} val={shore} />}
      {bankAngle !== null && <Stat icon={"bankAngle"} val={bankAngle} />}
      {clarity !== null && <Stat icon={"recordTemp"} val={clarity} />}
    </View>
  );
}

const styles = StyleSheet.create({
  stats: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
});
