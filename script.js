m = document.getElementById("lyf").getContext('2d')

const MSIZE = 4000
const G = 0.0000001

draw = (x,y,c,c2,s) => {
    m.fillStyle = c
    m.fillRect(x,y,s,s)
}
drawcrc = (x,y,c,c2,s) => {
   m.beginPath()
   m.arc(x, y, s, 0, 2 * Math.PI, true)
   m.fillStyle = c
   m.fill()
   m.strokeStyle = c2
   m.lineWidth = 10
   m.stroke()

}
drawvec = (x, y, vx, vy) => {
    m.beginPath()
    m.moveTo(x, y)
    m.lineTo(x + 5 * vx, y + 5 * vy)
    m.strokeStyle = "white"
    m.stroke()
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
        particles.push(particle(x || random(size, MSIZE-size), y || random(size, MSIZE-size), color, color2, random(20,50), vx || 0, vy || 0))
    }
}
// T H E  G R A V I T Y  M U L T I P L I E R
// T H E  G R A V I T Y  M U L T I P L I E R

updatePhysics = () => {
    for (let i=0; i < particles.length; i++) {
        
        let p = particles[i]
        let fx = 0
        let fy = 0

        for (let j=0; j<particles.length; j++) {
            
            let p2 = particles[j]
            
            if (i===j) {continue}
            
            dx = (p.x - p2.x)
            dy = (p.y - p2.y)
            d = Math.sqrt(dx * dx + dy * dy)
            f = G * (p.m * p2.m) / d^2
            fx -= dx * f
            fy -= dy * f
        }
        
        p.ax = fx / p.m
        p.ay = fy / p.m
        
        //ruch ? 
        p.vx += p.ax
        p.vy += p.ay
        p.x += p.vx
        p.y += p.vy
    
        
    }

}


// partikle

//red = create(1, ["#f00", "#400"], 5)
//green = create(1, ["#0f0", "#040"], 2)
create(5, "#ffb226", "#f48225", 12, null, null, 0, 0)
//create("#22a6f2", "#1771a5", 100, 3000, 3000, 0, 0)


update=()=>{
    
    updatePhysics()
    //   -- Rules --
// particles[0].x = 2000
// particles[0].y = 2000
    //  -- The End --

    m.clearRect(0, 0, MSIZE, MSIZE)
    m.fillStyle = "black"
    m.fillRect(0, 0, MSIZE, MSIZE)
    for (i=0; i<particles.length; i++) {
        drawcrc(particles[i].x, particles[i].y, particles[i].color, particles[i].color2, particles[i].size)
        drawvec(particles[i].x, particles[i].y, particles[i].vx, particles[i].vy)
    }
    requestAnimationFrame(update)
    //velocity = Math.sqrt(particles[1].vx * particles[1].vx + particles[1].vy * particles[1].vy)
    
    //divc.innerHTML = "velocity: " + velocity.toFixed(3)
}
//  div = document.getElementById("box")
//  divc = document.createElement("div")
//  div.append(divc)
// setInterval(() => {
//     update();
// },700);

// setInterval(() => {
//     console.log(particles[1])
// }, 500);
update();