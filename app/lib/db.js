import initSqlJs from 'sql.js';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'flyndr.db');

let dbInstance = null;

function saveToDisk(db) {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(DB_PATH, buffer);
}

export async function getDb() {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  if (existsSync(DB_PATH)) {
    const fileBuffer = readFileSync(DB_PATH);
    dbInstance = new SQL.Database(fileBuffer);
  } else {
    dbInstance = new SQL.Database();
  }

  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS searches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      departure_date TEXT,
      passengers INTEGER DEFAULT 1,
      cabin_class TEXT DEFAULT 'economy',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      flight_id TEXT UNIQUE NOT NULL,
      airline TEXT NOT NULL,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      departure_time TEXT,
      arrival_time TEXT,
      duration TEXT,
      stops INTEGER DEFAULT 0,
      price REAL NOT NULL,
      currency TEXT DEFAULT 'USD',
      cabin_class TEXT DEFAULT 'economy',
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);

  saveToDisk(dbInstance);
  return dbInstance;
}

export async function logSearch({ origin, destination, departureDate, passengers, cabinClass }) {
  const db = await getDb();
  db.run(
    `INSERT INTO searches (origin, destination, departure_date, passengers, cabin_class)
     VALUES (?, ?, ?, ?, ?)`,
    [origin, destination, departureDate || null, passengers || 1, cabinClass || 'economy']
  );
  saveToDisk(db);
}

export async function getSearchHistory(limit = 10) {
  const db = await getDb();
  const stmt = db.prepare(`SELECT * FROM searches ORDER BY created_at DESC LIMIT ?`);
  stmt.bind([limit]);
  const results = [];
  while (stmt.step()) results.push(stmt.getAsObject());
  stmt.free();
  return results;
}

export async function clearSearchHistory() {
  const db = await getDb();
  db.run(`DELETE FROM searches`);
  saveToDisk(db);
}

export async function addFavorite(flight) {
  const db = await getDb();
  db.run(
    `INSERT OR REPLACE INTO favorites (flight_id, airline, origin, destination, departure_time, arrival_time, duration, stops, price, currency, cabin_class)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      flight.flightId, flight.airline, flight.origin, flight.destination,
      flight.departureTime, flight.arrivalTime || null, flight.duration,
      flight.stops || 0, flight.price, flight.currency || 'USD', flight.cabinClass || 'economy'
    ]
  );
  saveToDisk(db);
}

export async function removeFavorite(flightId) {
  const db = await getDb();
  db.run(`DELETE FROM favorites WHERE flight_id = ?`, [flightId]);
  saveToDisk(db);
}

export async function getFavorites() {
  const db = await getDb();
  const stmt = db.prepare(`SELECT * FROM favorites ORDER BY created_at DESC`);
  const results = [];
  while (stmt.step()) results.push(stmt.getAsObject());
  stmt.free();
  return results;
}
