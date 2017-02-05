/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* global AFRAME */

	if (typeof AFRAME === 'undefined') {
	    throw new Error('Component attempted to register before AFRAME was available.');
	}

	/**
	 * Crawling Cursor component for A-Frame.
	 */
	AFRAME.registerComponent('crawling-cursor', {
	    dependencies: ['raycaster'],
	    schema: {
	        target: {
	            type: "selector"
	        }
	    },

	    multiple: false,

	    init: function() {
	        var el = this.el;
	        var data = this.data;

	        if (data.target === null) {
	            var cursor = document.querySelector("a-cursor");

	            if (cursor === null) {
	                console.warn("Please put a-cursor in a document");
	                return;
	            }

	            data.target = cursor;
	        }

	        el.addEventListener("raycaster-intersection", function(e) {

	            var intersection = getNearestIntersection(e.detail.intersections);
	            if (!intersection) {return;}

	            // a matrix which represents item's movement, rotation and scale on global world
	            var mat = intersection.object.matrixWorld;
	            // remove parallel movement from the matrix
	            mat.setPosition(new THREE.Vector3(0, 0, 0));

	            // change local normal into global normal
	            var global_normal = intersection.face.normal.clone().applyMatrix4(mat).normalize();

	            // look at target coordinate = intersection coordinate + global normal vector
	            var lookAtTarget = new THREE.Vector3().addVectors(intersection.point, global_normal);
	            data.target.object3D.lookAt(lookAtTarget);

	            // cursor coordinate = intersection coordinate + normal vector * 0.05(hover 5cm above intersection point)
	            var cursorPosition = new THREE.Vector3().addVectors(intersection.point, global_normal.multiplyScalar(0.05));
	            data.target.setAttribute("position", cursorPosition);

	            function getNearestIntersection(intersections) {
	                for (var i = 0, l = intersections.length; i < l; i++) {

	                    // ignore cursor itself to avoid flicker && ignore "ignore-ray" class
	                    if (data.target === intersections[i].object.el || intersections[i].object.el.classList.contains("ignore-ray")) {continue;}
	                    return intersections[i];
	                }
	                return null;
	            }
	        });
	    }
	});


/***/ }
/******/ ]);