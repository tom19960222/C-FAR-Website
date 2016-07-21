/// <reference path="../../../typings/index.d.ts" />
declare var app: Express.Application;
let sequelize = app.db.sql;
import {User} from './user';

let _User = User(sequelize);

export {_User as userModel};
export * from './user';

// export default {
//     userModel: User.User(sequelize),
// };

// module.exports = {
//     User: require('./user')(sequelize)
// }
