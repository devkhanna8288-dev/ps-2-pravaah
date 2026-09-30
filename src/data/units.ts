export interface UnitRecord {
  id: string;
  name: string;
  headcount: number;
  strainScore: number;
  monthlyTrend: number[]; // 6 months
}

export const mockUnits: UnitRecord[] = [
  { id: "U-1", name: "Battalion 1", headcount: 120, strainScore: 35, monthlyTrend: [40, 38, 36, 35, 34, 35] },
  { id: "U-2", name: "Battalion 4", headcount: 150, strainScore: 78, monthlyTrend: [60, 65, 70, 75, 76, 78] },
  { id: "U-3", name: "District Unit 12", headcount: 85, strainScore: 55, monthlyTrend: [45, 48, 50, 52, 54, 55] },
  { id: "U-4", name: "Reserve Company B", headcount: 95, strainScore: 42, monthlyTrend: [40, 41, 41, 42, 43, 42] },
];
