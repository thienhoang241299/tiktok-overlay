import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://catdailoi.shop");
const roomId = "pu1608";

export default function OverlaySongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    socket.on("updateVotes", (songs) => {
      setSongs(songs);
    });

    return () => {
      socket.off("updateVotes");
    };
  }, []);

  return (
    <div>
      <div
        style={{
          width: 400,
          padding: 15,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 10,
          color: "white",
          fontFamily: "Arial, sans-serif",
          zIndex: 9999,
        }}
      >
        {songs.length === 0 ? (
          <p>🎵 Chưa có bài hát nào</p>
        ) : (
          <ul className="list rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              List bài hát đang chờ
            </li>

            {/* Hiển thị tối đa 7 bài */}
            {songs.slice(0, 7).map((song, idx) => (
              <li key={idx} className="list-row flex gap-3 items-center p-2">
                <img
                  className="h-14 w-12 rounded-box object-cover"
                  src="/img.jpeg" // nếu bạn đang dùng ảnh trong public, dùng đường dẫn như vậy
                  alt="thumbnail"
                />
                <div className="flex-1">
                  <div className="text-lg font-semibold">{song.name}</div>
                  <div className="pt-1 text-xs uppercase font-medium opacity-70">
                    {song.votes} votes
                  </div>
                </div>
              </li>
            ))}

            {/* Nếu còn bài vượt quá 7, hiện thông báo */}
            {songs.length > 7 && (
              <li className="p-2 text-sm italic text-gray-300">
                Và {songs.length - 7} bài hát khác đang chờ...
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
