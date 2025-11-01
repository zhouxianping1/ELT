// middleware.js
import { NextResponse } from "next/server";

// 密码：环境变量 SITE_PASS 优先，否则用固定值
const PASS = process.env.SITE_PASS ?? "buzhidao";

export function middleware(request) {
  // 解析当前请求的 URL
  const { searchParams } = new URL(request.url);
  const pass = searchParams.get("pass");

  // 如果带了正确密码就放行
  if (pass === PASS) {
    return NextResponse.next();
  }

  // 否则返回一个非常简单的页面（纯文本/超简单 HTML）
  const html = `
    <!doctype html>
    <html>
      <head><meta charset="utf-8" /><title>Protected</title></head>
      <body style="font-family:sans-serif;padding:24px;">
        <h2>🔒 需要访问密码 / Cần mật khẩu</h2>
        <form method="GET" style="margin-top:16px;">
          <input name="pass" placeholder="buzhidao" style="padding:6px 10px;" />
          <button type="submit" style="padding:6px 10px;margin-left:6px;">进入</button>
        </form>
        <p style="margin-top:8px;color:#666;">Mật khẩu mặc định: <b>buzhidao</b></p>
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

// 让所有路径都经过这个中间件
export const config = {
  matcher: ["/:path*"],
};
