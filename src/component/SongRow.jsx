import React, { useState, useEffect } from "react";
import Select from "react-select";
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
  const options = gifts.map((gift) => ({
    value: gift.id,
    label: (
      <div className="flex items-center space-x-2">
        <img
          src={gift.image.replace("./public", "")}
          alt={gift.name}
          className="w-6 h-6 rounded"
        />
        <span>{gift.name}</span>
      </div>
    ),
  }));
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
          <div className="inline-block w-60 mr-3">
            <Select
              options={options}
              value={giftId}
              onChange={setGiftId}
              placeholder="Chọn Gift"
              isClearable
              styles={{
                control: (base) => ({
                  ...base,
                  borderRadius: 6,
                  borderColor: "#d1d5db", // Tailwind gray-300
                }),
              }}
            />
          </div>
        ) : giftObj ? (
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-x-2 gap-y-1">
            <img
              src={giftObj.image}
              alt={giftObj.name}
              className="w-6 h-6 object-contain"
            />
            <p>{giftObj.name}</p>
          </div>
        ) : (
          song.giftId
        )}
      </td>
      <td className="border border-black px-4 py-2">{song.votes}</td>
      <td className="border border-black px-1 py-2">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              className="border border-black px-4 py-2 rounded"
              onClick={save}
            >
              Lưu
            </button>
            <button
              className="border border-black px-4 py-2 rounded"
              onClick={cancel}
            >
              Hủy
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row justify-center gap-2">
            <button
              className="cursor-pointer border border-black px-4 py-2 rounded"
              onClick={() => setIsEditing(true)}
            >
              Sửa
            </button>
            <button
              className="cursor-pointer border border-black px-4 py-2 rounded"
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
