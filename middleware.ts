import { NextResponse } from "next/server";

const PASS = process.env.SITE_PASS || "buzhidao";

export function middleware(req: Request) {
  const url = new URL(req.url);

  if (url.searchParams.get("pass") === PASS) {
    return NextResponse.next();
  }

  return new NextResponse(
    `
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f5f5f5;">
        <form method="GET" style="background:#fff;padding:20px 24px;border-radius:12px;box-shadow:0 6px 30px rgba(0,0,0,.08);min-width:280px;">
          <h3 style="margin:0 0 12px 0;">🔒 请输入访问密码</h3>
          <p style="margin:0 0 12px 0;color:#666;font-size:13px;">Mật khẩu: buzhidao</p>
          <input name="pass" type="password" placeholder="Password" style="width:100%;padding:8px 10px;margin-bottom:12px;border:1px solid #ddd;border-radius:6px;" />
          <button type="submit" style="width:100%;background:#000;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;">进入 / Vào</button>
        </form>
      </body>
    </html>
    `,
    {
      status: 401,
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
}

export const config = {
  matcher: ["/:path*"],
};
