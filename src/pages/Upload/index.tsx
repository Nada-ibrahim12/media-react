import axios from "axios";
import {useState, useRef, type ChangeEvent, type FormEvent} from "react";
import { FaCloudUploadAlt } from "react-icons/fa";


export default function Upload() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setSuccess] = useState<string | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid file.");
    }
  }

  function handleTitleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setTitle(e.target.value);
    if (error) setError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    const mediaType = file.type.startsWith("image") ? "image" : "video";
    formData.append("type", mediaType);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/media/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setSuccess("File uploaded successfully!");
      setTimeout(() => setSuccess(null), 3000);
      setTitle("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="container-fluid d-flex flex-column"
      style={{
        minHeight: "100vh",
        paddingTop: "70px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
      }}
    >
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
        <div
          className="card shadow-lg rounded-4 border-0 d-flex flex-column"
          style={{
            width: "100%",
            maxWidth: "600px",
            minHeight: "70vh",
          }}
        >
          <div
            className="card-header p-4 text-white rounded-top-4"
            style={{
              background: "linear-gradient(to right, #4e54c8, #8f94fb)",
            }}
          >
            <h3 className="mb-0 fw-bold">Create New Post</h3>
          </div>

          <form
            onSubmit={handleSubmit}
            className="card-body p-4 d-flex flex-column flex-grow-1"
            style={{ overflowY: "auto" }}
          >
            <label
              htmlFor="fileUpload"
              className="border-2 border-dashed rounded-3 p-5 text-center mb-4 flex-grow-1 d-flex flex-column justify-content-center"
              style={{
                borderColor: "#dee2e6",
                backgroundColor: "#f8f9fa",
                cursor: "pointer",
                minHeight: "300px",
              }}
            >
              <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                <FaCloudUploadAlt size={48} className="text-primary mb-3" />
                <h5 className="fw-bold mb-2">Upload Photo or Video</h5>
                <p className="text-muted">Drag and drop or click to browse</p>
              </div>
              <input
                id="fileUpload"
                type="file"
                accept="image/*,video/*"
                onChange={handleFile}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </label>
            {file && <p>Selected file: {file.name}</p>}
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : file ? (
              <div className="alert alert-success" role="alert">
                File selected: {file.name}
              </div>
            ) : null}

            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-medium">
                Title
              </label>
              <textarea
                id="title"
                className="form-control rounded-3"
                rows={3}
                placeholder="What's on your mind?"
                style={{ backgroundColor: "#f8f9fa", borderColor: "#dee2e6" }}
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 rounded-3 fw-bold py-3 mt-auto"
              style={{
                background: "linear-gradient(to right, #4e54c8, #8f94fb)",
                color: "white",
                border: "none",
              }}
            >
              {loading ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "18px",
                    height: "18px",
                    border: "2px solid white",
                    borderTop: "2px solid transparent",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                    margin: "0 auto",
                  }}
                />
              ) : (
                "Post"
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
