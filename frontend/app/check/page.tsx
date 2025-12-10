type Health = { status: string; ts: number };

export default async function Check() {
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
  let msg = "not fetched";
  let data: Health | null = null;

  if (base) {
    try {
      const res = await fetch(`${base.replace(/\/+$/, "")}/_health`, { cache: "no-store" });
      if (res.ok) data = (await res.json()) as Health;
      else msg = `/_health status ${res.status}`;
    } catch (e) {
      msg = (e as Error).message;
    }
  } else {
    msg = "NEXT_PUBLIC_API_BASE not set";
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Check</h1>
      <p>API Base: <code>{process.env.NEXT_PUBLIC_API_BASE ?? "(not set)"}</code></p>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div style={{ color: "crimson" }}>{msg}</div>
      )}
    </main>
  );
}
