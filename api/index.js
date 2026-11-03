export const config = {
  runtime: "edge",
  regions: ["sfo1"], // 旧金山；也可试 pdx1（波特兰），哪个更快用哪个
};

const TARGET = "http://122.143.212.35.bc.googleusercontent.com:33728";

export default async function handler(req) {
  const url = new URL(req.url);
  const headers = new Headers(req.headers);
  headers.delete("host");

  const resp = await fetch(TARGET + url.pathname + url.search, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : req.body,
    duplex: "half",
    redirect: "manual",
  });

  const out = new Headers(resp.headers);
  out.set("Cache-Control", "no-store");
  return new Response(resp.body, { status: resp.status, headers: out });
}