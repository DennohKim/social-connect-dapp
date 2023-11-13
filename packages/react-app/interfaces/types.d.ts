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

export interface PoolDetails {
  owner: string;
  poolName: string;
  userTurnAddress:string;
  contributionPerParticipant: number;
  maxParticipants: number;
  durationPerTurn: number;
   currentTurn: number;
  isActive: boolean;
  participants: string[];
  poolBalance:number;
  isRestrictedPool: boolean;
  userContibutionNumber:number;  
  startTime: number;
  
}
