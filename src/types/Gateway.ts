// types/Gateway.ts
export interface Node {
  id: number;
  nodeId: string;
  name: string;
  active: boolean;
  gatewayId: number;
  lastSeen?: string;
  status: 'online' | 'offline' | 'error';
}

export interface Gateway {
  id: number;
  gatewayId: string;
  name: string;
  ipAddress: string;
  location: string;
  active: boolean;
  nodes?: Node[];
  lastSeen?: string;
}