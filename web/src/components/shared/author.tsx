import { UserType } from "@/data/types";
import { cn } from "@/lib/utils";

type AuthorProps = {
  author: UserType;
  className?: string;
};

const Author = ({ author, className }: AuthorProps) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <p className="text-sm font-medium leading-none">{author.name}</p>
      <p className="text-sm text-muted-foreground">@{author.username}</p>
    </div>
  );
};

export default Author;
