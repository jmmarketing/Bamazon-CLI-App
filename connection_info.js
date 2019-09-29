console.log("Database Info Loaded");

exports.connection = {
    host: process.env.SQL_Host,
    user: process.env.SQL_User,
    password: process.env.SQL_password,
    database: process.env.SQL_database,
}; 