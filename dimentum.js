Momentum.registerPlugin('dimentum', function(options) {
    options = _.extend({}, options, {
        duration: { in : 400,
            out: 300
        },
        easing: [600, 20]
    });

    return {
        insertElement: function(node, next) {
            const $node = $(node);
            
            var dementum = { inX: 0, inY: 0, inScaleX: [1, 0.8], inScaleY: [1, 0.8] };
            
            if ($node.data('dimentum'))
                dementum = _.extend({}, dementum, $node.data('dimentum'));
            
            if (typeof(dementum.inX) == 'number') dementum.inX = (dementum.inX * 100)+'%';
            if (typeof(dementum.inY) == 'number') dementum.inY = (dementum.inY * 100)+'%';

            $node.css('opacity', 0).insertBefore(next).velocity({
                scaleY: dementum.inScaleX,
                scaleX: dementum.inScaleY,
                translateX: [0, dementum.inX],
                translateY: [0, dementum.inY]
            }, {
                easing: options.easing,
                duration: options.duration.in,
                queue: false
            }).velocity('fadeIn', {
                duration: options.duration.in - 200,
                queue: false
            });
        },

        moveElement: function(node, next) {
            this.removeElement(node);
            this.insertElement(node, next);
        },

        removeElement: function(node) {
            const $node = $(node);
            
            var dementum = { outX: 0, outY: 0, outScaleX: [0.8, 1], outScaleY: [0.8, 1] };
            
            if ($node.data('dimentum'))
                dementum = _.extend({}, dementum, $node.data('dimentum'));
            
            if (typeof(dementum.outX) == 'number') dementum.outX = (dementum.outX * 100)+'%';
            if (typeof(dementum.outY) == 'number') dementum.outY = (dementum.outY * 100)+'%';

            $node.velocity({
                scaleX: dementum.outScaleX,
                scaleY: dementum.outScaleY,
                translateX: [dementum.outX],
                translateY: [dementum.outY]
            }, {
                duration: options.duration.out,
                easing: 'ease',
                queue: false,
                complete: function() {
                    return $node.remove();
                }
            }).velocity('fadeOut', {
                queue: false,
                duration: options.duration.out - 200
            });
        }
    };
});