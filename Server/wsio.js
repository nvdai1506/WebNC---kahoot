import {Server} from 'socket.io'
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
    socket.on('host-join', (data) => {
        console.log(data);
        socket.emit('host-join', `host-join ${socket.id}`)   
    })
    //Player Join Room
    socket.on('player-joined', (data) => {
        console.log(data);
       socket.emit('player-joined', `player-joined ${socket.id}`)
    })
    //Add player to Quiz Object
    socket.on('player-add', (data) => {
        console.log(data);
        socket.emit('player-add', `player-add ${socket.id}`)
    })

    socket.on('question-over', (data) => {
        console.log(data);
        socket.emit('question-over', `question-over ${socket.id}`)
    })
    socket.on('next-question', (data) => {
        console.log(data);
        socket.emit('next-question', `next-question ${socket.id}`)

    })
    socket.on('question-answered', (data) => {
        console.log(data);
        socket.emit('question-answered', `question-answered ${socket.id}`)
    })
   
    socket.on('sent-info', (data) => {
        console.log(data);
        socket.emit('sent-info', `sent-info ${socket.id}`)
    })
})
console.log(`WebSocket Server is running at ws://localhost:${WS_PORT}`);
export default io;