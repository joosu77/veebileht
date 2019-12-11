function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function() {
    var table = document.getElementById("board");
    for( var i = 0; i < 10; i++ ){
        var row = document.createElement("tr");
        for( var j = 0; j < 19; j++ ){
            var col = document.createElement("td");
            col.innerHTML = ' ';
            col.setAttribute("id",i.toString(10)+':'+j.toString(10));
            row.appendChild(col);
        }
        table.appendChild(row);
    }
};
var button = 1;
document.addEventListener('keydown', function(event) {
    if (event.keyCode == 37) {
        button = 4;

    } else if (event.keyCode == 38) {
        button = 1;
    } else if (event.keyCode == 39) {
        button = 2;
    } else if (event.keyCode == 40) {
        button = 3;
    }
}, true);
async function game(){
    var X = 10;
    var Y = 19;
    var s = [[5,5]];
    var sdir = 0;
    var score = 0;
    var board = [['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X'],
                 ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ','B',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','X'],
                 ['X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X','X']];
    var over = 0;
    while (!over){
        var valik = 0;
        sdir = button-1;
        if (sdir == 0){
            var sqval = board[s[0][0]-1][s[0][1]];
            if (sqval == 'X' || sqval == 'S'){
                over = 1;
            } else if (sqval == 'B'){
                valik = 1;
                s.unshift([s[0][0]-1,s[0][1]]);
            } else {
                valik = 2;
                s.unshift([s[0][0]-1,s[0][1]]);
            }
        } else if (sdir == 1){
            var sqval = board[s[0][0]][s[0][1]+1];
            if (sqval == 'X' || sqval == 'S'){
                over = 1;
            } else if (sqval == 'B'){
                valik = 1;
                s.unshift([s[0][0],s[0][1]+1]);
            } else {
                valik = 2;
                s.unshift([s[0][0],s[0][1]+1]);
            }
        } else if (sdir == 2){
            var sqval = board[s[0][0]+1][s[0][1]];
            if (sqval == 'X' || sqval == 'S'){
                over = 1;
            } else if (sqval == 'B'){
                valik = 1;
                s.unshift([s[0][0]+1,s[0][1]]);
            } else {
                valik = 2;
                s.unshift([s[0][0]+1,s[0][1]]);
            }
        } else if (sdir == 3){
            var sqval = board[s[0][0]][s[0][1]-1];
            if (sqval == 'X' || sqval == 'S'){
                over = 1;
            } else if (sqval == 'B'){
                valik = 1;
                s.unshift([s[0][0],s[0][1]-1]);
            } else {
                valik = 2;
                s.unshift([s[0][0],s[0][1]-1]);
            }
        }
        if (valik == 1){
            score = score +1;
            board[s[0][0]][s[0][1]] = 'S';
            var a = Math.floor((Math.random()*9));
            var b = Math.floor((Math.random()*9));
            while (board[a+1][b+1]!=' '){
                a = Math.floor((Math.random()*9));
                b = Math.floor((Math.random()*9));
            }
            board[a+1][b+1]='B';
        } else if (valik == 2){
            board[s[0][0]][s[0][1]] = 'S';
            board[s[s.length-1][0]][s[s.length-1][1]] = ' ';
            s.pop();
        }
        for (var i=0;i<X;i++){
            for (var j=0;j<Y;j++){
                var el = document.getElementById(i.toString(10)+":"+j.toString(10));
                el.innerHTML = board[i][j];
            }
        }
        var sc = document.getElementById("score");
        sc.innerHTML = "Score: "+score.toString(10);
        await sleep(500);  
    }
}
