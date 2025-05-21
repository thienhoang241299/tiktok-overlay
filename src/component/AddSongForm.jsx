import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function AddSongForm({ onAdd }) {
  const [name, setName] = useState("");
  const [giftId, setGiftId] = useState(null);
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    fetch("/tiktok_gifts_full.json")
      .then((res) => res.json())
      .then((data) => setGifts(data))
      .catch((err) => console.error("Failed to load gifts:", err));
  }, []);

  // Map dữ liệu thành format react-select cần
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

  const handleAdd = () => {
    if (!name || !giftId)
      return alert("Tên bài hát và Gift ID không được để trống");
    onAdd({ name, giftId: Number(giftId.value) });
    setName("");
    setGiftId(null);
  };

  return (
    <div className="mb-5">
      <input
        className="border border-gray-300 pl-2 h-[38px] mr-3 rounded"
        placeholder="Tên bài hát mới"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white mt-2 px-4 py-2 rounded hover:bg-blue-700"
      >
        Thêm bài hát
      </button>
    </div>
  );
}
