import React from "react";
import SongRow from "./SongRow";

export default function SongList({ songs, onDelete, onSave }) {
  if (songs.length === 0) {
    return <p style={{ textAlign: "center" }}>Chưa có bài hát nào</p>;
  }

  return (
    <div>
      <table className="w-full table-auto border-collapse border border-black mt-4">
        <thead>
          <tr>
            <th className="border border-black px-4 py-2">#</th>
            <th className="border border-black px-4 py-2">Tên bài hát</th>
            <th className="border border-black px-4 py-2">Gift ID</th>
            <th className="border border-black px-4 py-2">Vote</th>
            <th className="border border-black px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, i) => (
            <SongRow
              key={i}
              index={i}
              song={song}
              onDelete={onDelete}
              onSave={onSave}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
