const $ = s => document.querySelector(s);


// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {
    setTimeout(() => {
        $("#loader").style.display = "none";
    }, 450);
});


// ===============================
// ENTER CELEBRATION
// ===============================

$("#enterBtn").addEventListener("click", () => {

    // Open cover
    $("#cover").classList.add("open");

    // 🎉 POPPERS IMMEDIATELY
    startPoppers();

    // Show website
    setTimeout(() => {
        $("#site").classList.add("visible");
        document.body.style.overflow = "auto";
    }, 900);

    // Remove cover
    setTimeout(() => {
        $("#cover").remove();
    }, 1700);
});

document.body.style.overflow = "hidden";


// ===============================
// 🎉 TWO-SIDE SMOOTH POPPERS
// ===============================

function startPoppers() {

    const canvas = document.createElement("canvas");

    canvas.id = "popperCanvas";

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const particles = [];


    const colors = [
        "#d8b779",
        "#68101f",
        "#f4d7a1",
        "#ffffff",
        "#e7b85c"
    ];


    // Create popper
    function createPopper(side) {

        const startX =
            side === "left"
                ? 25
                : canvas.width - 25;

        const startY =
            canvas.height * 0.78;


        for (let i = 0; i < 40; i++) {

            // Left side → right/up
            // Right side → left/up
            const angle =
                side === "left"
                    ? -1.05 + (Math.random() - 0.5) * 0.65
                    : -2.10 + (Math.random() - 0.5) * 0.65;


            const speed =
                3 + Math.random() * 3;


            particles.push({

                x: startX,
                y: startY,

                vx:
                    Math.cos(angle) * speed,

                vy:
                    Math.sin(angle) * speed,

                size:
                    4 + Math.random() * 5,

                rotation:
                    Math.random() * Math.PI * 2,

                rotationSpeed:
                    (Math.random() - 0.5) * 0.08,

                life: 1,

                color:
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ]
            });
        }
    }


    // 🎉 BOTH SIDES AT THE SAME TIME
    createPopper("left");
    createPopper("right");


    // Animation
    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        for (
            let i = particles.length - 1;
            i >= 0;
            i--
        ) {

            const p = particles[i];


            // Movement
            p.x += p.vx;
            p.y += p.vy;


            // Smooth gravity
            p.vy += 0.025;


            // Smooth movement
            p.vx *= 0.998;


            // Rotation
            p.rotation +=
                p.rotationSpeed;


            // Slow fade
            p.life -= 0.004;


            // Draw
            ctx.save();

            ctx.translate(
                p.x,
                p.y
            );

            ctx.rotate(
                p.rotation
            );

            ctx.globalAlpha =
                Math.max(
                    p.life,
                    0
                );

            ctx.fillStyle =
                p.color;


            ctx.fillRect(
                -p.size / 2,
                -p.size / 2,
                p.size,
                p.size * 1.6
            );


            ctx.restore();


            // Remove particle
            if (p.life <= 0) {

                particles.splice(
                    i,
                    1
                );
            }
        }


        // Continue animation
        if (particles.length > 0) {

            requestAnimationFrame(
                animate
            );

        } else {

            canvas.remove();
        }
    }


    requestAnimationFrame(
        animate
    );
}


// ===============================
// COUNTDOWN
// ===============================

const target =
    new Date(
        "2026-11-15T10:00:00+05:30"
    ).getTime();


function tick() {

    let d =
        Math.max(
            0,
            target - Date.now()
        );


    let days =
        Math.floor(
            d / 864e5
        );


    let h =
        Math.floor(
            (d % 864e5) / 36e5
        );


    let m =
        Math.floor(
            (d % 36e5) / 6e4
        );


    let s =
        Math.floor(
            (d % 6e4) / 1e3
        );


    $("#days").textContent =
        String(days).padStart(2, "0");

    $("#hours").textContent =
        String(h).padStart(2, "0");

    $("#mins").textContent =
        String(m).padStart(2, "0");

    $("#secs").textContent =
        String(s).padStart(2, "0");
}


tick();

setInterval(
    tick,
    1000
);


// ===============================
// SCROLL REVEAL
// ===============================

const io =
    new IntersectionObserver(
        es => {

            es.forEach(e => {

                if (
                    e.isIntersecting
                ) {

                    e.target.classList.add(
                        "show"
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(x =>
        io.observe(x)
    );


// ===============================
// PHOTO UPLOAD
// ===============================

document
    .querySelectorAll(".photo input")
    .forEach(input => {

        input.addEventListener(
            "change",
            e => {

                const f =
                    e.target.files[0];

                const box =
                    e.target.closest(
                        ".photo"
                    );


                if (!f) return;


                const img =
                    document.createElement(
                        "img"
                    );


                img.src =
                    URL.createObjectURL(f);


                box.appendChild(img);


                box.querySelector(
                    "span"
                ).style.display =
                    "none";


                box.querySelector(
                    "b"
                ).style.display =
                    "none";
            }
        );

    });