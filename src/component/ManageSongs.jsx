import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ErrorMessage from "./ErrorMessage";
import AddSongForm from "./AddSongForm";
import SongList from "./SongList";

const socket = io("https://catdailoi.shop"); // sửa nếu backend khác URL
const roomId = "pu1608";

export default function ManageSongs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("updateVotes", (songs) => {
      setSongs(songs);
      setLoading(false);
      setError("");
    });

    socket.on("connect_error", () => {
      setError("Không kết nối được đến server");
      setLoading(false);
    });

    return () => {
      socket.off("updateVotes");
      socket.off("connect_error");
    };
  }, []);

  const saveSongsToServer = async (newSongs) => {
    try {
      const res = await fetch("https://catdailoi.shop/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, songs: newSongs }),
      });
      if (!res.ok) setError("Lỗi khi lưu danh sách bài hát");
      else setError("");
    } catch {
      setError("Lỗi khi gọi API");
    }
  };

  const handleAddSong = (song) => {
    const updatedSongs = [...songs, { ...song, votes: 0 }];
    setSongs(updatedSongs);
    saveSongsToServer(updatedSongs);
  };

  const handleDeleteSong = async (index) => {
    try {
      const res = await fetch(
        `https://catdailoi.shop/api/songs/${roomId}/${index}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        // server sẽ emit updateVotes nên frontend sẽ tự cập nhật
      } else {
        setError("Xóa bài hát thất bại");
      }
    } catch {
      setError("Lỗi khi gọi API");
    }
  };

  const handleSaveSong = async (index, { name, giftId }) => {
    try {
      const res = await fetch(
        `https://catdailoi.shop/api/songs/${roomId}/${index}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, giftId }),
        }
      );
      if (!res.ok) {
        setError("Cập nhật bài hát thất bại");
      } else {
        setError("");
      }
    } catch {
      setError("Lỗi khi gọi API");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div
      style={{
        padding: 10,
        fontFamily: "Arial, sans-serif",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <h2>Quản lý bài hát và gift</h2>
      <ErrorMessage message={error} />
      <AddSongForm onAdd={handleAddSong} />
      <SongList
        songs={songs}
        onDelete={handleDeleteSong}
        onSave={handleSaveSong}
      />
    </div>
  );
}
