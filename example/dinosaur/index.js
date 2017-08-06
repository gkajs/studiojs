(function (argument) {
    var Stage = studiojs.Stage,
        Track = studiojs.Track,
        Frames = studiojs.Frames,
        loadImage = studiojs.loadImage;

    var canvas = document.getElementById('myCanvas');
    var stage = new Stage(canvas);

    var track1 = new Track(999),
        track2 = new Track(),
        track3 = new Track(),
        track4 = new Track(),
        track5 = new Track();

    stage.add([track1, track2, track3, track4, track5]);

    function handleComplete(images) {
        var data = {
            images: [images[0]],
            frames: {
                width: 44,
                height: 51,
            },
            animations: {
                run: [2, 3, "run"],
                jump: [0, "jump"],
                die: [4],
            }
        };

        var dataRoad = {
            images: [images[1]],
            animations: {
                road: [0, "road"],
            }
        };

        var dataBird = {
            images: [images[2]],
            frames: {
                width: 46,
                height: 42,
            },
            animations: {
                fly: [0, 1, "fly"],
            }
        };

        var dataCloud = {
            images: [images[3]],
            animations: {
                move: [0, "move"],
            }
        };
       
        var dataThorns = {
            images: [images[4]],
            frames: {
                width: 50,
                height: 51,
            },
            animations: {
                thorns2: [1, "thorns2"],
                thorns3: [0, "thorns3"],
            }
        };

        var material = new Frames(data, "run", 10)
                            .onStart(function(curM){
                                curM.x = 20;
                                curM.y = 166;
                                // curM.flip = "horizintal";
                            })
                            .onFrame(function(curM){
                                // console.log("Frames");
                            });

        var materialDie    = new Frames(data, "die");

        var materialRoad   = new Frames(dataRoad, "road");
        var materialBird   = new Frames(dataBird, "fly", 8);
        var materialCloud  = new Frames(dataCloud, "move");
        var materialThorns = new Frames(dataThorns, "thorns2");

        track1.add(material)
            .onFrame(function(curM){
                // console.log("material Frames") 
            });

        track2
            .add(materialRoad)
            .onStart(function(curM){
                curM.x = 0;
                curM.y = 200;
            })
            .onFrame(function(i, curM){
                curM.x -= 3;
                if (curM.x < -900) {
                    curM.x = 0;
                }
            });

        track3
            .add(materialBird)
            .onStart(function(curM){
                curM.scale = 0.6;
                curM.x = 320;
                curM.y = 80;
            })
            .onFrame(function(i, curM){
                curM.x -= 10 ;
                if (curM.x < -60) {
                    curM.x = 340;
                }
            });

        track4
            .add(materialCloud)
            .onStart(function(curM){
                curM.x = 340;
                curM.y = 60;
            })
            .onFrame(function(i, curM){
                curM.x -= 1;
                if (curM.x < -60) {
                    curM.x = 340;
                }
            });

        setTimeout(function(){
            track5
                .add(materialThorns)
                .onStart(function(curM){
                    curM.scale = 0.8;
                    curM.x = 320;
                    curM.y = 172;
                })
                .onFrame(function(i, curM){
                    curM.x -= 2;
                    if (curM.x < -60) {
                        curM.x = 340;
                    }
                });
            }, 5000);

        var isEnd = false,
            $score = document.getElementById("score"),
            score = 0;

        function check() {
            if(!track1.curM || !track5.curM) { return }
            var isHit = checkHit(track1.curM.canvas, track1.curM.canvas._rect, track5.curM.canvas, track5.curM.canvas._rect, 10);
            if (isHit) {
                track1.curM.clear();
                track1.add(materialDie, 0).onStart(function(curM){
                    curM.x = 20;
                    curM.y = 166;
                    isEnd = true;
                });
            }
        }

        function tick(){
            score += 0.016;
            $score.innerHTML = parseInt(score);
            if (!isEnd) {
                check();
                stage.update();
                requestAnimationFrame(tick);
            }
        }

        var timer = requestAnimationFrame(tick);

        // stage.on('end', ()=>{
        //     console.log("stage end")
        //     clearInterval(timer)
        // })

        document.querySelector("body").addEventListener("click", function(e){

            // track1.pause();

            track1.curM.clear();
            
            var materialJump   = new Frames(data, "jump");

            track1
            .add(materialJump, 0)
            .onStart(function(curM){
                curM.x = 20;
                curM.y = 166;
                curM._hasJump = false
                console.log("onStart")
            })
            .onFrame(function(i, curM){
                // console.log(curM.y)
                if (!curM._hasJump) {
                    curM.y -= 4;
                    if (curM.y < 60) {
                        curM._hasJump = true;
                    }
                }

                if (curM._hasJump) {
                    curM.y += 4 ;
                    if (curM.y === 166) {
                        curM.clear();
                        var material111 = new Frames(data, "run", 10)
                            .onStart(function(curM){
                                curM.x = 20;
                                curM.y = 166;
                                // curM.flip = "horizintal";
                            })
                            .onFrame(function(curM){
                                // console.log("Frames");
                            });
                        track1.add(material111, 0);
                    }
                }
                
            });
        });

    }

    loadImage(["dinosaur.png", "road.png", "bird.png", "cloud.jpg", "thorns.png"].map(name => "img/" + name), (type, images) => {
        if (type === 'complete') {
            handleComplete(images);
        }
    });

})();