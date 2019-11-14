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
                    INSERT INTO users (id, email, hash)
                    VALUES ($1, $2, $3)
                    RETURNING *;
                    `,
                [user.id, user.email, user.hash]);
                return result.row[0];
            })
        );

        await Promise.all(
            todos.map(todo => {
                const user = savedUsers.find(user => {
                    return user.id === todo.user_id;
                });
                
                return client.query(`
                    INSERT INTO todos (user_id, task, complete)
                    VALUES ($1, $2, $3);
                `,
                [user.id, todo.task, todo.complete]);
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
