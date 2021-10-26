import { connect } from 'mongoose';

import dbConfig from './config/db';

export async function startConnection() {
    await connect(dbConfig.URI);

    console.log('Database is connected');
}
