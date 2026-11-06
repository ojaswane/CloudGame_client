export async function POST(request: Request) {
    const controlWsUrl = process.env.NEXT_PUBLIC_CONTROL_WS_URL;
    if (!controlWsUrl) {
        return Response.json({ error: "Control panel URL is not configured" }, { status: 503 });
    }

    const idempotencyKey = request.headers.get("Idempotency-Key")?.trim();
    if (!idempotencyKey) {
        return Response.json({ error: "Idempotency-Key header is required" }, { status: 400 });
    }

    let gameName: unknown;
    try {
        const body: unknown = await request.json();
        gameName =
            typeof body === "object" && body !== null && "game_name" in body
                ? body.game_name
                : undefined;
    } catch {
        return Response.json({ error: "A valid JSON request body is required" }, { status: 400 });
    }

    if (typeof gameName !== "string" || !gameName.trim()) {
        return Response.json({ error: "game_name is required" }, { status: 400 });
    }

    try {
        const controlUrl = new URL(controlWsUrl);
        if (controlUrl.protocol === "ws:") {
            controlUrl.protocol = "http:";
        } else if (controlUrl.protocol === "wss:") {
            controlUrl.protocol = "https:";
        } else {
            return Response.json({ error: "Control panel URL must use ws:// or wss://" }, { status: 500 });
        }

        controlUrl.pathname = `${controlUrl.pathname.replace(/\/+$/, "")}/sessions`;
        controlUrl.search = "";
        controlUrl.hash = "";

        const upstreamResponse = await fetch(controlUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Idempotency-Key": idempotencyKey,
            },
            body: JSON.stringify({ game_name: gameName.trim() }),
            cache: "no-store",
        });

        return new Response(upstreamResponse.body, {
            status: upstreamResponse.status,
            headers: {
                "Content-Type": upstreamResponse.headers.get("Content-Type") ?? "application/json",
            },
        });
    } catch (error) {
        console.error("Control panel session proxy failed:", error);
        return Response.json({ error: "Could not reach the control panel" }, { status: 502 });
    }
}