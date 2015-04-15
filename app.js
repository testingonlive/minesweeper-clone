function Cell(){
    this._isMine = false;
    this._isDisplayed = false;
}

Cell.prototype.isMine = function(){
    return this._isMine;
}

Cell.prototype.setAsMine = function(){
    this._isMine = true;
}

Cell.prototype.setVal = function( val ){
    this.value = val;
}

Cell.prototype.getVal = function(){
    return this.value;
}

Cell.prototype.isDisplayed = function(){
    return this._isDisplayed;
}

Cell.prototype.setDisplay = function( bool ){
    this._isDisplayed = bool;
}

Cell.prototype.getCoords = function(){
    return this._coords;
}   

Cell.prototype.setCoords = function( col, row ){
    this._coords = [ col, row ];
}

var dim = 8,
    noMines = 10,
    cellArr = new Array( Math.pow( dim, 2 ) ),
    cellLen = cellArr.length,
    mineArr = new Array( noMines ),
    mineLen = mineArr.length; 
    

function getRand( max, arr ){
    var _rand = 0 | Math.random() * max;
    return ~arr.indexOf( _rand ) ? getRand.apply( this, arguments ) : _rand;
}

function chunkArr( arr, size ){
    var _temp = [];
    
    while( arr.length ) _temp.push( arr.splice( 0, size ) );
    return _temp; 
}

function setCoords( arr ){
    arr.forEach(function( row, rowInd ){
        row.forEach(function( cell, colInd ){
            cell.setCoords( colInd, rowInd );
        });
    });    
}

function getNeighbours( cell, arr ){
    var _coords = cell.getCoords(),
        col = _coords[ 0 ],
        row = _coords[ 1 ];
    
    return [
        // top
        arr[ row - 1 ] && arr[ row - 1][ col - 1 ],
        arr[ row - 1 ] && arr[ row  - 1 ][ col ],
        arr[ row - 1 ] && arr[ row  - 1 ][ col + 1 ],
        
        // middle
        arr[ row ] && arr[ row ][ col - 1 ],
        arr[ row ] && arr[ row ][ col + 1 ],
        
        // bottom
        arr[ row + 1 ] && arr[ row + 1 ][ col - 1 ],
        arr[ row + 1 ] && arr[ row + 1 ][ col ],
        arr[ row + 1 ] && arr[ row + 1 ][ col + 1 ]
    ]    
}

function checkZero( cell, arr ){  
    getNeighbours( cell, arr ).forEach(function( elm ){
        if ( elm && elm.getVal() == 0 && !elm.isDisplayed() ){
            elm.setDisplay( true );
            checkZero( elm, arr );
        }
    });
}
  
while ( cellLen-- ) cellArr[ cellLen ] = new Cell();    
while ( mineLen-- ) mineArr[ mineLen ] = getRand( Math.pow( dim, 2 ), mineArr );

mineArr.forEach( function( elm ){
    cellArr[ elm ].setAsMine();
});

var chuncked = chunkArr( cellArr, dim );

setCoords( chuncked );

chuncked.forEach( function( row, rowInd, rowArr ){
    row.forEach( function( cell, cellInd, cellArr ){
      
        if ( cell.isMine() ) return cell.setVal( '*' );
        
        var _val = getNeighbours( cell, rowArr ).reduce(function( pre, cur ){
            return ( cur && cur.isMine() ) ? pre + 1 : pre;
        }, 0 );
               
        cell.setVal( '' + _val );
    });
});



chuncked.forEach( function( elm ){
        
    console.log( 
        elm.map(function( cell ){
            return cell.getVal();
        })
    );  
    
});

chuncked.forEach( function( elm ){
        
    console.log(
        elm.map(function( cell ){
            return ( cell.isDisplayed() ) ? ' ' : '#';
        })
    
    );
    
});



