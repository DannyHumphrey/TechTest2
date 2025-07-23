import { AgeGroup, answer } from "./types";


export function getAgeGroup(age: number): AgeGroup {
  if (age <= 21) return '16-21';
  if (age <= 40) return '22-40';
  if (age <= 65) return '41-65';
  return '65+';
}

const scoring: Record<AgeGroup, { q1: number; q2: number; q3: number }> = {
  '16-21': { q1: 1, q2: 2, q3: 1 },
  '22-40': { q1: 2, q2: 2, q3: 3 },
  '41-65': { q1: 3, q2: 2, q3: 2 },
  '65+': { q1: 3, q2: 3, q3: 1 },
};

export interface AssessmentResult {
  variant: 'info' | 'warning';
  message: string;
}

export function evaluateAssessment(
  age: number,
  q1: answer,
  q2: answer,
  q3: answer
): AssessmentResult {
  const group = getAgeGroup(age);
  const row = scoring[group];
  let total = 0;

  if (q1 === 'yes') total += row.q1;
  if (q2 === 'yes') total += row.q2;
  if (q3 === 'no') total += row.q3;

  if (total <= 3) {
    return {
      variant: 'info',
      message:
        "Thank you for answering our questions, we don't need to see you at this time. Keep up the good work!",
    };
  }

  return {
    variant: 'warning',
    message:
      'We think there are some simple things you could do to improve you quality of life, please phone to book an appointment',
  };
}