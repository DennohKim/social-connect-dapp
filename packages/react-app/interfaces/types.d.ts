export interface Pool {
  poolID: number;
  poolName: string;
  poolDescription: string;
  owner: string;
  token: string;
  maxParticipants: number;
  contributionPerParticipant: number;
  durationPerTurn: number;
  startTime: number;
  currentTurn: number;
  participants: string[];
  hasReceived: Record<string, boolean>;
  isActive: boolean;
  isRestrictedPool: boolean;
}
