import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import Image from "next/image";
//import TimeAgo from "timeago-react";
import Moment from "react-moment";

function Widgets({ articles }) {
  return (
    <div className="hidden space-y-2 xl:inline">
      {/* News */}
      <div className="bg-white dark:bg-[#1D2226] py-2.5 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none">
        <div className="flex items-center justify-between font-bold px-2.5">
          <h4>LinkedIn News</h4>
          <InfoRoundedIcon className="w-5 h-5" />
        </div>

        <div className="space-y-1">
          {articles.slice(0, 5).map((article) => (
            <div
              key={article.url}
              className="flex space-x-2 items-center cursor-pointer hover:bg-black/10 dark:hover:bg-black/20 px-2.5 py-1"
            >
              <FiberManualRecordRoundedIcon className="!h-2 !w-2" />
              <div>
                <h5 className="max-w-xs pr-10 text-sm font-medium truncate">
                  {article.title}
                </h5>
                <Moment
                  fromNow
                  className="text-xs mt-0.5 dark:text-white/75 opacity-80"
                >
                  {article.publishedAt}
                </Moment>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Ads */}
      <div className="bg-white dark:bg-[#1D2226] w-11/12 h-64 px-2.5 rounded-lg sticky top-20 border border-gray-300 dark:border-none">
        <div className="relative w-full h-full">
          <Image
            src="https://rb.gy/kbfeaa"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
