import express from 'express';
import health from './routes/health';
import shipping from './routes/shipping';
import { CONFIG } from './config';
import swaggerUi from 'swagger-ui-express';
import { openapi } from './openapi';

const app = express();
app.use(express.json());
app.get('/', (_req, res) => res.redirect('/docs'));
app.use(health);
app.use('/api', shipping);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi as any));
app.use((err: any, _req: any, res: any, _next: any) => { console.error(err); res.status(500).json({ error: 'Internal Server Error' }); });
app.listen(CONFIG.port, () => console.log(`API running at http://localhost:${CONFIG.port}`));