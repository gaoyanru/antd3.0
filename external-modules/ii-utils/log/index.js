const LEVELS = require('./levels')
const Logger = require('./browser-logger')

const logger = new Logger()

const enhanceLogOfLogger = logger => {
  const log = logger.log.bind(logger, LEVELS.info)
  Object.keys(LEVELS).forEach(level => (log[level] = logger.log.bind(logger, level)))
  return log
}

let log = enhanceLogOfLogger(logger)

/**
 * 返回新的带标签的log信息
 * @param {string} tagsString 可以传入多个标签，通过逗号区分
 */
log.tag = tagsString => {
  const prefix = tagsString.split(',').map(tag => `[${tag}]`).join(' ')
  const logger = new Logger({ prefix })
  return enhanceLogOfLogger(logger)
}

module.exports = log