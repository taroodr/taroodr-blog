import { useEffect } from "react";
import Prism from "prismjs";

type Props = {
  content: string;
};

export const PostBody: React.FC<Props> = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="mx-auto mt-12">
      <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
