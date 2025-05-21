import React, { useState, useEffect } from "react";

export default function SongRow({ index, song, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(song.name);
  const [giftId, setGiftId] = useState(song.giftId);
  const [gifts, setGifts] = useState([]);

  // Load data gift từ file public json
  useEffect(() => {
    fetch("/tiktok_gifts_full.json")
      .then((res) => res.json())
      .then(setGifts)
      .catch((err) => {
        console.error("Failed to load gifts json", err);
        setGifts([]);
      });
  }, []);

  const save = () => {
    if (!name || !giftId)
      return alert("Tên bài hát và Gift ID không được để trống");
    onSave(index, { name, giftId: Number(giftId) });
    setIsEditing(false);
  };

  const cancel = () => {
    setIsEditing(false);
    setName(song.name);
    setGiftId(song.giftId);
  };

  // Tìm gift object theo giftId
  const giftObj = gifts.find((g) => String(g.id) === String(giftId));

  return (
    <tr>
      <td className="border border-black px-4 py-2">{index + 1}</td>
      <td className="border border-black px-4 py-2">
        {isEditing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          song.name
        )}
      </td>
      <td className="border border-black px-2 py-2">
        {isEditing ? (
          <input
            type="number"
            value={giftId}
            onChange={(e) => setGiftId(e.target.value)}
          />
        ) : giftObj ? (
          <div className="flex justify-center gap-x-2">
            <img
              src={giftObj.image}
              alt={giftObj.name}
              className="w-6 h-6 object-contain"
            />
            <span>{giftObj.name}</span>
          </div>
        ) : (
          song.giftId
        )}
      </td>
      <td className="border border-black px-4 py-2">{song.votes}</td>
      <td className="border border-black px-1 py-2">
        {isEditing ? (
          <>
            <button className="border border-black px-4 py-2" onClick={save}>
              Lưu
            </button>
            <button className="border border-black px-4 py-2" onClick={cancel}>
              Hủy
            </button>
          </>
        ) : (
          <div className="flex justify-center gap-x-2">
            <button
              className="border border-black px-4 py-2"
              onClick={() => setIsEditing(true)}
            >
              Sửa
            </button>
            <button
              className="border border-black px-4 py-2"
              onClick={() => onDelete(index)}
            >
              Xóa
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
