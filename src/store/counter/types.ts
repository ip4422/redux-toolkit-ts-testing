export enum counterStatus {
  idle = 'idle',
  loading = 'pending',
  failed = 'failed'
}

/**
 * Counter state
 * @typedef CounterState
 * @type {object}
 * @property {number} value -  current counter value
 * @property {counterStatus} status - status of osync counter
 */
export interface CounterState {
  value: number
  status: counterStatus
}
