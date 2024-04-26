const Sequelize = require('sequelize');
const { DATABASE_URL, DB_PASSWORD, DB_USERNAME, PRODUCTION } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');
console.log('Database: ', DATABASE_URL);
const DatabaseConfig = PRODUCTION ? {
	type: 'postgres',
	host: 'localhost',
	username: DB_USERNAME,
	password: DB_PASSWORD,
	synchronize: true,
	logging: false,
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: true,
		native:true
	}
} : {};

const sequelize = new Sequelize(DATABASE_URL, { ...DatabaseConfig, logging: false });

const migrationConf = {
	migrations: {
		glob: 'migrations/*.js',
	},
	storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
	context: sequelize.getQueryInterface(),
	logger: console,
};

const runMigrations = async () => {
	const migrator = new Umzug(migrationConf);
	const migrations = await migrator.up();
	console.log('Migrations up to date', {
		files: migrations.map((mig) => mig.name),
	});
};
const rollbackMigration = async () => {
	await sequelize.authenticate();
	const migrator = new Umzug(migrationConf);
	await migrator.down();
};
const connectToDatabase = async () => {
	try {
		await sequelize.authenticate();
		await runMigrations();
		console.log('database connected');
	} catch (err) {
		console.log('connecting database failed', err.original);
		return process.exit(1);
	}
	return null;
};

module.exports = { connectToDatabase, sequelize, rollbackMigration, runMigrations };