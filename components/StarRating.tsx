import React, { memo, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

const StarRating = ({ rating, count }: { rating: number, count: number }) => {
  const starColor = useThemeColor({}, 'starColor')
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const starsRender = useMemo(() => Array.from({ length: totalStars }, (_, index) => {
    if (index < fullStars)
      return <MaterialIcons key={index} name="star-rate" color={starColor} />;
    if (index === fullStars && halfStar)
      return <MaterialIcons key={index} name="star-half" color={starColor} />;
    return <MaterialIcons key={index} name="star-border" color={starColor} />;
  }), [rating]);

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>
        {count}
      </ThemedText>
      <View style={styles.subContaienr}>
        {starsRender}
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8
  },
  subContaienr: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    top: 1
  },
});


export default memo(StarRating);
