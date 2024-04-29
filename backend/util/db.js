const Sequelize = require('sequelize');
const { DATABASE_URL, DB_PASSWORD, DB_USERNAME, MODE, DATABASE_URL_TEST, DATABASE_URL_PRODUCTION, HOST } = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const DatabaseOptions = {
	production: {
		type: 'postgres',
		host: 'localhost',
		url: DATABASE_URL_PRODUCTION,
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
	},
	test: {
		url: DATABASE_URL_TEST,
		logging: false,
		dialect: 'postgres',
		host: HOST,
		username: 'postgres',
		password: 'postgres',
	},
	cypress: {
		url: DATABASE_URL_TEST,
		logging: false,
		dialect: 'postgres',
		host: HOST,
		username: 'postgres',
		password: 'postgres',
	},
	development: {
		url: DATABASE_URL,
		dialect: 'postgres',
		password: 'mysecretpassword',
		username: 'postgres'
	}
};
const DatabaseConfig = DatabaseOptions[MODE];
console.log('DB: ', DatabaseConfig);

if (!DatabaseConfig) {
	throw new Error(`Mode ${MODE} is not valid. Try production, test, development or cypress`);
}
const sequelize = new Sequelize(DatabaseConfig);

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