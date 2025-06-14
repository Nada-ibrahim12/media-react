import { useEffect, useState } from "react";
import MediaCard from "./components/MediaCard";
import axios from "axios";

interface MediaItem {
  id: string;
  title?: string;
  fileUrl?: string;
  type?: string;
  likes?: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function Home() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState<unknown>(null);
  const apiUrl = "http://localhost:3000/media";

  async function fetchMedia() {
    try {
      const response = await axios.get(apiUrl);
      console.log("Media data fetched successfully:", response.data);
      setMedia(response.data);
    } catch (error) {
      console.error("Error fetching media data:", error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchMedia();
  }, []);

  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>Error fetching media data:</h4>
        <p>{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "70px" }}>
      {media.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No media available</h3>
          <p>Please upload some media to see it here.</p>
        </div>
      ) : (
        media.map((item) => <MediaCard key={item.id} {...item} />)
      )}
    </div>
  );
}
