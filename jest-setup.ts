jest.mock("expo-router", () => {
  return {
    Link: ({ children }: { children: any }) => children,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
  };
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { View } = require("react-native");
  return {
    Ionicons: (props: any) => React.createElement(View, props),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => {
  const storage: Record<string, string> = {};
  return {
    __esModule: true,
    default: {
      getItem: jest.fn((key: string) => {
        return Promise.resolve(storage[key] || null);
      }),
      setItem: jest.fn((key: string, value: string) => {
        storage[key] = value;
        return Promise.resolve();
      }),
    },
  };
});

jest.mock("expo-secure-store", () => {
  const secureStorage: Record<string, string> = {};
  return {
    __esModule: true,
    getItemAsync: jest.fn((key: string) => {
      return Promise.resolve(secureStorage[key] || null);
    }),
    setItemAsync: jest.fn((key: string, value: string) => {
      secureStorage[key] = value;
      return Promise.resolve();
    }),
    deleteItemAsync: jest.fn((key: string) => {
      delete secureStorage[key];
      return Promise.resolve();
    }),
  };
});

jest.mock("@/src/services/storage", () => ({
  storage: {
    getFavorites: jest.fn(),
    setFavorites: jest.fn(),
  },
}));
