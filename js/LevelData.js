function LevelData() {
    var obj =
      {
          "size": 10,
          "level":
[
   {
       "id": "el11",
       "color": "brown",
       "x": 1,
       "y": 1,
       "type": "wall"
   },
   {
       "id": "el12",
       "color": "brown",
       "x": 1,
       "y": 2,
       "type": "wall"
   },
   {
       "id": "el13",
       "color": "brown",
       "x": 1,
       "y": 3,
       "type": "wall"
   },
   {
       "id": "el14",
       "color": "brown",
       "x": 1,
       "y": 4,
       "type": "wall"
   },
   {
       "id": "el04",
       "color": "brown",
       "x": 0,
       "y": 4,
       "type": "wall"
   },
   {
       "id": "el03",
       "color": "yellow",
       "x": 0,
       "y": 3,
       "type": "light"
   },
   {
       "id": "el02",
       "color": "gold",
       "x": 0,
       "y": 2,
       "type": "treasure"
   },
   {
       "id": "el24",
       "color": "red",
       "x": 2,
       "y": 4,
       "type": "enemy"
   },
   {
       "id": "el30",
       "color": "red",
       "x": 3,
       "y": 0,
       "type": "enemy"
   },
   {
       "id": "el22",
       "color": "blue",
       "x": 2,
       "y": 2,
       "type": "item2"
   },
   {
       "id": "el23",
       "color": "yellow",
       "x": 2,
       "y": 3,
       "type": "light"
   },
   {
       "id": "el40",
       "color": "yellow",
       "x": 4,
       "y": 0,
       "type": "light"
   },
   {
       "id": "el41",
       "color": "yellow",
       "x": 4,
       "y": 1,
       "type": "light"
   }
]
      }

    this.getData = function () {
        return obj
    }
}