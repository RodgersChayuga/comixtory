import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt, imageBase64 } = await req.json();

    const res = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
            "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            version: "a9f1e5d91a5b4cfd7be330229c2c7a26092b98e5dd18112c71b285678929e0f4", // toonyou model
            input: {
                prompt,
                image: imageBase64,
                seed: Math.floor(Math.random() * 10000)
            }
        }),
    });

    const data = await res.json();
    return NextResponse.json(data);
}
