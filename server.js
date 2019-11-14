// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client.js');
// Initiate database connection
client.connect();
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client
            .query(
                `
            SELECT id, email, hash, display_name as "displayName"  
            FROM users
            WHERE email = $1;
        `,
                [email]
            )
            .then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        console.log(user);
        return client
            .query(
                `
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
                [user.email, hash, user.displayName]
            )
            .then(result => result.rows[0]);
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); 
app.use(cors()); 
app.use(express.static('public')); 
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api', ensureAuth);

// API Routes

// *** TODOS ***
app.get('/api/test', (req, res) => {
    res.json({
        message: `the user's id is ${req.userId}`
    });
});


app.get('/api/todos', async (req, res) => {

    try {
        const result = await client.query(`
            SELECT 
            t.id,
            t.task,
            t.user_id,
            u.email as user
            FROM todos t
            JOIN users u
            ON t.user_id = u.id
            ORDER BY t.task
            
        `);

        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }

});

app.post('/api/todos', async (req, res) => {
    const todo = req.body;
    console.log(todo);
    try {
        const result = await client.query(`
            INSERT INTO todos (task, complete)
            VALUES ($1, $2)
            RETURNING *;
            
        `,
        [todo.task, todo.complete]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});
app.post('/api/users', async (req, res) => {
    const user = req.body;

    try {
        const result = await client.query(
            `
            INSERT INTO user (email)
            VALUES ($1)
            RETURNING *;
        `,
            [user.email]
        );

        res.json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).json({
                error: `Type "${user.email}" already exists`
            });
        } else {
            console.log(err);
            res.status(500).json({
                error: err.message || err
            });
        }
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    try {
        const result = await client.query(`
            UPDATE todos
            SET task = $2,
            complete = $3
            WHERE id = $1
            RETURNING *;

        `, [id, todo.task, todo.complete]);
     
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    // get the id that was passed in the route:
    const id = req.params.id; // ???

    try {
        const result = await client.query(`
            DELETE FROM todos
            WHERE id = $1
            RETURNING *;
         
        `, [id]);
        
        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});