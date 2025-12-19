import PostCard from "@/src/components/posts/PostCard";
import { mockPost } from "@/src/mocks/posts";
import { fireEvent, render } from "@testing-library/react-native";

describe("PostCard", () => {
  const mockOnToggleFavorite = jest.fn();

  test("should render post title and content", () => {
    const { getByText } = render(
      <PostCard
        post={mockPost}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(getByText(mockPost.title)).toBeTruthy();
    expect(getByText(mockPost.content)).toBeTruthy();
  });

  test("should call onToggleFavorite when favorite button is pressed", () => {
    const { getByTestId } = render(
      <PostCard
        post={mockPost}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = getByTestId("favorite-button");
    fireEvent.press(favoriteButton);

    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockPost);
  });

  test("should render filled heart icon when isFavorite is true", () => {
    const { getByTestId } = render(
      <PostCard
        post={mockPost}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = getByTestId("favorite-button");

    const icon = favoriteButton.findByProps({ name: "heart" });
    expect(icon).toBeTruthy();
  });

  test("should render outline heart icon when isFavorite is false", () => {
    const { getByTestId } = render(
      <PostCard
        post={mockPost}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const favoriteButton = getByTestId("favorite-button");
    const icon = favoriteButton.findByProps({ name: "heart-outline" });
    expect(icon).toBeTruthy();
  });
});
