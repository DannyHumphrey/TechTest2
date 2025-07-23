import { verifyPatient } from '../patient';

describe('verifyPatient', () => {
  it('returns age when surname and dob match', () => {
    const patient = { name: 'Smith, John', born: '01-01-2000' };
    const age = verifyPatient(patient, 'Smith', '2000-01-01');
    expect(typeof age).toBe('number');
  });

  it('returns null when surname mismatches', () => {
    const patient = { name: 'Smith, John', born: '01-01-2000' };
    expect(verifyPatient(patient, 'Doe', '2000-01-01')).toBeNull();
  });

  it('returns null when dob mismatches', () => {
    const patient = { name: 'Smith, John', born: '01-01-2000' };
    expect(verifyPatient(patient, 'Smith', '1999-12-31')).toBeNull();
  });
});