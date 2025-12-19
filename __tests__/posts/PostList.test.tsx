import PostList from "@/src/components/posts/PostList";
import { mockPosts } from "@/src/mocks/posts";
import { AppProviders } from "@/src/providers/AppProviders";
import { render, waitFor } from "@testing-library/react-native";

describe("PostList", () => {
  test("should render empty message when no posts are found", async () => {
    const { getByText } = render(
      <AppProviders>
        <PostList
          posts={[]}
          isLoading={false}
          isError={false}
          emptyMessage="No posts found"
        />
      </AppProviders>
    );
    await waitFor(() => {
      expect(getByText("No posts found")).toBeTruthy();
    });
  });

  test("should render loading state", async () => {
    const { getByLabelText } = render(
      <AppProviders>
        <PostList posts={undefined} isLoading={true} isError={false} />
      </AppProviders>
    );
    await waitFor(() => {
      expect(getByLabelText("loading-indicator")).toBeTruthy();
    });
  });

  test("should render error state", async () => {
    const { getByText } = render(
      <AppProviders>
        <PostList posts={undefined} isLoading={false} isError={true} />
      </AppProviders>
    );
    await waitFor(() => {
      expect(getByText("Error loading posts")).toBeTruthy();
    });
  });

  test("should render posts correctly", async () => {
    const { getByText } = render(
      <AppProviders>
        <PostList posts={mockPosts} isLoading={false} isError={false} />
      </AppProviders>
    );
    await waitFor(() => {
      expect(getByText("Post 1")).toBeTruthy();
      expect(getByText("Post 2")).toBeTruthy();
      expect(getByText("Content 1")).toBeTruthy();
      expect(getByText("Content 2")).toBeTruthy();
    });
  });
});
