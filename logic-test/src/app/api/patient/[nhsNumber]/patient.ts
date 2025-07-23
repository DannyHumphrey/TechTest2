export interface Patient {
  name: string;
  born: string; // format DD-MM-YYYY
}

export function verifyPatient(
  patient: Patient,
  surname: string,
  dateOfBirth: string
): number | null {
  const [apiSurname] = patient.name.split(',');
  const dobFormatted = new Date(dateOfBirth)
    .toLocaleDateString('en-GB')
    .split('/')
    .join('-');

  if (
    apiSurname.trim().toLowerCase() !== surname.trim().toLowerCase() ||
    patient.born !== dobFormatted
  ) {
    return null;
  }

  const [day, month, year] = patient.born.split('-').map(Number);
  const dobDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  return age;
}

export async function fetchPatient(
  nhsNumber: string,
  subscriptionKey: string
): Promise<Patient> {
  const res = await fetch(
    `https://al-tech-test-apim.azure-api.net/tech-test/t2/patients/${nhsNumber}`,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch patient: ${res.status}`);
  }

  const data: Patient = await res.json();
  return data;
}