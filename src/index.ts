import { createApp } from './config/app.config.js'

const app = createApp()

export default { port: process.env.PORT, fetch: app.fetch }
