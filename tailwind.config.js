import daisyui from "daisyui";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // tuỳ theo cấu trúc dự án
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 4s linear infinite", // xoay chậm
      },
    },
  },
  plugins: [daisyui],
};
