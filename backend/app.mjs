import app from "./middleware/serverMeddleware.mjs";
import signupRouter from "./routes/signup.mjs"
import loginRouter from "./routes/login.mjs"
import userRouter from "./routes/user.mjs"
import signoutRouter from "./routes/signout.mjs"
import refreshTokenRouter from "./routes/refreshToken.mjs"
import { router as images } from "./routes/images.mjs"
import { router as getImage  } from "./routes/imageGet.mjs";
import {router as publicationPost} from "./routes/routesPublicationPost.mjs"
import {router as publicationGet  } from "./routes/routerPublicGet.mjs";
import { authenticate } from "./middleware/authenticate.mjs";
import dotenv from "dotenv"
import { Server as SocketServer } from "socket.io";
import crypto from "crypto";
import main from "./validations/conectionServer.mjs";
import http from "http";
import { router as DeletePubli  } from "./routes/DeletePubli.mjs";
import {router as publicationGetAll  } from "./routes/routerPublicGetAll.mjs";
import {router as citas} from './routes/Appoinment.mjs'
import {router as cancelCita} from './routes/cancelarCitas.mjs'
import { router as chat  } from "./routes/chatai.mjs";
import { router as CitasUsuarios } from "./routes/getCitasUsuario.mjs";
import { router as agendaProfesional } from "./routes/getCitasProfesinal.mjs";
import { router as UpdatePerfil } from "./routes/UpdateUser.mjs";
import {router as portada} from './routes/portada.mjs'
import {router as portadaGet} from './routes/portadaGet.mjs'

dotenv.config();
const expressPort = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: {
        origin: "*",
    },
});
const generateTokenSecret = () => {
    return crypto.randomBytes(64).toString("hex");
};

const ACCESS_TOKEN_SECRET = generateTokenSecret();
const REFRESH_TOKEN_SECRET = generateTokenSecret();
process.env.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
process.env.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;

io.on('connection', socket => {
    console.log('Conexión con socketIO');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', { body: msg.body, user: msg.user });
    });
});

main();



app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", authenticate, userRouter);
app.use("/api/signout", signoutRouter);
app.use("/api/refresh-token", refreshTokenRouter);
app.use("/api/delete",authenticate,DeletePubli )
app.use("/api/upload",authenticate , images);
app.use("/api/getImage", getImage);
app.use("/api/publicationpost", authenticate, publicationPost)
app.use("/api/publicationget", publicationGet)
app.use("/api/publicationgetAll", publicationGetAll);
app.use("/api/citas",citas);
app.use('/api/cancelar-cita',cancelCita)
app.use("/api/chat", chat)
app.use("/api/citas-usuario",CitasUsuarios)
app.use("/api/agenda-profesional", agendaProfesional)
app.use("/api/perfil", UpdatePerfil)
app.use("/api/portada",authenticate,portada)
app.use("/api/portadaGet",portadaGet)

server.listen(expressPort, () => {
    console.log(`El servidor de Express se está ejecutando en el puerto: ${expressPort}`);
});
