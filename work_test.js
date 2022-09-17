#!/usr/bin/env node


let Work = require( './work' );
let work = new Work();

let work2 = new Work();

async function go() {
  if (work.length != 0) console.log( "error work.length != 0", work.length );
  work.push( async () => new Promise( (rs, rj) => rs() ) );
  work.push( async () => new Promise( (rs, rj) => rs() ) );
  work.push( async () => new Promise( (rs, rj) => rs() ) );
  work.push( async () => new Promise( (rs, rj) => rs() ) );
  if (work.length != 4) console.log( "error work.length != 4", work.length );
}
async function go1() {
  if (work.length != 4) console.log( "error work.length != 4", work.length );
  await work.process( 4 );
  if (work.length != 0) console.log( "error work.length != 0", work.length );
}

async function go2() {
  if (work2.length != 0) console.log( "error work2.length != 0", work2.length );
  work2.push( async () => new Promise( (rs, rj) => rs() ) );
  work2.push( async () => new Promise( (rs, rj) => rs() ) );
  work2.push( async () => new Promise( (rs, rj) => rs() ) );
  work2.push( async () => new Promise( (rs, rj) => rs() ) );
  if (work2.length != 4) console.log( "error work2.length != 4", work2.length );

  await work2.process( 4 );
  if (work2.length != 0) console.log( "error work2.length != 0", work2.length );
}


async function go3() {
  await go();
  await go2();
  await go1();
}
go3();

