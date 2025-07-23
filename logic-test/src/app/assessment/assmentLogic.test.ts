import { getAgeGroup, evaluateAssessment } from "./assmentLogic";

describe('getAgeGroup', () => {
  it('returns correct group boundaries', () => {
    expect(getAgeGroup(20)).toBe('16-21');
    expect(getAgeGroup(21)).toBe('16-21');
    expect(getAgeGroup(22)).toBe('22-40');
    expect(getAgeGroup(40)).toBe('22-40');
    expect(getAgeGroup(41)).toBe('41-65');
    expect(getAgeGroup(65)).toBe('41-65');
    expect(getAgeGroup(66)).toBe('65+');
  });
});

describe('evaluateAssessment', () => {
  it('returns info variant for low scores', () => {
    const res = evaluateAssessment(20, 'yes', 'yes', 'yes');
    expect(res.variant).toBe('info');
  });

  it('returns warning variant for high scores', () => {
    const res = evaluateAssessment(40, 'yes', 'yes', 'no');
    expect(res.variant).toBe('warning');
  });
});