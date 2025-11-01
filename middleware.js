// middleware.js
import { NextResponse } from "next/server";

// 固定密码（也可以用环境变量 SITE_PASS）
const PASS = process.env.SITE_PASS ?? "buzhidao";

export function middleware(request) {
  const url = request.nextUrl;
  const pass = url.searchParams.get("pass");

  // 带了正确密码就放行
  if (pass === PASS) {
    return NextResponse.next();
  }

  // 没带就出一个超简单的输入页
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

// ❗❗ 只拦真正的页面，放过内部资源/接口/静态文件
export const config = {
  matcher: [
    // 拦所有页面…
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api|vercel).*)",
  ],
};
