import { ArrowRight } from "@/components/icons/arrow-right";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllHolidays } from "@/lib/helpers/api.helpers";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { RefreshControl, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);
  const [limit] = React.useState(20);

  const date = new Date();
  const fecha_fiesta = date.toISOString().split("T")[0];

  const { data, fetchNextPage, hasNextPage, refetch, isPending } =
    useInfiniteQuery({
      queryKey: ["data"],
      queryFn: ({ pageParam }) =>
        getAllHolidays({ fecha_fiesta, limit, pageParam }),
      initialPageParam: 0,
      getPreviousPageParam: (firstPage) => firstPage.total_count,
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        if (lastPageParam + limit >= lastPage.total_count) {
          return;
        }
        return lastPageParam + limit;
      },
    });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  if (isPending) {
    return (
      <View className="flex-1">
        <View className="px-4 gap-4 mt-4">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlashList
        data={data?.pages.map((page) => page.results).flat() ?? []}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: safeAreaInsets.bottom + 40,
        }}
        renderItem={({ item }) => (
          <View className="mt-4 flex-row flex-nowrap py-8 gap-8 px-4 justify-between bg-muted rounded-xl">
            <Text className="text-sm basis-20 self-center">
              {item.fecha_fiesta}
            </Text>
            <Text className="flex-shrink flex-1">{item.municipio}</Text>
            <View className="basis-6 self-center">
              <ArrowRight className="text-black" height={20} width={20} />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text>Empty List</Text>}
        estimatedItemSize={60}
        onEndReachedThreshold={0.3}
        onEndReached={() => {
          fetchNextPage();
        }}
      />
    </View>
  );
}

export { HomeScreen };
