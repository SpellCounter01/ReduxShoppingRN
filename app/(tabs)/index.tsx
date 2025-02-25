import ProductCard from "@/components/ProductCard/ProductCard";
import ProductFiltersHeader from "@/components/ProductFiltersHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts } from "@/store/product/productSlice";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Dimensions,
  ScaledSize,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const [numColumns, setNumColumns] = useState(getNumColumns(Dimensions.get('window')));
  const insets = useSafeAreaInsets()
  const productSlice = useSelector((state: RootState) => state.product)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (size) => setNumColumns(getNumColumns(size.window)));
    return () => subscription.remove();
  }, []);

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <FlatList
        key={`numColumns_${numColumns}`}
        numColumns={numColumns}
        ListHeaderComponent={ProductFiltersHeader}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{
          gap: 24,
          padding: 24,
          paddingTop: 0,
          columnGap: 12,
        }}
        overScrollMode="never"
        bounces={false}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 10 }}
        data={productSlice.products}
        extraData={productSlice.products?.length}
        renderItem={({ item }) => <ProductCard item={item} />}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => item.id.toString()}
      />
    </ThemedView>
  );
}

const emptyComponent = () => {
  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ThemedText>No items available</ThemedText>
      <Image
        style={{ height: 200, width: 400 }}
        source={{
          uri: "https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-illustration-download-in-svg-png-gif-file-formats--is-explore-box-states-pack-design-development-illustrations-3385483.png?f=webp",
        }}
        resizeMode="contain"
      />
    </ThemedView>
  );
};

const getNumColumns = (result: ScaledSize) => {
  const division = result.width / 1000;

  if (division >= 1.2)
    return 4
  else if (division >= 0.8) return 3
  else return 2
}

