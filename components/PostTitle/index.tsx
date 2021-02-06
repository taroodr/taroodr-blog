import { DateFormatter } from "../DateFormatter";

type Props = {
  title: string;
  dateString: string;
};

export const PostTitle: React.FC<Props> = ({ title, dateString }) => {
  return (
    <>
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-500">
        <DateFormatter dateString={dateString} />
      </p>
    </>
  );
};
