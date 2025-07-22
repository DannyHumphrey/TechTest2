import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { nhsNumber: string } }
) {
  const { nhsNumber } = params;
  const subscriptionKey = process.env.SUBSCRIPTION_KEY;

  if (!subscriptionKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://al-tech-test-apim.azure-api.net/tech-test/t2/patients/${nhsNumber}`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      }
    );

    if (res.status === 404) {
      return new NextResponse(null, { status: 404 });
    }

    if (!res.ok) {
      return new NextResponse(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}