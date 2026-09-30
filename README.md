# SAHAYAK - Personnel Welfare & Monitoring Dashboard

A working frontend prototype for the SAHAYAK predictive personnel stress and welfare monitoring dashboard. Built for uniformed forces (Ministry of Home Affairs, India) to facilitate proactive, non-punitive welfare interventions.

## Setup Instructions

1. Ensure you have Node.js installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure

- `/src/assets`: Images and icons.
- `/src/components`: Reusable UI components.
- `/src/pages`: Application views (Login, Overview, SupportQueue, etc.).
- `/src/data`: Mock data JSON/TS files (`personnel.ts`, `units.ts`, etc.).
- `/src/services`: API service layer (`mockApi.ts`) featuring simulated async delays.
- `/src/store`: Global state management using Zustand (`useStore.ts`).
- `/src/layouts`: Dashboard and navigation shells.

## Replacing Mock Data with a Real API

To transition from the current prototype to a production backend:

1. Look at `src/services/mockApi.ts`.
2. Replace the `mockPersonnel` and `mockUnits` array imports with actual `fetch` or `axios` calls to your endpoints.
3. Ensure the backend implements the data shapes defined in `API_CONTRACT.md`.
4. Update the authentication mechanism in `src/store/useStore.ts` to validate real tokens (JWT) rather than accepting any 6-digit code.
