export enum EStatusOrderTypes {
  WAITING = 'waiting',
  CONFIRMED = 'confirmed',
  IN_PREPARATION = 'in_preparation',
  READY = 'ready',
  DELIVERED = 'delivered',
  REFUSED = 'refused',
}

export type TStatusOrderTypes =
  | 'waiting'
  | 'confirmed'
  | 'in_preparation'
  | 'ready'
  | 'delivered'
  | 'refused';
