var center = {x: 0, y: 0}
var socket
var player
var others = []

function setup(){
    createCanvas(window.innerWidth, window.innerHeight)
    window.addEventListener('resize', resize)
    resize();
    
    player = new Player(random(-center.x, center.x), random(-center.y, center.y), null, 'white')

    socket = io('http://localhost:3000')
    socket.on('id', id => {
        player.id = id
        socket.emit('register', player)
    })
    socket.on('registered', addOther)
    socket.on('moved', moveOther)
    socket.on('otherList', addList)
    socket.on('disconnected', removeOther)    
}

function draw(){
    background(51)
    translate(center.x, center.y)
    others.forEach(other => other.render())
    player.render()
}

/**
 * Socket Events
 */
function addList(otherList){
    others = []
    otherList.forEach(other => addOther(other))
}
function addOther(other){
    let item = new Player(other.x, other.y, other.name, 'dimgray')
    item.setId(other.id)
    others.push(item)
}

function removeOther(id){
    others = others.filter(item => item.id != id)
}

function moveOther(other){
    var list = others.filter(item => item.id == other.id)
    if(list.length > 0) list[0].moveTo(other.x, other.y);
}

function mousePressed(){
    let x = mouseX - center.x
    let y = mouseY - center.y
    player.moveTo(x, y)
    socket.emit('move', {id: player.id, x, y})
}

/**
 * Prepare application to resize
 */
function resize(){
    resizeCanvas(window.innerWidth, window.innerHeight);
    center = {x: width/2, y: height/2}
}
