export interface BmiResult {
  value: number;
  unit: "kg/m²";
}

export function calculateBmi(weightKg: number, heightCm: number): BmiResult {
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    throw new Error("weightKg must be a positive number");
  }

  if (!Number.isFinite(heightCm) || heightCm <= 0) {
    throw new Error("heightCm must be a positive number");
  }

  const heightM = heightCm / 100;
  const raw = weightKg / heightM ** 2;

  return {
    value: Math.round(raw * 10) / 10,
    unit: "kg/m²",
  };
}
