import { formatFirstSentence, formatTimeAgo } from "@/utils/formatters";
import { formatToDate } from "@/utils/formatters"; // Import the formatToDate function
import { Clock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type ActivityItem = {
  activity_id: number;
  posts: string;
  link: string | null;
  formatted_created_time: string;
};

const ActivityCard: React.FC<{
  activities: { [key: string]: ActivityItem[] };
}> = ({ activities }) => {
  const firstDateActivities = Array.isArray(activities)
    ? activities.slice(0, 3)
    : activities && Object.values(activities)[0]
    ? Object.values(activities)[0].slice(0, 3)
    : [];

  return (
    <>
      <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {firstDateActivities.map((item) => {
          const formattedDate = formatToDate(item.formatted_created_time);
          return (
            <div
              key={item.activity_id}
              className="flex flex-col justify-between items-start bg-slate-200 p-4 rounded-lg "
            >
              <div className="flex-grow pr-2">
                <div
                  className="text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: formatFirstSentence(item.posts),
                  }}
                />
                {item.link && (
                  <Link
                    to={item.link}
                    className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                  >
                    View Details
                  </Link>
                )}
              </div>
              <span className="text-xs flex gap-1 items-center text-gray-500 whitespace-nowrap">
                <Clock size={14} /> {formatTimeAgo(formattedDate)}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ActivityCard;
