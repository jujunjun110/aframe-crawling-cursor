# Crawling Cursor

A component to move cursor along object's surface for A-Frame.

[DEMO (github pages)](http://link-to-github-page.com)

![DEMO](demo.gif)


# Dependencies
- [look-at](https://github.com/ngokevin/kframe/tree/master/components/look-at/) (now incluede in [kframe](https://github.com/ngokevin/kframe))

# Usage

1.add `id` and `look-at` component on cursor object.
```html
<a-ring cursor id="my-cursor" look-at="0 0 0" ></a-ring>
```

2.add `raycaster` component and `crawling-cursor` component with target cursor selector on camera object. 
```html
<a-camera raycaster crawling-cursor="target: #my-cursor"></a-camera>
```

# Installation 

## browser

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/kframe/master/dist/kframe.min.js"></script>
  <script src="https://rawgit.com/jujunjun110/aframe-crawling-cursor/master/dist/aframe-crawling-cursor.min.js"></script>
</head>

<body>
  <a-scene>
    <a-ring cursor id="my-cursor" look-at="0 0 0" ></a-ring>
    <a-camera raycaster crawling-cursor="target: #my-cursor"></a-camera>
  </a-scene>
</body>
```

## npm 
Install via npm.

`npm install aframe-crawling-cursor`

Then register and use. (Do not forget to install k-frame.)
```javascript
require('aframe');
require('k-frame');
require('aframe-crawling-cursor');
```
