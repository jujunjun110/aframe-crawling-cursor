# Crawling Cursor

An A-Frame component to move cursor along object's surface.

**[DEMO PAGE (link)](https://jujunjun110.github.io/crawlingcursor/)**

![DEMO](demo.gif)

## API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| target   | selector(#id) of a cursor | null          |

## Usage

1.add `id` on `cursor` object.
```html
<a-cursor id="my-cursor"></a-cursor>
```

2.add `raycaster` component and `crawling-cursor` component with a target cursor selector on `camera` object. 
```html
<a-camera raycaster crawling-cursor="target: #my-cursor"></a-camera>
```

note: If you want some object to avoid intersection, add `ignore-ray` class to them.
```html 
<!-- cursor will not be along with this box -->
<a-box class="ignore-ray"></a-box>
```

## Installation 

### browser

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.3.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/jujunjun110/aframe-crawling-cursor/master/dist/aframe-crawling-cursor.min.js"></script>
</head>

<body>
  <a-scene>
    <a-cursor id="my-cursor"></a-cursor>
    <a-camera raycaster crawling-cursor="target: #my-cursor"></a-camera>
  </a-scene>
</body>
```

### npm 
Install via npm:

`$npm install aframe-crawling-cursor`

Then register and use. 

```javascript
require('aframe');
require('aframe-crawling-cursor');
```
