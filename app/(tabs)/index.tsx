import ProductCard from "@/components/ProductCard/ProductCard";
import ProductFiltersHeader from "@/components/ProductFiltersHeader";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Product } from "@/interfaces/product";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ProductResponse {
  products: Product[];
}

export default function HomeScreen() {
  const [products, setProducts] = useState<{ all: Product[], filtered: Product[] }>({ all: [], filtered: [] });
  const [numColumns, setNumColumns] = useState(getNumColumns());
  const insets = useSafeAreaInsets()

  useEffect(() => {
    fetch("https://dummyjson.com/products").then((response) =>
      response
        .json()
        .then((json: ProductResponse) => setProducts({ all: json.products, filtered: json.products })),
    );
  }, []);

  useEffect(() => {
    const updateColumns = () => setNumColumns(getNumColumns());
    const subscription = Dimensions.addEventListener("change", updateColumns);

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
        data={products.filtered}
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

const getNumColumns = () => {
  const division = Dimensions.get("screen").width / 1000;

  if (division >= 1.2)
    return 4
  else if (division >= 0.8) return 3
  else return 2
}

//const HeaderComponent = ({ handleCategory, handleCategory2 }: { handleCategory: () => void, handleCategory2: () => void }) => (
//  <ThemedView style={{ height: 48, backgroundColor: '#121233', marginHorizontal: -24, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
//    <TouchableOpacity onPress={handleCategory}>
//      <ThemedText>Category</ThemedText>
//    </TouchableOpacity>
//    <TouchableOpacity onPress={handleCategory2}>
//      <ThemedText>Category</ThemedText>
//    </TouchableOpacity>
//    <TouchableOpacity>
//      <ThemedText>Category</ThemedText>
//    </TouchableOpacity>
//  </ThemedView>
//);
