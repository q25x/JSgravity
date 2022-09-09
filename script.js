m = document.getElementById("lyf").getContext('2d')

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
    m.lineTo(x + vx, y + vy)
    m.strokeStyle = "white"
    m.stroke()
}


particles = []
particle = (x,y,c,c2,s,vx,vy) => { 
    return { x: x, y: y, vx: vx, vy: vy, color: c, color2: c2, size: s}
}


random = () => {
    return Math.round(Math.random()*3900+50)
}

create = (number, color, color2, size, x, y, vx, vy) => {
    group = []
    for (i=0; i<number; i++) {
        
        group.push(particle(x || random(), y || random(), color, color2, size, vx || 0, vy || 0))
        particles.push(group[i])
    }
    return group
}
// T H E  G R A V I T Y  M U L T I P L I E R
// T H E  G R A V I T Y  M U L T I P L I E R

gravity = (particles1, particles2) => {
    for (i=0; i < particles1.length; i++) {
        fx = 0
        fy = 0
        for (j=0; j < particles2.length; j++) {
            a = particles1[i]
            b = particles2[j]
            dx = a.x - b.x
            dy = a.y - b.y

                //odleglosc^2
            d = dx * dx + dy * dy
            
            if (d > 0) {
                // f = ma
                F = (a.size * b.size) / d

                fx = (F * dx)
                fy = (F * dy)
            }
        }
        //      kms
        a.vx = (a.vx + fx)
        a.vy = (a.vy + fy)
        a.x += a.vx * b.size
        a.y += a.vy * b.size
        
        b.vx = (b.vx + fx)
        b.vy = (b.vy + fy)
        b.x += b.vx * a.size
        b.y += b.vy * a.size

        if(a.x <= 1 || a.x >= 3999) {a.vx *= -1}
        if(a.y <= 1 || a.y >= 3999) {a.vy *= -1}
        if(b.x <= 1 || b.x >= 3999) {b.vx *= -1}
        if(b.y <= 1 || b.y >= 3999) {b.vy *= -1}
        
        if(d <= b.size + a.size) {
            
        }
    }
}


// partikle

//red = create(1, ["#f00", "#400"], 5)
//green = create(1, ["#0f0", "#040"], 2)
orange = create(1, "#ffb226", "#f48225", 40, 1000, 1000, 0, 100)
blue = create(1, "#22a6f2", "#1771a5", 100, 3000, 3000, 0, 0)


update=()=>{

    //   -- Rules --
    gravity(blue, orange)
// particles[0].x = 2000
// particles[0].y = 2000
    //  -- The End --

    m.clearRect(0, 0, 4000, 4000)
    m.fillStyle = "black"
    m.fillRect(0, 0, 4000, 4000)
    for (i=0; i<particles.length; i++) {
        drawcrc(particles[i].x, particles[i].y, particles[i].color, particles[i].color2, particles[i].size)
        drawvec(particles[i].x, particles[i].y, particles[i].vx, particles[i].vy)
    }
    requestAnimationFrame(update)
    velocity = Math.sqrt(particles[1].vx * particles[1].vx + particles[1].vy * particles[1].vy)
    
    divc.innerHTML = "velocity: " + velocity.toFixed(3)
}
 div = document.getElementById("box")
 divc = document.createElement("div")
 div.append(divc)
// setInterval(() => {
//     update();
// },700);

// setInterval(() => {
//     console.log(particles[1])
// }, 500);
update();