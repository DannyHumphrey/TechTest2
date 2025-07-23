import { NextResponse } from 'next/server';
import { fetchPatient, verifyPatient } from './patient';

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
    const patient = await fetchPatient(nhsNumber, subscriptionKey);
    const age = verifyPatient(patient, surname, dateOfBirth);

    if (age === null) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json({ age });
  } catch(err: any) {
    if (err.message?.includes('404')) {
      return new NextResponse(null, { status: 404 });
  }
}
}