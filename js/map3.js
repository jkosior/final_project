document.addEventListener("DOMContentLoaded", function(){


var Dungeon = {
    map: null,
    //size of x and y of map, 256 because is made of tiles
    map_size: 64,
    rooms: [],
    // Room Generation
    RoomGenerator: function () {
        this.map = [];
        for (var x = 0; x < this.map_size; x++) {
            this.map[x] = [];
            for (var y = 0; y < this.map_size; y++) {
                this.map[x][y] = 0;
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
            room.x = Helpers.GetRandom(1, this.map_size - max_size - 1);
            room.y = Helpers.GetRandom(1, this.map_size - max_size - 1);
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

                this.map[pointB.x][pointB.y] = 1;
            }
        }

        //set room field as 1
        for (i = 0; i < room_count; i++) {
            var room = this.rooms[i];
            for (var x = room.x; x < room.x + room.w; x++) {
                for (var y = room.y; y < room.y + room.h; y++) {
                    this.map[x][y] = 1;
                }
            }
        }
        //draw walls around room
        for (var x = 0; x < this.map_size; x++) {
            for (var y = 0; y < this.map_size; y++) {
                if (this.map[x][y] == 1) {
                    for (var xWall = x - 1; xWall <= x + 1; xWall++) {
                        for (var yWall = y - 1; yWall <= y + 1; yWall++) {
                            if (this.map[xWall][yWall] == 0) {
                              this.map[xWall][yWall] = 2}
                        }
                    }
                }
            }
        }
    },
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

var Renderer = {
    canvas: null,
    ctx: null,
    size: 4096,
    scale: 0,
    Initialize: function () {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        this.ctx = canvas.getContext('2d');
        this.scale = this.canvas.width / Dungeon.map_size;
    },
    Update: function () {
      var images = {}
      function loadImage(name){
          ctx = document.getElementById('canvas').getContext('2d')
          images[name] = new Image();
          images[name].onload  = function(){
            ctx.drawImage(images[name],x,y)
          }
          images[name].src = 'images/' + name + '.png'
        }
        loadImage('lair0')
        loadImage('lair3')


        for (var y = 0; y < Dungeon.map_size; y++) {
            for (var x = 0; x < Dungeon.map_size; x++) {
                var tile = Dungeon.map[x][y];
                var patRoom = ctx.createPattern(images['lair3'], "repeat")
                var patWall = ctx.createPattern(images['lair0'], "repeat")
                if (tile == 0) this.ctx.fillStyle = 'black'; //void
                else if (tile == 1) this.ctx.fillStyle = patRoom  //rooms
                else this.ctx.fillStyle = patWall  //walls
                this.ctx.fillRect(x * this.scale, y * this.scale, this.scale, this.scale);

            }
        }
    }
};

var Helpers = {
    GetRandom: function (low, high) {
        return Math.floor((Math.random() * (high - low)) + low);
    }
};

Dungeon.RoomGenerator();
Renderer.Initialize();
Renderer.Update(Dungeon.map);
event.preventDefault()
});
