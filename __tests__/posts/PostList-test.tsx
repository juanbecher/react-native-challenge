import PostList from "@/src/components/posts/PostList";
import { FavoritesProvider } from "@/src/context/FavoritesContext";
import { mockPosts } from "@/src/mocks/posts";
import { render } from "@testing-library/react-native";

describe("PostList", () => {
  test("should render empty message when no posts are found", () => {
    const { getByText } = render(
      <FavoritesProvider>
        <PostList
          posts={[]}
          isLoading={false}
          isError={false}
          emptyMessage="No posts found"
        />
      </FavoritesProvider>
    );

    expect(getByText("No posts found")).toBeTruthy();
  });

  test("should render loading state", () => {
    const { getByLabelText } = render(
      <FavoritesProvider>
        <PostList posts={undefined} isLoading={true} isError={false} />
      </FavoritesProvider>
    );

    expect(getByLabelText("loading-indicator")).toBeTruthy();
  });

  test("should render error state", () => {
    const { getByText } = render(
      <FavoritesProvider>
        <PostList posts={undefined} isLoading={false} isError={true} />
      </FavoritesProvider>
    );

    expect(getByText("Error loading posts")).toBeTruthy();
  });

  test("should render posts correctly", () => {
    const { getByText } = render(
      <FavoritesProvider>
        <PostList posts={mockPosts} isLoading={false} isError={false} />
      </FavoritesProvider>
    );

    expect(getByText("Post 1")).toBeTruthy();
    expect(getByText("Post 2")).toBeTruthy();
    expect(getByText("Content 1")).toBeTruthy();
    expect(getByText("Content 2")).toBeTruthy();
  });
});
