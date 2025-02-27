import ProductCard from "@/components/ProductCard/ProductCard";
import ProductFiltersHeader from "@/components/ProductFiltersHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { AppDispatch, RootState } from "@/store";
import React, { useCallback, useEffect } from "react";
import { Product } from "@/interfaces/product";
import {
  FlatList,
  Image,
  Dimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/product/productSlice";
import { generateEmptyElements, getNumColumns } from "@/utils/function";
import { setColumnNumber } from "@/store/sizes/SizesSlice";

export default function HomeScreen() {
  const insets = useSafeAreaInsets()
  const { products, hasNext, currentPage, loading } = useSelector((state: RootState) => state.product)
  const { numColumns } = useSelector((state: RootState) => state.sizes)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts(0))
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (size) => dispatch(setColumnNumber(getNumColumns(size.window))));

    return () => subscription.remove();
  }, []);

  const loadMoreProducts = useCallback(() => {
    if (hasNext && !loading) {
      dispatch(fetchProducts(currentPage + 1));
    }
  }, [hasNext, dispatch, currentPage, loading]);

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
        data={products != undefined ? generateEmptyElements(products, numColumns) : products}
        renderItem={({ item }) => {
          if (!item.hidden)
            return <ProductCard item={item as Product} />
          else return <View style={{ flex: 1, padding: 16 }} />;
        }}
        ListEmptyComponent={emptyComponent}
        keyExtractor={(item) => (item?.id ?? 1).toString()}
        onEndReachedThreshold={1}
        onEndReached={loadMoreProducts}
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
