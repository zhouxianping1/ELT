// middleware.js
import { NextResponse } from "next/server";

// 这里写你的密码
const PASS = process.env.SITE_PASS ?? "buzhidao";

export function middleware(request) {
  const url = request.nextUrl;
  const pass = url.searchParams.get("pass");

  // 密码对了 → 放行
  if (pass === PASS) {
    return NextResponse.next();
  }

  // 密码不对 → 返回一个极简 HTML（不用 __dirname、不用 fs、不用引别的文件）
  const html = `
    <!doctype html>
    <html>
      <head><meta charset="utf-8" /><title>Protected</title></head>
      <body style="font-family:sans-serif;padding:24px;max-width:420px;">
        <h2>🔒 需要密码才能访问</h2>
        <form method="GET" style="margin-top:16px;">
          <input name="pass" placeholder="buzhidao" style="padding:6px 10px;" />
          <button type="submit" style="padding:6px 10px;margin-left:6px;">进入</button>
        </form>
        <p style="margin-top:10px;color:#666;">默认密码：<b>buzhidao</b></p>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 401,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

// ❗只拦首页，别的系统路径一律放行，防止再 500
export const config = {
  matcher: ["/"],
};
