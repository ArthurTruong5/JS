Boolean(undefined)
// false

Boolean(null)
// false

Boolean("")
// false
// 0 converts to false

var a = 0;

// goes to the internet and looks for a value

if (a || a === 0) {
  console.log('Something is there')
}
