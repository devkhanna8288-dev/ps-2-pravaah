import { mockPersonnel, type PersonnelRecord } from '../data/personnel';
import { mockUnits, type UnitRecord } from '../data/units';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getPersonnel: async (): Promise<PersonnelRecord[]> => {
    await delay(600);
    return mockPersonnel;
  },
  getPersonnelById: async (id: string): Promise<PersonnelRecord | undefined> => {
    await delay(400);
    return mockPersonnel.find(p => p.id === id);
  },
  getUnits: async (): Promise<UnitRecord[]> => {
    await delay(500);
    return mockUnits;
  }
};
