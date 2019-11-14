const client = require('../lib/client');
// import our seed data:
const todos = require('./todos');
const users = require('./users');

run();

async function run() {

    try {
        await client.connect();
        const savedUsers = await Promise.all (
            users.map(async user => {
                const result = await client.query(`
                    INSERT INTO users (email)
                    VALUES ($1)
                    RETURNING *;
                    `,
                [user]);
                return result.row[0];
            })
        );

        await Promise.all(
            todos.map(todo => {
                const user = savedUsers.find(user => {
                    return user.email === todo.user;
                });
                const userId = users.id;
                return client.query(`
                    INSERT INTO todos (user_id, email, hash, task, complete)
                    VALUES ($1, $2, $3, $4, $5);
                `,
                [userId, user.email, users.hash, todo.task, todo.complete]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
