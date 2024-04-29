import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { PiShareFatThin } from "react-icons/pi";
import { LiaDownloadSolid } from "react-icons/lia";
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/Api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

const VideoDetails = () => {
  const [video, setVideo] = useState();

  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  const { setLoading } = useContext(Context);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      console.log(res);
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black overflow-y-auto">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col  lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 ">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000", borderRadius: "12px" }}
              playing={true}
            />
          </div>
          <div className="text-white font-bold text-sm md:text-xl mt-4  line-clamp-2">
            {video?.title}
          </div>
          <div className="flex justify-between flex-col md:flex-col lg:flex-col xl:flex-row md:gap-4 mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.author?.avatar[0]?.url}
                    alt="video"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
              <div className="flex ml-6 ">
                <div className="bg-white/[0.15] flex items-center justify-center text-white text-lg md:text-xl rounded-3xl px-3 md:px-6 h-8 md:h-10 hover:bg-white/[0.25] cursor-pointer">
                  Join
                </div>
                <div className="bg-white text-black flex items-center justify-center text-sm md:text-lg px-3 md:px-6 h-8 md:h-10 rounded-3xl ml-3 hover:bg-white/[0.8] cursor-pointer">
                  Subscribe
                </div>
              </div>
            </div>
            <div className="flex flex-row   text-white mt-4 md:mt-0">
              <div className="flex  items-center md:justify-center h-8 md:h-10  px-3 md:px-4 mb-1 rounded-3xl bg-white/[0.15] hover:bg-white/[0.25] ">
                <div className="flex flex-row  cursor-pointer">
                  <AiOutlineLike className="text-lg md:text-xl text-white mr-2 " />
                  <span className="text-sm md:text-lg">{`${abbreviateNumber(
                    video?.stats?.likes,
                    2
                  )}`}</span>
                </div>
                <div className="border-l ml-2 border-gray-500 cursor-pointer">
                  <AiOutlineDislike className="text-lg md:text-xl text-white ml-2" />
                </div>
              </div>
              <div className="flex items-center justify-center h-8 md:h-10 px-3 md:px-4 rounded-3xl bg-white/[0.15] ml-3 cursor-pointer hover:bg-white/[0.25]">
                <PiShareFatThin className="text-lg md:text-xl text-white  mr-2" />
                Share
              </div>
              <div className="flex  items-center justify-center h-8 md:h-10 px-3 md:px-4 rounded-3xl bg-white/[0.15] ml-3 cursor-pointer hover:bg-white/[0.25]">
                <LiaDownloadSolid className="text-lg md:text-xl text-white  mr-2" />
                Download
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="flex items-center justify-start rounded-xl text-white mt-4  h-11 px-6  bg-white/[0.15] ml-4">
              <span>{`${abbreviateNumber(video?.stats?.views, 2)} Views`}</span>
            </div>
          </div>
          <div className="text-lg text-wrap text-white rounded-xl bg-white/[0.15] mt-4 p-3 cont">
            <h6>Description -</h6>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum
            passages,and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum. There are many
            variations of passages of Lorem Ipsum available, have suffered
            alteration in some form, by injected humour, or randomised words
            which don't look even slightly believable. If you are going to use a
            passage of Lorem Ipsum, you need to be sure there isn't anything
            embarrassing hidden in the middle of text. All the Lorem Ipsum
            generators on the Internet tend to repeat predefined chunks as
            necessary, making this the first true generator on the Internet. It
            uses a dictionary of over 200 Latin words, combined with a handful
            of model sentence structures, to generate Lorem Ipsum which looks
            reasonable. The generated Lorem Ipsum is therefore always free from
            repetition, injected humour, or non-characteristic words etc.
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
