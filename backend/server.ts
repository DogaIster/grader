import * as express from 'express';
import * as cors from 'cors';

import studentRoutes from './routes/studentRoutes';
import courseRoutes from "./routes/courseRoutes";
import resultRoutes from "./routes/resultRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount student routes
app.use('/api', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api', resultRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
