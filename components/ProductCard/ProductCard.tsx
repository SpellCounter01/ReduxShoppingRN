import { Image, useColorScheme, View, StyleSheet, Dimensions, ViewStyle, TextStyle } from "react-native";
import React, { memo, useMemo, useRef } from "react";
import { Product } from "@/interfaces/product";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import StarRating from "../StarRating";

const ProductCard = ({ item }: { item: Product }) => {
  const theme = useColorScheme();

  const colors = {
    background: {
      light: theme === "dark" ? "#000000" : "#c1c1c1",
      dark: theme === "dark" ? "#000000" : "#c1c1c1",
    },
    text: {
      light: theme !== "dark" ? "#000000" : "#ffffff",
      dark: theme !== "dark" ? "#000000" : "#ffffff",
    },
  };

  const cachedMediaQueries = useRef<{ [key: string]: { [key: string]: ViewStyle | TextStyle } }>({});

  const mediaQueries = useMemo(() => {
    if (!cachedMediaQueries.current[Dimensions.get("screen").width]) {
      cachedMediaQueries.current[Dimensions.get("screen").width] = Dimensions.get("screen").width < 1000
        ? { subInfoContainer: { flexDirection: "row" } }
        : { subInfoContainer: { flexDirection: "column" } };
    }
    return cachedMediaQueries.current[Dimensions.get("screen").width];
  }, [Dimensions.get("screen").width]);

  return (
    <ThemedView
      style={styles.container}
      lightColor={colors.background.light}
      darkColor={colors.background.dark}
      key={item.id}
    >
      <Image
        style={styles.image}
        source={{ uri: item.thumbnail }}
        resizeMode="contain"
      />
      <ThemedView
        style={{ flex: 1, gap: 10 }}
        lightColor={colors.background.light}
        darkColor={colors.background.dark}
      >
        <ThemedText
          lightColor={colors.text.light}
          darkColor={colors.text.dark}
          type="title"
          style={[{ fontSize: 24, flex: 1 }]}>
          {item.title}
        </ThemedText>
        <View style={{ flex: 1 }}>
          <View style={styles.infoContainer}>
            <View style={[styles.subInfoContainer, mediaQueries.subInfoContainer as ViewStyle]}>
              <View style={{ flexDirection: 'row', flex: 1, gap: 8 }}>
                <ThemedText lightColor={colors.text.light} darkColor={colors.text.dark}>
                  {item.price}€
                </ThemedText>
                <View>
                  <ThemedText lightColor={colors.text.light} darkColor={colors.text.dark} style={styles.discountText}>
                    {item.discountPercentage}%
                  </ThemedText>
                </View>
              </View>
              <StarRating count={item.reviews.length} rating={item.rating} />
            </View>
          </View>
        </View>
      </ThemedView>
    </ThemedView >
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flex: 1,
    justifyContent: "center",
  },
  discountText: {
    backgroundColor: "red",
    width: "auto",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  infoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    gap: 10,
  },
  subInfoContainer: {
    flex: 1,
    gap: 8,
    flexDirection: 'row'
  },
  image: { height: 150, width: 150, alignSelf: "center" },
});

export default memo(ProductCard);
