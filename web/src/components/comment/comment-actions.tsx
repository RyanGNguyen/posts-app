import { Button } from "@/components/ui/button";
import { CommentType } from "@/data/types";
import { Pencil2Icon } from "@radix-ui/react-icons";
import DeleteCommentDialog from "./delete-comment-dialog";
import useAuth from "@/hooks/use-auth";

const CommentActions = ({
  comment,
  setIsEditing,
}: {
  comment: CommentType;
  setIsEditing: (flag: boolean) => void;
}) => {
  const { user } = useAuth();
  const showAction = user && String(user.id) === String(comment.author.id);

  return (
    <div className="flex justify-end">
      {showAction && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsEditing(true)}
        >
          <Pencil2Icon className="w-4 h-4" />
        </Button>
      )}
      {showAction && (
        <DeleteCommentDialog commentId={comment.id} postId={comment.postId} />
      )}
    </div>
  );
};

export default CommentActions;
