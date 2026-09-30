export interface PersonnelRecord {
  id: string;
  unit: string;
  rankCategory: string;
  wellbeingStatus: 'Stable' | 'Watch' | 'Needs Support';
  supportScore: number;
  contributingFactors: string[];
  deploymentDays: number;
  leaveTakenLast90Days: number;
  avgDutyHoursPerWeek: number;
  transfersLast2Years: number;
  trainingLoad: number;
  selfReportShared: boolean;
  lastReviewed: string;
  history: { month: string; score: number }[];
}

export const mockPersonnel: PersonnelRecord[] = [
  {
    id: "A-2041",
    unit: "Battalion 4",
    rankCategory: "Constable",
    wellbeingStatus: "Needs Support",
    supportScore: 42,
    contributingFactors: ["Fatigue", "High Workload"],
    deploymentDays: 140,
    leaveTakenLast90Days: 2,
    avgDutyHoursPerWeek: 65,
    transfersLast2Years: 3,
    trainingLoad: 12,
    selfReportShared: true,
    lastReviewed: "2026-09-28",
    history: [
      { month: "Apr", score: 80 },
      { month: "May", score: 75 },
      { month: "Jun", score: 65 },
      { month: "Jul", score: 60 },
      { month: "Aug", score: 50 },
      { month: "Sep", score: 42 },
    ]
  },
  {
    id: "B-1092",
    unit: "District Unit 12",
    rankCategory: "Head Constable",
    wellbeingStatus: "Watch",
    supportScore: 68,
    contributingFactors: ["Sleep Quality"],
    deploymentDays: 85,
    leaveTakenLast90Days: 7,
    avgDutyHoursPerWeek: 55,
    transfersLast2Years: 1,
    trainingLoad: 20,
    selfReportShared: false,
    lastReviewed: "2026-09-20",
    history: [
      { month: "Apr", score: 85 },
      { month: "May", score: 82 },
      { month: "Jun", score: 79 },
      { month: "Jul", score: 75 },
      { month: "Aug", score: 70 },
      { month: "Sep", score: 68 },
    ]
  },
  {
    id: "C-3055",
    unit: "Battalion 1",
    rankCategory: "Inspector",
    wellbeingStatus: "Stable",
    supportScore: 92,
    contributingFactors: [],
    deploymentDays: 45,
    leaveTakenLast90Days: 14,
    avgDutyHoursPerWeek: 45,
    transfersLast2Years: 0,
    trainingLoad: 15,
    selfReportShared: true,
    lastReviewed: "2026-09-25",
    history: [
      { month: "Apr", score: 90 },
      { month: "May", score: 91 },
      { month: "Jun", score: 93 },
      { month: "Jul", score: 90 },
      { month: "Aug", score: 92 },
      { month: "Sep", score: 92 },
    ]
  }
];
