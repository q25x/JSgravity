m = document.getElementById("lyf").getContext('2d')

draw = (x,y,c,s) => {
    m.fillStyle = c[1]
    m.fillRect(x,y,s,s)
}
drawcrc = (x,y,c,c2,s) => {
   m.beginPath()
   m.arc(x, y, s + 2, 0, 2 * Math.PI, true)
   m.closePath()
   m.fillStyle = "#0f0"
   m.fill()
   m.strokeStyle = c2
   m.lineWidth = 5
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

rule = (particles1, particles2, g) => {
    g *= -1
    for (i=0; i < particles1.length; i++) {
        //fx = 0
        //fy = 0
        for (j=0; j < particles2.length; j++) {
            a = particles1[i]
            b = particles2[j]
            dx = a.x - b.x
            dy = a.y - b.y

            d = Math.sqrt(dx * dx + dy * dy)
            
            if (d > 0) {
                F = g * (1 / d)
                fx = (F * dx)
                fy = (F * dy)
            }
        }
        //      kms
        a.vx = (a.vx + fx)
        a.vy = (a.vy + fy)
        a.x += a.vx * b.size * 0.001
        a.y += a.vy * b.size * 0.001
        b.vx = (b.vx + fx)
        b.vy = (b.vy + fy)
        b.x -= b.vx * a.size * 0.001
        b.y -= b.vy * a.size * 0.001

        if(a.x <= 1 || a.x >= 3999) {a.vx *= -1}
        if(a.y <= 1 || a.y >= 3999) {a.vy *= -1}
        if(b.x <= 1 || b.x >= 3999) {b.vx *= -1}
        if(b.y <= 1 || b.y >= 3999) {b.vy *= -1}
        
    }
}


// partikle

//red = create(1, ["#f00", "#400"], 5)
//green = create(1, ["#0f0", "#040"], 2)
blue = create(1, "blue", "#000", 400, 2000, 2000)
green = create(1, "#0f0", "#000", 5, null, null, 0, 70)

update=()=>{

    //   -- Rules --
    rule(green, blue, 1)
    rule(green, green, 1)
   // rule(blue, green, 0.001)
    
//    rule(red, green, 0.1)
//    rule(red, blue, 0.1)
//    rule(green, blue, 0.25)
//    rule(green, red, 0.25)
//    rule(blue, red, 0.01)
//    rule(blue, green, 0.01)
    //  -- The End --

    m.clearRect(0, 0, 4000, 4000)
    draw(0, 0, "black", 4000)
    for (i=0; i<particles.length; i++) {
        drawcrc(particles[i].x, particles[i].y, particles[i].color, particles[i].color2, particles[i].size)
    }
    requestAnimationFrame(update)
    velocity = Math.sqrt(particles[1].vx * particles[1].vx + particles[1].vy * particles[1].vy)
    
    divc.innerHTML = "Velocity: " + velocity.toFixed(3)
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