import process from 'process';
import express from 'express';
import user from './routers/UserRouter.js';
import transaction from './routers/TransactionRouter.js';
import transactionType from './routers/TransactionTypeRouter.js';
import category from './routers/CategoryRouter.js';
import path from 'path';
const __dirname = path.resolve();
import mustacheExpress from 'mustache-express';
import categoryPages from './routers/CategoryPages.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/api/users', user);
app.use('/api/transactions', transaction);
app.use('/api/transactiontypes', transactionType);
app.use('/api/categories', category);

app.use('/categories', categoryPages);

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${server.address().port}`);
});