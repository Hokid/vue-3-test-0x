import { type ConsolaInstance, type ConsolaOptions, createConsola, LogLevels } from 'consola'

export type Logger = ConsolaInstance

export const mainLogger = createConsola({
  level: LogLevels.debug,
  formatOptions: {
    date: false,
    colors: true,
    compact: true,
  },
  fancy: true,
} as Partial<ConsolaOptions> & { fancy: boolean })

export const LOGGER = Symbol('logger')
