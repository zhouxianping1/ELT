// app/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const realPass = "buzhidao"; // 👉 你想要的密码就在这里改

  const onSubmit = (e) => {
    e.preventDefault();
    if (pwd === realPass) {
      router.push("/home");
    } else {
      setErr("密码不对 / Sai mật khẩu");
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: 16,
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          width: "100%",
          maxWidth: 340,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: 12 }}>🔒 请输入访问密码</h2>
        <input
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setErr("");
          }}
          placeholder="输入密码"
          autoComplete="off"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: 15,
          }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: 14,
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "9px 0",
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          进入
        </button>
        {err ? (
          <p style={{ color: "red", marginTop: 10, fontSize: 13 }}>{err}</p>
        ) : null}
        <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
          默认密码：<b>{realPass}</b>
        </p>
      </form>
    </main>
  );
}
