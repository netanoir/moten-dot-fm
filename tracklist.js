let tracklist;

function preload() {
  tracklist = loadStrings('tracklist.txt');
}

function setup() {

  // gift canvas html structure
  let div_width = document.getElementById('tracks').offsetWidth;
  let div_height = document.getElementById('tracks').offsetHeight;
  let canvas = createCanvas(div_width, div_height);
  canvas.parent("tracks");
  canvas.id('moten-dot-fm-tracks');

  // place words on canvas
  for (let i = 0; i < tracklist.length; i += 1) {
    // visually render tracklist
    let s = createSpan(tracklist[i]);
    let fontsize = 15;
    let line_height = 17;
    
    // css
    s.class("track");
    s.position(random(0,30), (i * line_height) );
    s.style('text-transform', 'lowercase');
    s.style('font-size', fontsize + 'px');
    s.style('font-weight', 'bold');
    s.style('text-align', 'left');
    s.style('font-family', 'letter-gothic-std', 'monospace');
    s.style('text-transform', 'lowercase');
    s.style('color', 'black');
  }

}