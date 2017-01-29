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
            console.warn("Please set a valid target id.");
            return;
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
