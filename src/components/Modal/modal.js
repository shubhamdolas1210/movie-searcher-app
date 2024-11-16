import React from "react";
import { Modal, Box } from "@mui/material";
import "./modal.css";

const modal = ({ movie, isOpen, onClose }) => {
  if (!movie) return null;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modal-box">
        <div>
          <h2>{movie.Title}</h2>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"}
            alt={movie.Title}
          />
          <span>
            <strong>Year:</strong> {movie.Year}
          </span>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
        </div>

        <button onClick={onClose} className="close-button">
          Close
        </button>
      </Box>
    </Modal>
  );
};

export default modal;
