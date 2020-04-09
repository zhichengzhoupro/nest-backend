import * as config from 'config'

const dbConfig = config.get('db');

export const dbConnect : any = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : dbConfig.synchronize
};
