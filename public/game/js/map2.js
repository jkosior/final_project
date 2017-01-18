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
        var room_count = Helpers.GetRandom(10, 20);
        //minimum and maximum size of the rooms
        var min_size = 5;
        var max_size = 15;

        for (var i = 0; i < room_count; i++) {
            var room = {};
            //place of the room in matrix
            room.x = Helpers.GetRandom(1, this.data_size - max_size - 1);
            room.y = Helpers.GetRandom(1, this.data_size - max_size - 1);
            //area of the room
            room.w = Helpers.GetRandom(min_size, max_size);
            room.h = Helpers.GetRandom(min_size, max_size);

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
                x: Helpers.GetRandom(roomA.x, roomA.x + roomA.w),
                y: Helpers.GetRandom(roomA.y, roomA.y + roomA.h)
            };
            //pointB = vertices of second room
            pointB = {
                x: Helpers.GetRandom(roomB.x, roomB.x + roomB.w),
                y: Helpers.GetRandom(roomB.y, roomB.y + roomB.h)
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
    //Finds closest room
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
    DoesCollide: function (room, ignore) {
        for (var i = 0; i < this.rooms.length; i++) {
            if (i == ignore) continue;
            var check = this.rooms[i];
            if (!((room.x + room.w < check.x) || (room.x > check.x + check.w) || (room.y + room.h < check.y) || (room.y > check.y + check.h))) return true;
        }

        return false;

    }



}


var Helpers = {
    GetRandom: function (low, high) {
        return Math.floor((Math.random() * (high - low)) + low);
    }
};


var game = new Phaser.Game(1600, 1200, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    //  tiles are 16x16 each
    game.load.image('map_sheet', '../../../static/game/images/lair0.png');
    // game.load.image('2', '../../../static/game/images/lair0.png');
    game.load.image("player", '../../../static/game/images/demigod_m.png');
    game.load.image("orc", '../../../static/game/images/orc_m.png');

}

var cursors;

function create() {
    //  Create some map data dynamically
    //  Map size is 128x128 tiles

    data = Dungeon.RoomGenerator();
    matrix_stringified_lines = []
    for (var d = 0; d < data.length; d++){
      new_line = data[d].toString() + '\n';
      matrix_stringified_lines.push(new_line)
    }
    // console.log(matrix_stringified_lines);
    matrix_stringified_all = matrix_stringified_lines.toString();
    // console.log(matrix_stringified_all);


    //  Add data to the cache
    game.cache.addTilemap('map', null, matrix_stringified_all, Phaser.Tilemap.CSV);

    //  Create our map (the 16x16 is the tile size)

    map = game.add.tilemap('map', 16, 16);
    //  'tiles' = cache image key, 16x16 = tile size


    // map.addTilesetImage('1', '1', 32,32 )
    map.addTilesetImage('map_sheet')


    //  0 is important
    layer = map.createLayer(0);
    layer.scale = {x:2,y:2};

    //  Scroll it


    l_data = layer.layer.data;
    l_data[0][1].setCollision(true,true,true,true);
    console.log(l_data[0][1]);

    for(var x = 0; x<l_data.lenght; x++){
      for (var y; y<l_data[x].length; y++){
        if(l_data[x][y].index == 21){
          console.log(l_data[x][y]);
        }
      }
    }
    p = game.add.sprite(64,64, "player");
    p.scale.setTo(1,1)
    o = game.add.sprite(128,128,"orc");
    o.scale.setTo(1,1)
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(p);
    game.physics.arcade.enable(o);
    p.body.collideWorldBounds = true;
    o.body.collideWorldBounds = true;

    game.camera.follow(p);

    cursors = game.input.keyboard.createCursorKeys();
    layer.resizeWorld();
}
function topdownTightFollow() {
    game.camera.follow(p, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
    style = 'STYLE_TOPDOWN_TIGHT';
}
function update() {


game.physics.arcade.collide(p,l_data[0][1], collisionCallback, processCallback, this)
game.physics.arcade.collide(p,o)
p.body.velocity.x = 0
p.body.velocity.y = 0

    if (cursors.left.isDown)
    {
        p.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
        p.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
        p.body.velocity.y = -200;
    }
    else if (cursors.down.isDown)
    {
        p.body.velocity.y = 200;
    }

}
