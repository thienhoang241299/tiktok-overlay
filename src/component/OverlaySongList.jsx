import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://catdailoi.shop");
const roomId = "pu1608";

export default function OverlaySongList() {
  const [songs, setSongs] = useState([]);
  const [giftList, setGiftList] = useState([]);

  useEffect(() => {
    // Kết nối socket
    socket.emit("joinRoom", { roomId });

    // Lắng nghe cập nhật vote
    socket.on("updateVotes", (songs) => {
      setSongs(songs);
    });

    // Fetch danh sách quà từ public
    fetch("/tiktok_gifts_full.json")
      .then((res) => res.json())
      .then((data) => setGiftList(data))
      .catch((err) => console.error("Lỗi load gift list:", err));

    return () => {
      socket.off("updateVotes");
    };
  }, []);

  return (
    <div className="bg-transparent">
      <div
        style={{
          width: 300,
          borderRadius: 10,
          color: "white",
          fontFamily: "Arial, sans-serif",
          zIndex: 9999,
        }}
      >
        {songs.length === 0 ? (
          <p>🎵 Chưa có bài hát nào</p>
        ) : (
          <ul className="list">
            <li className="p-2 mb-2 text-xs tracking-wide border-0 bg-black/20 rounded-[6px]">
              List bài hát đang chờ có {songs.length} bài hát
            </li>

            {songs.slice(0, 7).map((song, idx) => {
              const gift = giftList.find(
                (g) => g.id === song.giftId?.toString()
              );

              return (
                <li
                  key={idx}
                  className="list-row flex gap-1 items-center my-1 border-0 rounded-[6px] p-2 bg-black/20"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="/img.jpeg"
                    alt="thumbnail"
                    style={{
                      animation: "spin 4s linear infinite",
                      transformOrigin: "center",
                    }}
                  />
                  <div className="flex-1">
                    <div className="text-pink-600 text-sm font-semibold">
                      {song.name}
                    </div>
                    <div className="pt-1 text-xs uppercase font-medium">
                      {song.votes} votes
                    </div>
                  </div>
                  {gift ? (
                    gift.image ? (
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="h-6 mt-1"
                      />
                    ) : (
                      <div className="text-xs text-white mt-1 italic">
                        {gift.name}
                      </div>
                    )
                  ) : null}
                </li>
              );
            })}

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
