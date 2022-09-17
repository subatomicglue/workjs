
// usage:
// let Work = require( "./work.js" );
// let work = new Work();
// work.push( async () => { await getFiles(); } );
// work.push( async () => { await getFiles(); } );
// work.push( async () => { await getFiles(); } );
// work.push( async () => { await getFiles(); } );
// work.process( 2 );
module.exports = function () {
  this.work = [];
  this.push = ( func ) => this.work.push( func )
  Object.defineProperty(this, "length", {
    get: function () {
      return this.work.length;
    }
  });
  this.process = async (batch_size = 4) => {
    let promise = []
    console.log( `processing ${this.length} (in batches of ${batch_size})...` );
    for (let w = 0; w < this.work.length; ) {
      //console.log( "work loop", w, batch_size, this.work.length )
      for (let x = 0; x < batch_size; ++x) {
        //console.log( "batch loop", x )
        try {
          if (w < this.work.length) { promise.push( this.work[w]() ); ++w; }
        } catch (err) {
          console.log( "error in work.process", err )
        }
      }
      //console.log( "after work loop", w, batch_size, this.work.length )
      try {
        await Promise.all( promise );
        promise = [];
      } catch (err) {
        console.log( "ERROR in work.process", err)
      }
      //console.log( "after work loop", w, batch_size, this.work.length )
    }
    this.work = [];
    console.log( "...done" );
  }
}
