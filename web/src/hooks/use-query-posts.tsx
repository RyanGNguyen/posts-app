import { useEffect, useState } from "react";
import { fetchPosts } from "@/data/api";
import { useStore } from "@nanostores/react";
import {
  $posts,
  appendPosts,
  incrementPostPage,
  setHasMorePosts,
  setPosts,
  $enableFilter,
} from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/use-auth";

function useQueryPosts() {
  const posts = useStore($posts);
  const enableFilter = useStore($enableFilter);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const loadPosts = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    try {
      const { data: fetchedPosts, total } = await fetchPosts(
        page,
        limit,
        enableFilter ? user?.username : undefined,
      );
      setHasMorePosts(posts.length + fetchedPosts.length < total);
      if (page === 1) {
        setPosts(fetchedPosts);
      } else {
        appendPosts(fetchedPosts);
        incrementPostPage();
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error reading the posts 🙁",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableFilter]);

  return { posts, loadPosts, isLoading };
}

export default useQueryPosts;
