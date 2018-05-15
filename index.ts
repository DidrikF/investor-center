import app from './koaServer';
const config = require('./config').get();

export default app.listen(config.server.port);

