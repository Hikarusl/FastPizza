export interface Position {
  latitude: number;
  longitude: number;
}

export interface FetchAddressResult {
  position: Position;
  address: string;
}

export interface UserState {
  username: string;
  status: 'idle' | 'loading' | 'error';
  position: Position | null;
  address: string;
  error: string | null;
}