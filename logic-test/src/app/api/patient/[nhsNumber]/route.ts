import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: 
  { params: { nhsNumber: string } }
) {
  const { nhsNumber } = await params;
  const url = new URL(_request.url);
  const searchParams = url.searchParams;
  const dateOfBirth = searchParams.get("dateOfBirth") || "";
  
  const surname = searchParams.get("surname") || "";

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

    const data: { name: string; born: string } = await res.json();
    const [apiSurname] = data.name.split(",");
    const dobFormatted = new Date(dateOfBirth)
    .toLocaleDateString("en-GB")
    .split("/")
    .join("-");

    console.log(data.born)
    console.log(dobFormatted);

    if (
        apiSurname.trim().toLowerCase() !== surname.trim().toLowerCase() ||
        data.born !== dobFormatted
    ) {
        return new NextResponse(null, {status: 404});
    }
    const [day, month, year] = data.born.split("-").map(Number);
    const dobDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
    }

    return NextResponse.json({ age: age });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}