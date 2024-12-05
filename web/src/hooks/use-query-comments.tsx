import { useEffect, useState } from "react";
import { fetchComments } from "@/data/api";
import { useStore } from "@nanostores/react";
import {
  $comments,
  appendComments,
  incrementCommentPage,
  setHasMoreComments,
  setComments,
  $enableFilter,
} from "@/lib/store";
import { toast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/use-auth";

function useQueryComments(postId: string) {
  const comments = useStore($comments);
  const enableFilter = useStore($enableFilter);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const loadComments = async (page: number = 1, limit: number = 10) => {
    setIsLoading(true);
    try {
      const { data: fetchedComments, total } = await fetchComments(
        postId,
        page,
        limit,
        enableFilter ? user?.username : undefined,
      );
      setHasMoreComments(comments.length + fetchedComments.length < total);
      if (page === 1) {
        setComments(fetchedComments);
      } else {
        appendComments(fetchedComments);
        incrementCommentPage();
      }
    } catch (error) {
      const errorMessage =
        (error as Error).message ?? "Please try again later!";
      toast({
        variant: "destructive",
        title: "Sorry! There was an error reading the comments 🙁",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, enableFilter]);

  return { comments, loadComments, isLoading };
}

export default useQueryComments;
