// inside db/seed.js

// grab our client with destructuring from the export in index.js
const { client } = require('./index');

async function testDB() {
  try {
    // connect the client to the database, finally
    client.connect();

    const { rows } = await client.query(`SELECT * FROM users;`);
    console.log(rows);
  } catch (error) {
    console.error(error);
  } finally {
    // it's important to close out the client connection
    client.end();
  }
}

testDB();

// this function should call a query which drops all tables from our database
    async function dropTables() {
        try {
          await client.query(`
            DROP TABLE IF EXISTS users;
          `);
        } catch (error) {
          throw error;
        }
      }
    
  
  // this function should call a query which creates all tables for our database 
  async function createTables() {
    try {
      await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL
      );
      `);
    } catch (error) {
      throw error; // we pass the error up to the function that calls createTables
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
    } catch (error) {
      console.error(error);
    } finally {
      client.end();
    }
  }
  
  rebuildDB();