# data
Generated with `/scripts/data/index.ts`

Starting position are maintained manually:
  * `mortal/starting_positions.json`
  * `vortex/starting_positions.json`

## utils
Transform game position to map position:
```js
// mortal
function getPosition(posX, posY) {
	const x = Math.round(posX * (4096 / 1016));
	const y = Math.round(posY * (3352 / 720));

	return JSON.stringify({ x, y }, null, 2);
}

// vortex
function getPosition(posX, posY) {
	const x = Math.round(posX * (3376 / 726));
	const y = Math.round(posY * (3868 / 720));

	return JSON.stringify({ x, y }, null, 2);
}
```
