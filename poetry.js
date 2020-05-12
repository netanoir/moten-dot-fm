/* concrete poetry 
based off tracks played in
free jazz: the realistic spot
a class taught by fred moten 
at zoom university
formerly known as n*w y*rk un*v*rs*ty et. al.
citations & acknowledgements at end of code ~
*/

let tracklist;
let audio_elem;
let xspeeds = [];
let yspeeds = [];

function preload() {
  tracklist = loadStrings('tracklist.txt');
  mix = loadSound('mix/Dave Holland Quartet Conference of the Bird.mp3');
}

function setup() {
  // gift canvas html structure
  let div_width = document.getElementById('sketch').offsetWidth;
  let div_height = document.getElementById('sketch').offsetHeight;
  let canvas = createCanvas(div_width, div_height);
  canvas.parent("sketch");
  canvas.id('moten-dot-fm');

  // connect canvas to sound
  // canvas.mouseClicked(togglePlay);
  fft = new p5.FFT();

  // place words on canvas
  /* start text processing */
  // initialize track array
  let track_titles = [];

  for (let i = 0; i < tracklist.length; i += 1) {
    // separate artist from track title
    let separate_artist_from_track = tracklist[i].split("-");
    // gently place track titles in array
    track_titles.push(separate_artist_from_track[1]);
  }

  // borrow words from song titles
  for (let i = 0; i < track_titles.length; i += 1) {
    let words = track_titles[i].split(" ");
    /* end text processing */

    // visually render words
    for (let j = 0; j < words.length; j += 1) {
      let s = createSpan(words[j]);
      s.parent("sketch");
      s.class("move");
      s.id("poem" + j); // create ids to individually style words
      s.position(random(width), random(height));
      s.style('text-transform', 'lowercase');
      xspeeds.push(random(-2, 2));
      yspeeds.push(random(-2, 2));

      // refine aesthetics w/ css
      let fontsize = random(10, 50);
      s.style('font-size', fontsize + 'px');
      s.style('font-weight', 'bold');
      s.style('text-align', 'left');
      s.style('font-family', 'letter-gothic-std', 'monospace');
      s.style('text-transform', 'lowercase');
      // s.style('color', '#c1bd2f');
    }
  }
  // hack double audio outside p5
  let mute = document.getElementById("the-realistic-spot");
  mute.muted = true;

}

function draw() {

  // hold all elements in move class
  let elems = selectAll(".move");
  // get sound data
  fft.analyze();
  let bump = fft.getEnergy("lowMid");
  // iterate through all elements
  for (let i = 0; i < elems.length; i += 1) {
    let pos = elems[i].position();
    if (pos.x > width || pos.y > height) {
      xspeeds[i] *= -1;
      yspeeds[i] *= -1;
    }
    // move words according to sound
    let soundX = map(xspeeds[i], 0, 255, 0, bump);
    let soundY = map(yspeeds[i], 0, 255, 0, bump);
    elems[i].position(pos.x + soundX, pos.y + soundY);
  }
  
}

function togglePlay() {
  if (mix.isPlaying()) {
    mix.pause();
  } else {
    mix.loop();
  }
}

/* 
citations & acknowledgements

code visualizing text inspired from
computer texts homage by allison parrish
https://editor.p5js.org/allison.parrish/sketches/BJSGiUl67 

debugging help from friends
char stiles
patrick steppan
*/