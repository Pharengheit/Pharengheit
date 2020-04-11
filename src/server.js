import process         from 'process';
import express         from 'express';
import user            from './routers/UserRouter.js';
import transaction     from './routers/TransactionRouter.js';
import transactionType from './routers/TransactionTypeRouter.js';
import CategoryRouter from './routers/CategoryRouter.js';
import pool            from './database.js';

const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, async () => {
    console.log(`Server started on port ${server.address().port}`);

    await pool.connect();

    app.use(express.json());

    app.use('/api/users', user);
    app.use('/api/transactions', transaction);
    app.use('/api/transactiontypes', transactionType);

    const categoryRouter = new CategoryRouter(pool);

    app.use('/api/categories', categoryRouter.router);

});

const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
sigs.forEach(sig => {
    process.on(sig, function() {
        console.log('Server shutdown');
        server.close(() => {
            pool.end();
            process.exit(0)
        });
    });
});