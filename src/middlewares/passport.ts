import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';

import jwtConfig from '../config/jwt';
import User from '../models/User';

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtConfig.JWT_SECRET,
};

export default new Strategy(options, async (payload, done) => {
    const user = await User.findById(payload.id);

    if (!user) {
        return done(null, false);
    }

    return done(null, user);
});
