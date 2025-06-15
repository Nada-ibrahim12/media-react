import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

interface MediaCardProps {
  id?: string;
  title?: string;
  fileUrl?: string;
  type?: string;
  likesCount?: number;
  user: {
    id: string;
    firstName: string;
    lastName: string;
  };
  onDeleteSuccess: (deletedId: string) => void;
}


export default function MediaCard({
  id,
  title,
  fileUrl,
  type,
  likesCount: initialLikes,
  user,
  onDeleteSuccess = (deletedId: string) => { console.log(`Media with ID ${deletedId} deleted successfully.`)
},
}: MediaCardProps,) {
  
  const [likes, setLikes] = useState(initialLikes || 0);
  const [like, setLike] = useState<boolean>(false);
  const [userLikes, setUserLikes] = useState([]);
  const token = localStorage.getItem("token");
  const [, setError] = useState<string | null>(null);
  const userId = JSON.parse(localStorage.getItem("user") || '""');

  useEffect(() => {
    const fetchUserLikes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/media/${id}/likes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch likes");

        const data = await response.json();
        setUserLikes(data);
        console.log("user likes", userLikes);
        setLike(data.some((like: any) => like.userId === user.id));
      } catch (error) {
        console.error("Error fetching user likes:", error);
      }
    };

    console.log(userId);
    console.log(user.id)

    fetchUserLikes();
  }, [id, token, user.id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/media/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to like media");

      setLikes((prevLikes) => prevLikes + 1);
      setLike(true);
    } catch (error) {
      console.error("Error liking media:", error);
      alert("Failed to like media. Please try again later.");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/media/${id}/unlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to unlike media");

      setLikes((prevLikes) => prevLikes - 1);
      setLike(false);
    } catch (error) {
      console.error("Error unliking media:", error);
      alert("Failed to unlike media. Please try again later.");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: " Do you want to delete this media?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4e54c8",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/media/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete media");

      Swal.fire({
        title: "Deleted!",
        text: "Your media has been deleted.",
        icon: "success",
      });
      onDeleteSuccess(id || "");
      
    } catch (error) {
      console.error("Error deleting media:", error);
      setError("Failed to delete media. Please try again later.");
      Swal.fire({
        title: "Error!",
        text: "Failed to delete media. Please try again later.",
        icon: "error",
      });
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
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title fw-bold mb-0">
              {user.firstName} {user.lastName}
            </h5>

            {user.id === userId && (
              <div className="dropdown">
                <motion.button
                  className="btn btn-link text-light"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  whileTap={{ scale: 0.9 }}
                >
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </motion.button>

                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <button className="dropdown-item" onClick={handleDelete}>
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <p className="card-text mb-0">{title}</p>
        </div>
        <div className="card-body p-0">
          <div
            className="img-container bg-light overflow-hidden d-flex align-items-center justify-content-center"
            style={{
              height: "200px",
            }}
          >
            {type === "image" ? (
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
                onClick={like ? handleUnlike : handleLike}
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




