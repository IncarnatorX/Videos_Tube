import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './VideoList.scss'; // Add your SCSS styles

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get(`/api/videos?page=${page}&limit=10`);
      const { videos: newVideos, totalPages } = response.data;

      setVideos((prev) => [...prev, ...newVideos]); // Append new videos to the list
      setHasMore(page < totalPages); // Check if more pages are available
    } catch (error) {
      console.error('Error fetching videos:', error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page]);

  return (
    <div className="video-list">
      <InfiniteScroll
        dataLength={videos.length} // Number of videos loaded so far
        next={() => setPage((prev) => prev + 1)} // Load next page
        hasMore={hasMore} // Check if more data exists
        loader={<div className="loader">Loading...</div>} // Loading indicator
        endMessage={<p className="end-message">No more videos</p>} // End message
      >
        {videos.map((video) => (
          <div key={video._id} className="video-item">
            <img src={video.thumbnail} alt={video.title} loading="lazy" />
            <div className="video-info">
              <h4>{video.title}</h4>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default VideoList;
