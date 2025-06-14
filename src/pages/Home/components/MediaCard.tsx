import React, { useState } from "react";

interface MediaCardProps {
  id?: string;
  title?: string;
  fileUrl?: string;
  type?: string;
  likes?: number;
  user: {
    firstName: string;
    lastName: string;
  };
}

export default function MediaCard({
  id,
  title,
  fileUrl,
  type,
  likes: initialLikes,
  user,
}: MediaCardProps) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [like, setLike] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:3000/media/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update likes");
      }

      setLike(!like);
      setLikes((prevLikes) => (like ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error("Error liking media:", error);
      alert("Failed to like media. Please try again later.");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg rounded-4 overflow-hidden border-0 w-50">
        <div
          className="header p-3 text-white"
          style={{
            background: "linear-gradient(to right, #4e54c8, #8f94fb)",
          }}
        >
          <h5 className="card-title mb-2 fw-bold">
            {user.firstName} {user.lastName}
          </h5>
          <p className="card-text mb-0">{title}</p>
        </div>
        <div className="card-body p-0">
          <div
            className="img-container bg-light"
            style={{
              height: "200px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {type === "img" ? (
              <img
                src={fileUrl}
                alt={title}
                className="img-fluid"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <video
                src={fileUrl}
                controls
                className="w-100 h-100"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "cover",
                }}
              ></video>
            )}
          </div>
          <div className="content p-3">
            <p className="mb-3 fw-medium">Likes: {likes}</p>
            <div className="d-flex gap-2">
              <button
                className="btn rounded-3 text-white fw-bold flex-grow-1"
                style={{
                  background: "linear-gradient(to right, #4e54c8, #8f94fb)",
                }}
                onClick={handleLike}
              >
                {like ? "Unlike" : "Like"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
