// Controller server - indica porta onde servidor irá rodar

const app = require('../infra/app');
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`http://localhost:${PORT}`));