import { describe, expect, it } from "vitest";
import { calculateBmi } from "./bmi";

describe("calculateBmi", () => {
  it("calculates and rounds BMI to one decimal place", () => {
    expect(calculateBmi(86.7, 172)).toEqual({ value: 29.3, unit: "kg/m²" });
  });

  it("rejects non-positive weight", () => {
    expect(() => calculateBmi(0, 172)).toThrow("weightKg must be a positive number");
  });

  it("rejects non-positive height", () => {
    expect(() => calculateBmi(86.7, 0)).toThrow("heightCm must be a positive number");
  });
});
