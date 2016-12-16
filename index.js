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

    /**
     * Set if component needs multiple instancing.
     */
    multiple: false,

    /**
     * Called once when component is attached. Generally for initial setup.
     */
    init: function() {
        var el = this.el;
        var data = this.data;

        el.addEventListener("raycaster-intersection", function(e) {

            var intersection = getNearestIntersection(e.detail.intersections);
            if (!intersection) {return;}

            // look at target coordinate = intersection coordinate + normal vector
            var lookAtTarget = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal);
            data.target.object3D.lookAt(lookAtTarget);

            // cursor coordinate = intersection coordinate + normal vector * 0.05(hover 5cm above intersection point)
            var cursorPosition = new THREE.Vector3().addVectors(intersection.point, intersection.face.normal.multiplyScalar(0.05));
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
    },

    /**
     * Called when component is attached and when component data changes.
     * Generally modifies the entity based on the data.
     */
    update: function(oldData) {},

    /**
     * Called when a component is removed (e.g., via removeAttribute).
     * Generally undoes all modifications to the entity.
     */
    remove: function() {},

    /**
     * Called on each scene tick.
     */
    // tick: function (t) { },

    /**
     * Called when entity pauses.
     * Use to stop or remove any dynamic or background behavior such as events.
     */
    pause: function() {},

    /**
     * Called when entity resumes.
     * Use to continue or add any dynamic or background behavior such as events.
     */
    play: function() {}
});
