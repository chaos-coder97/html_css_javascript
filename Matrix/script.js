const particleList = [];
const columns = [];
const w = 12;
const h = w * 2;
let lastUpdateAt = -1000;

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    mult(factor) {
        this.x *= factor;
        this.y *= factor;
        return this;
    }
    multX(factor) {
        this.x *= factor;
        return this;
    }
    addX(x) {
        this.x += x;
        return this;
    }
    sub(vec) {
        return new Vector(this.x - vec.x, this.y - vec.y);
    }
    setMag(mag) {
        const currentMag = Math.sqrt(this.x * this.x + this.y * this.y) || 1;
        this.x = (this.x / currentMag) * mag;
        this.y = (this.y / currentMag) * mag;
        return this;
    }
    magSq() {
        return this.x * this.x + this.y * this.y;
    }
}

class Particle {
    constructor(isClone = false) {
        this.state = 'good';
        this.createdAt = performance.now();
        this.isClone = isClone;
        this.pos = new Vector();
        this.vel = new Vector();
        this.pickChar();
        if (!this.isClone) {
            this.reset();
        }
    }

    reset() {
        const now = performance.now();
        const xCount = Math.ceil(window.innerWidth / w);
        const validColumns = [];

        for (let i = 0; i < xCount; i++) {
            const n = columns[i];
            if (!n || now - n > 2500) {
                validColumns.push(i);
            }
        }

        if (validColumns.length === 0) {
            validColumns.push(0);
        }

        const columnIndex = validColumns[Math.floor(Math.random() * validColumns.length)];
        columns[columnIndex] = now;
        const x = (columnIndex + 0.5) * w;
        this.pos = new Vector(x, -w);
        this.vel.set(0, 0);
    }

    pickChar() {
        if (this.isClone && Math.random() < 0.9) return;
        const offsetGroup = [[0x30, 0x39], [0x41, 0x5A], [0xFF66, 0xFF9D]][Math.floor(Math.random() * 3)];
        this.offset = Math.floor(Math.random() * (offsetGroup[1] - offsetGroup[0])) + offsetGroup[0];
        this.char = String.fromCodePoint(this.offset);
    }

    clone() {
        if (!this.isClone) {
            const p = new Particle(true);
            p.pos.set(this.pos.x, this.pos.y);
            p.char = this.char;
            particleList.push(p);
        } else {
            this.remove();
        }
    }

    remove() {
        const index = particleList.indexOf(this);
        if (index !== -1) {
            particleList.splice(index, 1);
        }
    }
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawText(p, alpha) {
    ctx.font = `600 ${h}px monospace`;
    ctx.fillStyle = p.isClone ? `rgba(0, 255, 0, ${alpha})` : "#fff";
    ctx.fillText(p.char, p.pos.x, p.pos.y);
}

function animate(time) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const shouldUpdate = lastUpdateAt + 100 < time;

    for (let i = particleList.length - 1; i >= 0; i--) {
        const p = particleList[i];
        const aliveTime = time - p.createdAt;

        if (p.isClone && aliveTime > 2500) {
            p.remove();
            continue;
        }

        const alpha = p.isClone ? Math.max(0, 1 - (aliveTime - 2000) / 500) : 1;
        drawText(p, alpha);

        if (shouldUpdate) {
            if (!p.isClone) {
                p.clone();
                p.pos.y += h;
            }
            p.pickChar();

            if (p.pos.y > canvas.height) {
                p.reset();
            }
        }

        p.pos.add(p.vel.mult(0.875));
    }

    if (shouldUpdate) {
        lastUpdateAt = time;
    }

    requestAnimationFrame(animate);
}

function setup() {
    for (let i = 0; i < 40; i++) {
        const p = new Particle(false);
        p.pos.y = Math.random() * canvas.height;
        particleList.push(p);
    }
    requestAnimationFrame(animate);
}

setup();
