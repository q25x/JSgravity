canvas = document.getElementById("gsim").getContext('2d')

const MSIZE = 4000
const G = 0.01

//kwadrat :)
drawRect = (x,y,c,c2,s) => {
    canvas.fillStyle = c
    canvas.fillRect(x+5,y+5,s,s)
    canvas.fillStyle = c2
    canvas.fillRect(x,y,s,s)
}
// kolko
drawCrc = (x,y,c,c2,s) => {
   canvas.beginPath()
   canvas.arc(x, y, s, 0, 2 * Math.PI, true)
   canvas.fillStyle = c
   canvas.fill()
   canvas.strokeStyle = c2
   canvas.lineWidth = 10
   canvas.stroke()

}
//linia
drawVec = (x, y, vx, vy) => {
    canvas.beginPath()
    canvas.moveTo(x, y)
    canvas.lineTo(x + vx, y + vy)
    canvas.strokeStyle = "white"
    canvas.stroke()
}


particles = []
particle = (x,y,c,c2,s,vx,vy) => { 
    return { x: x, y: y, vx: vx, vy: vy, ax: 0, ay: 0, color: c, color2: c2, size: s, m: Math.PI*s*s}
}


random = (min, max) => {
    return Math.round(Math.random()*max+min)
}

create = (count, color, color2, size, x, y, vx, vy) => {
    for (i=0; i<count; i++) {
        particles.push(particle(x || random(size, MSIZE-size), y || random(size, MSIZE-size), color, color2, size || random(6,10), vx || 0, vy || 0))
    }
}

updatePhysics = () => {
    for (let i=0; i < particles.length; i++) {
        
        let p = particles[i]

        let fx = 0
        let fy = 0

        for (let j=0; j<particles.length; j++) {
            
            let p2 = particles[j]
            
            if (i===j) {continue}
            
            //roznica x1, x2; y1, y2
            dx = (p2.x - p.x)
            dy = (p2.y - p.y)

            d = Math.sqrt(dx * dx + dy * dy) // odleglosc partikli

            f = G * (p.m * p2.m) / (d) // sila

            
            // wektory sily
            fx += dx/d * f
            fy += dy/d * f

                // kolizje
            if (d <= p.size + p2.size)
            {
                // predkosc = wektor sily * sila * stosunek mas 
                p.vx += -fx * 0.001 * (p2.m / p.m)
                p.vy += -fy * 0.001 * (p2.m / p.m)

                p2.vx += fx * 0.001 * (p.m / p2.m)
                p2.vy += fy * 0.001 * (p.m / p2.m)
            }
        }
        
        // rysowanie wektora sily
        //drawVec(p.x, p.y, fx, fy)  

        //przyspieszenie
        p.ax = fx / p.m
        p.ay = fy / p.m
        
        //predkosc
        p.vx += p.ax
        p.vy += p.ay

        //pozycja
        p.x += p.vx
        p.y += p.vy
    
        //odbicie od mapy
        if (p.x - p.size < 0 || p.x + p.size > MSIZE) {p.vx *= -0.99}
        if (p.y - p.size < 0 || p.y + p.size > MSIZE) {p.vy *= -0.99}


        

    }

}
 

//  - - -    partikle    - - -
create(1, "#ffb226", "#f48225", 20, 2000, 2000, 0, 0)
create(1, "#4ab8ff", "#3380b2", 2, 2000, 2140, 4, 0)
// - - - koniec partikli - - -


update=()=>{
    // resetowanie canvas
    canvas.clearRect(0, 0, MSIZE, MSIZE)
    canvas.fillStyle = "black"
    canvas.fillRect(0, 0, MSIZE, MSIZE)
    
    updatePhysics() // script.js:45

    for (i=0; i<particles.length; i++) {
        drawCrc(particles[i].x, particles[i].y, particles[i].color, particles[i].color2, particles[i].size)
        // wektor predkosci // drawVec(particles[i].x, particles[i].y, particles[i].vx, particles[i].vy)
    }
    requestAnimationFrame(update)
}


update(); // :)