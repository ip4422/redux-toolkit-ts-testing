export enum counterStatus {
  idle = 'idle',
  pending = 'pending',
  failed = 'failed'
}

/**
 * Counter state
 * @typedef CounterState
 * @type {object}
 * @property {number} value -  current counter value
 * @property {counterStatus} status - status of osync counter
 * @property {string} error - error message
 */
export interface CounterState {
  value: number
  status: counterStatus
  error: string | null | undefined
}
