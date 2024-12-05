import Comment from "./comment";
import useQueryComments from "@/hooks/use-query-comments";
import InfiniteScroll from "@/components/shared/infinite-scroll";
import { useStore } from "@nanostores/react";
import {
  $currentCommentPage,
  $hasMoreComments,
  $enableFilter,
} from "@/lib/store";

const Comments = ({ postId }: { postId: string }) => {
  const currentPage = useStore($currentCommentPage);
  const hasMoreComments = useStore($hasMoreComments);
  const enableFilter = useStore($enableFilter);
  const { comments, loadComments, isLoading } = useQueryComments(postId);

  const loadMoreComments = () => {
    loadComments(currentPage + 1);
  };

  return (
    <div className="space-y-4">
      <InfiniteScroll
        loadMore={loadMoreComments}
        hasMore={hasMoreComments}
        isLoading={isLoading}
        key={enableFilter ? "filtered" : "all"}
      >
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Comments;
