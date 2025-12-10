// app/page.tsx
// Next.js App Router (Server Component)
// - ESLint: @typescript-eslint/no-explicit-any 사용 안 함
// - 백엔드 /_health 호출해서 상태 표시
// - 환경변수: NEXT_PUBLIC_API_BASE (예: https://port-0-spotjam-xxxx.sel3.cloudtype.app)

type Health = { status: string } & Record<string, unknown>;

type FetchResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

function getApiBase(): string | null {
  // 서버 컴포넌트에서도 NEXT_PUBLIC_*는 빌드타임 노출 가능
  // 환경변수 누락 시 null 반환
  const base = process.env.NEXT_PUBLIC_API_BASE ?? "";
  return base.trim() ? base : null;
}

async function getHealth(): Promise<FetchResult<Health>> {
  const base = getApiBase();
  if (!base) {
    return { ok: false, error: "환경변수 NEXT_PUBLIC_API_BASE가 설정되지 않았습니다." };
  }

  try {
    const url = `${base.replace(/\/+$/, "")}/actuator/health`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, error: `/_health 요청 실패 (status ${res.status})` };
    }

    // 런타임 타입 체크(얕게)
    const raw = (await res.json()) as unknown;
    if (
      typeof raw === "object" &&
      raw !== null &&
      "status" in raw &&
      "ts" in raw &&
      typeof (raw as { status: unknown }).status === "string" &&
      typeof (raw as { ts: unknown }).ts === "number"
    ) {
      const data = raw as Health;
      return { ok: true, data };
    }
    return { ok: false, error: "서버 응답 형식이 예상과 다릅니다." };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    return { ok: false, error: `요청 중 오류: ${msg}` };
  }
}

export default async function Page() {
  const health = await getHealth();

  return (
    <main className="px-4 py-8 md:px-8">
      <section className="max-w-2xl">
        <h1 className="text-2xl md:text-4xl font-bold">Hello World – SpotJam</h1>
        <p className="mt-3 text-gray-600">
          Next.js on Vercel ✅ / Spring Boot on Cloudtype ✅
        </p>

        <div className="mt-6 rounded-2xl border p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold">Backend Health</h2>
          {health.ok ? (
            <pre className="mt-3 overflow-x-auto rounded-xl bg-[#0b0b0b] p-3 text-[#a6ffad]">
              {JSON.stringify(health.data, null, 2)}
            </pre>
          ) : (
            <div className="mt-3 rounded-xl border border-red-300 bg-red-50 p-3 text-red-700">
              {health.error}
            </div>
          )}
          <div className="mt-3 text-sm text-gray-500">
            API Base: <code>{process.env.NEXT_PUBLIC_API_BASE ?? "(not set)"}</code>
          </div>
        </div>

        <div className="mt-8 grid gap-3">
          <a href="/map" className="inline-flex items-center justify-center rounded-xl bg-black px-4 py-3 text-white">
            MAP으로 이동
          </a>
          <a href="/posts" className="inline-flex items-center justify-center rounded-xl border px-4 py-3">
            POSTS로 이동
          </a>
        </div>
      </section>
    </main>
  );
}
