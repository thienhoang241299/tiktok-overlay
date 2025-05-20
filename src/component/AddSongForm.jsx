import React, { useState } from "react";

export default function AddSongForm({ onAdd }) {
  const [name, setName] = useState("");
  const [giftId, setGiftId] = useState("");

  const handleAdd = () => {
    if (!name || !giftId)
      return alert("Tên bài hát và Gift ID không được để trống");
    onAdd({ name, giftId: Number(giftId) });
    setName("");
    setGiftId("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Tên bài hát mới"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        placeholder="Gift ID"
        type="number"
        value={giftId}
        onChange={(e) => setGiftId(e.target.value)}
        style={{ width: 100, marginRight: 10 }}
      />
      <button onClick={handleAdd}>Thêm bài hát</button>
    </div>
  );
}
