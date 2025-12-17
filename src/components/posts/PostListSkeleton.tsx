import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default function PostListLoading() {
  return (
    <View style={{ padding: 16 }}>
      <SkeletonPlaceholder>
        {[1, 2, 3].map((n) => (
          <View
            key={n}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View style={{ width: 80, height: 80, borderRadius: 8 }} />
            <View style={{ marginLeft: 12 }}>
              <View style={{ width: 200, height: 20, borderRadius: 4 }} />
              <View
                style={{
                  width: 150,
                  height: 16,
                  borderRadius: 4,
                  marginTop: 8,
                }}
              />
            </View>
          </View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
}
