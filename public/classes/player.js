class Player{
    constructor(x, y, name, playerColor){
        this.id = null
        this.x = x ? x : 0
        this.y = y ? y : 0
        this.name = name ? name : this.randomName()
        this.color = color(playerColor ? playerColor : white)
        this.size = 50;
        this.target = null
        this.velocity = 5
    }

    setId(id){ this.id = id }

    randomName(){
        return random(["Mark", "Stevie", "Ananya", "Ansh", "Kristopher", "Rajan", "Hisham", "Jaydn", "Aila", "Sufyaan", "Alexia", "Neal", "Ivan", "Taylan", "Saira", "Zakk", "Alasdair", "Fardeen", "Mccauley", "Wasim"])
    }

    moveTo(x, y){
        this.target = {x, y}
    }

    update(){
        if(!this.target) return;
        
        var from = createVector(this.x, this.y)
        var to = createVector(this.target.x, this.target.y)
        if(from.dist(to) < this.velocity){
            this.x = this.target.x
            this.y = this.target.y
            this.target = null
            return
        }

        to.sub(from)
        to.normalize()
        to.mult(this.velocity)
        
        this.x += to.x
        this.y += to.y
    }

    render(){
        this.update()

        push()
        let c = color(this.color.toString())
        c.setAlpha(125)

        fill(c)
        stroke(255)
        circle(this.x, this.y, this.size)

        fill(this.color)
        noStroke()
        textAlign(CENTER)
        
        text(this.name, this.x, this.y + this.size)
        pop()
    }
}