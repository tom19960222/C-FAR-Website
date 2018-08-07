/// <reference path="../../../typings/index.d.ts" />
import {app} from "../../../app";
let sequelize = app.db.sql;
import {Image, imageInstance, imageAttributes} from './image';

let _Image = Image(sequelize);

export {_Image as imageModel};
export * from './image';


// export default {
//     userModel: User.User(sequelize),
// };

// module.exports = {
//     User: require('./user')(sequelize)
// }
