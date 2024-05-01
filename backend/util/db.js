const Sequelize = require('sequelize');
const {
	DATABASE_URL,
	DB_PASSWORD,
	DB_USERNAME,
	MODE,
	DATABASE_URL_TEST,
	DATABASE_URL_PRODUCTION,
	HOST,
	DB_HOST,
} = require('./config');
const { Umzug, SequelizeStorage } = require('umzug');

const DatabaseOptions = {
	production: {
		type: 'postgres',
		host: DB_HOST,
		username: DB_USERNAME,
		password: DB_PASSWORD,
		synchronize: true,
		logging: false,
		dialect: 'postgres',
		protocol: 'postgres',
		dialectOptions: {
			ssl: true,
			native: true,
		},
	},
	test: {
		logging: false,
		dialect: 'postgres',
		host: HOST,
		username: 'postgres',
		password: 'postgres',
	},
	cypress: {
		logging: false,
		dialect: 'postgres',
		host: HOST,
		username: 'postgres',
		password: 'postgres',
	},
	development: {
		dialect: 'postgres',
		password: 'mysecretpassword',
		username: 'postgres',
		host: HOST,
	},
};

const databaseURLPicker = () => {
	if (MODE === 'test' || MODE === 'cypress') {
		return DATABASE_URL_TEST;
	} else if (MODE === 'production') {
		return DATABASE_URL_PRODUCTION;
	} else if (MODE === 'development') {
		return DATABASE_URL;
	}
	return null;
};
const URL = databaseURLPicker();
const DatabaseConfig = DatabaseOptions[MODE];

if (!DatabaseConfig || !URL) {
	throw new Error(
		`Mode ${MODE} is not valid. Try production, test, development or cypress`,
	);
}
const sequelize = new Sequelize(URL, { ...DatabaseConfig });

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
		console.log('connecting database failed', err);
		return process.exit(1);
	}
	return null;
};

module.exports = {
	connectToDatabase,
	sequelize,
	rollbackMigration,
	runMigrations,
};
