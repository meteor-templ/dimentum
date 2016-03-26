Momentum.registerPlugin('dimentum', function(options) {
    options = _.extend({}, options, {
        duration: {
            in : 250,
            out: 250
        }
    });

    return {
        insertElement: function(node, next) {
            const $node = $(node);
            
            var dimentum = { inX: 0, inY: 0, inScaleX: [1, 0.8], inScaleY: [1, 0.8], inEasing: 'ease' };
            
            if ($node.data('dimentum'))
                dimentum = _.extend({}, dimentum, $node.data('dimentum'));
            
            if (typeof(dimentum.inX) == 'number') dimentum.inX = (dimentum.inX * 100)+'%';
            if (typeof(dimentum.inY) == 'number') dimentum.inY = (dimentum.inY * 100)+'%';
            
            $node.css('opacity', 0).insertBefore(next).velocity({
                scaleY: dimentum.inScaleX,
                scaleX: dimentum.inScaleY,
                translateX: [0, dimentum.inX],
                translateY: [0, dimentum.inY]
            }, {
                easing: dimentum.inEasing,
                duration: options.duration.in,
                queue: false
            }).velocity('fadeIn', {
                duration: options.duration.in,
                queue: false
            });
        },

        moveElement: function(node, next) {
            this.removeElement(node);
            this.insertElement(node, next);
        },
        
        removeElement: function(node) {
            const $node = $(node);
            
            var dimentum = { outX: 0, outY: 0, outScaleX: [0.8, 1], outScaleY: [0.8, 1], outEasing: 'ease' };
            
            if ($node.data('dimentum'))
                dimentum = _.extend({}, dimentum, $node.data('dimentum'));
            
            if (typeof(dimentum.outX) == 'number') dimentum.outX = (dimentum.outX * 100)+'%';
            if (typeof(dimentum.outY) == 'number') dimentum.outY = (dimentum.outY * 100)+'%';

            $node.velocity({
                scaleX: dimentum.outScaleX,
                scaleY: dimentum.outScaleY,
                translateX: [dimentum.outX],
                translateY: [dimentum.outY]
            }, {
                duration: options.duration.out,
                easing:  dimentum.outEasing,
                queue: false,
                complete: function() {
                    return $node.remove();
                }
            }).velocity('fadeOut', {
                queue: false,
                duration: options.duration.out
            });
        }
    };
});