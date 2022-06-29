import {Server} from 'socket.io'
import questionModel from './models/question.model.js';
import quizModel from './models/quiz.model.js';
import {LiveGames} from './utils/liveGames.js';
import {Players} from './utils/players.js';

var games = new LiveGames();
var players = new Players();
const WS_PORT = 3001
const io= new Server(WS_PORT, {
    cors: {
        origin:'*',
        methods: ["GET", "POST"]
    }
  })
io.on('connection',(socket)=>{
    console.log(`Client : ${socket.id} is connected`)
    socket.emit('hello', `hello ${socket.id}`)

    // Host Connection
    socket.on('host-join', (data) => {
        socket.join(data.pin)   
    })
    //Player Join Room
    socket.on('player-joined', (data) => {
       socket.join(data) 
    })
    //Add player to Quiz Object
    socket.on('player-add', (data) => {
        socket.to(`${data.selectedPin}`).emit('room-joined', {name: data.nickname, id: socket.id});
    })

    socket.on('question-over', (data) => {
        socket.to(`${data.pin}`).emit('question-over')
    })
    socket.on('next-question', (data) => {
        socket.to(`${data.pin}`).emit('next-question')

    })
    socket.on('question-answered', (data) => {
        socket.to(data.pin).emit('player-answer', {id : data.id, answer: data.answer})
    })
   
    socket.on('sent-info', (data) => {
        io.to(data.id).emit('sent-info', {answeredCorrect: data.answeredCorrect, score: data.score});
    })
})
console.log(`WebSocket Server is running at ws://localhost:${WS_PORT}`);
export default io;