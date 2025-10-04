const dotenv = require('dotenv-override');
dotenv.config({override: true})

console.log("Using SQLite database")

module.exports = {
    type: "sqlite",
    database: "database.db",
    entities: ["./dist/entities/*.js"],
    logging: true,
    synchronize: true,
    migrations: ["./dist/migrations/*.js"],
    cli: {
        "migrationsDir": "./dist/migrations"
    }
}