# Crawling Cursor

An A-Frame component to move cursor along object's surface.

**[DEMO PAGE (link)](https://jujunjun110.github.io/aframe-crawling-cursor/basic/)**

![DEMO](demo.gif)

## API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| target   | selector(#id) of a cursor | null          |
| offset   | distance cursor hovers over intersection point | 0.05 (meters, or 5cm) |

## Usage

1.put `a-cursor` object in a document.
```html
<a-cursor></a-cursor>
```

2.set `raycaster` and `crawling-cursor` component on `camera` object.
```html
<a-camera raycaster crawling-cursor></a-camera>
```

### options

If you want a entity to be a cursor, you can set id on 'target' property.
```html
<a-camera raycaster crawling-cursor="target: #my-cursor"></a-camera>
<a-ring id="my-cursor"></a-ring>
```

If you want some object to avoid intersection, add `ignore-ray` class to them.
```html 
<!-- cursor will not be along with this box -->
<a-box class="ignore-ray"></a-box>
```

## Installation 

### browser

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.7.0/aframe.min.js"></script>
  <script src="https://cdn.rawgit.com/jujunjun110/aframe-crawling-cursor/master/dist/aframe-crawling-cursor.min.js"></script>
</head>

<body>
  <a-scene>
    <a-cursor></a-cursor>
    <a-camera raycaster crawling-cursor></a-camera>
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
