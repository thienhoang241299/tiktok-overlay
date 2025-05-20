import React, { useState } from "react";

export default function SongRow({ index, song, onDelete, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(song.name);
  const [giftId, setGiftId] = useState(song.giftId);

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

  return (
    <tr>
      <td class="border border-black px-4 py-2">{index + 1}</td>
      <td class="border border-black px-4 py-2">
        {isEditing ? (
          <input value={name} onChange={(e) => setName(e.target.value)} />
        ) : (
          song.name
        )}
      </td>
      <td class="border border-black px-4 py-2">
        {isEditing ? (
          <input
            type="number"
            value={giftId}
            onChange={(e) => setGiftId(e.target.value)}
          />
        ) : (
          song.giftId
        )}
      </td>
      <td class="border border-black px-4 py-2">{song.votes}</td>
      <td class="border border-black px-4 py-2">
        {isEditing ? (
          <>
            <button class="border border-black px-4 py-2" onClick={save}>
              Lưu
            </button>
            <button class="border border-black px-4 py-2" onClick={cancel}>
              Hủy
            </button>
          </>
        ) : (
          <>
            <button
              class="border border-black px-4 py-2"
              onClick={() => setIsEditing(true)}
            >
              Sửa
            </button>
            <button
              class="border border-black px-4 py-2"
              onClick={() => onDelete(index)}
            >
              Xóa
            </button>
          </>
        )}
      </td>
    </tr>
  );
}
