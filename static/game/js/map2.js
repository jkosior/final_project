var Dungeon= {
    data: [],
    //size of x and y of map, 256 because is made of tiles
    data_size: 128,
    rooms: [],
    // Room Generation
    RoomGenerator: function () {
        this.data = [];
        for (var x = 0; x < this.data_size; x++) {
            this.data[x] = [];
            for (var y = 0; y < this.data_size; y++) {
                this.data[x][y] = null;
            }
        }

        //Randomly generated number of rooms
        var room_count = Randomize.GetRandom(10, 20);
        //minimum and maximum size of the rooms
        var min_size = 5;
        var max_size = 15;

        for (var i = 0; i < room_count; i++) {
            var room = {};
            //place of the room in matrix
            room.x = Randomize.GetRandom(1, this.data_size - max_size - 1);
            room.y = Randomize.GetRandom(1, this.data_size - max_size - 1);
            //area of the room
            room.w = Randomize.GetRandom(min_size, max_size);
            room.h = Randomize.GetRandom(min_size, max_size);

            //check if rooms collide, if yes, decrement i
            if (this.DoesCollide(room)) {
                i--;
                continue;
            }
            //make place for wall
            room.w--;
            room.h--;

            //push room into matrix
            this.rooms.push(room);
        }

        this.SquashRooms();

        for (i = 0; i < room_count; i++) {
            var roomA = this.rooms[i];
            var roomB = this.FindClosestRoom(roomA);

            //pointA = vertices of one room
            pointA = {
                x: Randomize.GetRandom(roomA.x, roomA.x + roomA.w),
                y: Randomize.GetRandom(roomA.y, roomA.y + roomA.h)
            };
            //pointB = vertices of second room
            pointB = {
                x: Randomize.GetRandom(roomB.x, roomB.x + roomB.w),
                y: Randomize.GetRandom(roomB.y, roomB.y + roomB.h)
            };

            //check if they are not the same
            while ((pointB.x != pointA.x) || (pointB.y != pointA.y)) {
                if (pointB.x != pointA.x) {
                    if (pointB.x > pointA.x) pointB.x--;
                    else pointB.x++;
                } else if (pointB.y != pointA.y) {
                    if (pointB.y > pointA.y) pointB.y--;
                    else pointB.y++;
                }
                //
                this.data[pointB.x][pointB.y] = 1;
            }
        }

        //set room field as 1
        for (i = 0; i < room_count; i++) {
            var room = this.rooms[i];
            for (var x = room.x; x < room.x + room.w; x++) {
                for (var y = room.y; y < room.y + room.h; y++) {
                    this.data[x][y] = 1;
                }
            }
        }
        //draw walls around room
        for (var x = 0; x < this.data_size; x++) {
            for (var y = 0; y < this.data_size; y++) {
                if (this.data[x][y] == 1) {
                    for (var xWall = x-1; xWall <= x+1; xWall++) {
                        for (var yWall = y-1; yWall <= y+1; yWall++) {
                            if (this.data[xWall][yWall] == null) {
                              this.data[xWall][yWall] = 2}
                        }
                    }
                }
            }
        }
        return this.data
    },
    //Finds closest room algorithm A*
    FindClosestRoom: function (room) {
        var mid = {
            x: room.x + (room.w / 2),
            y: room.y + (room.h / 2)
        };
        var closest = null;
        var closest_distance = 1000;
        for (var i = 0; i < this.rooms.length; i++) {
            var check = this.rooms[i];
            if (check == room) continue;
            var check_mid = {
                x: check.x + (check.w / 2),
                y: check.y + (check.h / 2)
            };
            var distance = Math.min(Math.abs(mid.x - check_mid.x) - (room.w / 2) - (check.w / 2), Math.abs(mid.y - check_mid.y) - (room.h / 2) - (check.h / 2));
            if (distance < closest_distance) {
                closest_distance = distance;
                closest = check;
            }
        }
        return closest;
    },
    SquashRooms: function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < this.rooms.length; j++) {
                var room = this.rooms[j];
                while (true) {
                    var old_position = {
                        x: room.x,
                        y: room.y
                    };
                    if (room.x > 1) room.x--;
                    if (room.y > 1) room.y--;
                    if ((room.x == 1) && (room.y == 1)) break;
                    if (this.DoesCollide(room, j)) {
                        room.x = old_position.x;
                        room.y = old_position.y;
                        break;
                    }
                }
            }
        }
    },
    //check collision
    DoesCollide: function (room, ignore) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (i == ignore) continue;
            var check = this.rooms[i];
            if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
        }

        return false;

    }



}

var Randomize = {
    GetRandom: function (low, high) {
        return Math.floor((Math.random() * (high - low)) + low);
    }
};


var game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    $.ajax({
      url:"weapons/?format=json",
      data:{},
      type:'GET',
      dataType:'json',
      success: function(json){

      },
    })

    //  tiles are 16x16 each
    game.load.image('map_sheet', '../../../static/game/images/ice0.png');
    // game.load.image('2', '../../../static/game/images/lair0.png');
    game.load.spritesheet("player_sheet", '../../../static/game/images/male_light.png',32,32  , 64);
    game.load.image("orc", '../../../static/game/images/orc_m.png');

}

var cursors;

function create() {
    data = Dungeon.RoomGenerator();
    matrix_stringified_lines = []
    for (var d = 0; d < data.length; d++){
      new_line = data[d].toString() + '\n';
      matrix_stringified_lines.push(new_line)
    }
    matrix_stringified_1 = matrix_stringified_lines.toString();
    matrix_stringified_all = ','+ matrix_stringified_1
    game.cache.addTilemap('map', null, matrix_stringified_all, Phaser.Tilemap.CSV);
    map = game.add.tilemap('map', 16, 16);
    map.addTilesetImage('map_sheet')
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(2,2)
    // layer.debug = true

    p = game.add.sprite(64,64, "player_sheet");
    // p.scale.setTo(0.5,0.5)
    p.animations.add('left',[0,1,2,3],10, true);
    p.animations.add('right', [32,33,34,35], 10, true);
    p.animations.add('up',[16,17,18,19],10,true);
    p.animations.add('down',[48,49,50,51], 10, true);
    o = game.add.sprite(128,128,"orc");
    o.scale.setTo(0.5,0.5)


    game.physics.arcade.enable(p, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(o, Phaser.Physics.ARCADE);
    p.body.collideWorldBounds = true;
    o.body.collideWorldBounds = true;

    game.camera.follow(p);
    // o.body.on.collide = new Phaser.Signal();
    // o.body.on.collide.add(fight, this)
    cursors = game.input.keyboard.createCursorKeys();

}
function topdownTightFollow() {
    game.camera.follow(p, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    style = 'STYLE_TOPDOWN_TIGHT';
}
// function fight(){
//   o.
// }

function update() {


p.body.velocity.x = 0
p.body.velocity.y = 0

game.physics.arcade.collide(p, layer)
game.physics.arcade.collide(p, o)
game.physics.arcade.collide(o, layer)



    if (cursors.left.isDown)
    {
        p.body.velocity.x = -128;
        p.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 128;
        p.animations.play('right');
    }

    else if (cursors.up.isDown)
    {
        p.body.velocity.y = -128;
        p.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        p.body.velocity.y = 128;
        p.animations.play('down');
    }
    else{
        p.animations.stop();
        p.frame = 4;
    }

}
