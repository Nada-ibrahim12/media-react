import { useEffect, useState } from "react";
import MediaCard from "./components/MediaCard";
import axios from "axios";

export default function Home() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState<unknown>(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/media`;

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

  const handkeDeleteSuccess = (deletedId: string) => {
    setMedia((prevMedia) => prevMedia.filter((item: any) => item.id !== deletedId));
  };

  if (error) {
    return <div>Error fetching media data: {error instanceof Error ? error.message : "Unknown error"}</div>;
  }
  return (
    <div className="container" style={{ paddingTop: "70px" }}>
      {media.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No media available</h3>
          <p>Please upload some media to see it here.</p>
        </div>
      ) : (
        media.map((item: any, idx: number) => (
          <MediaCard key={item.id || idx} {...item} onDeleteSuccess={handkeDeleteSuccess} />
        ))
      )}
    </div>
  );
}
