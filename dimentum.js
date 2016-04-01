var vars = {'left':'X','right':'X','top':'Y','bottom':'Y'};
Momentum.registerPlugin('dimentum', function(options) {
    return {
        insertElement: function(node, next) {
            const $node = $(node);
            var dimentum = $node.data('dimentum');
            if (dimentum) {
                $node
                    .css('opacity', 0)
                    .css('transformOrigin', dimentum)
                    .insertBefore(next)
                    .velocity({
                        ['scale'+vars[dimentum]]: [1,0],
                        opacity: 1
                    }, {
                        duration: 150
                    });
            } else {
                $node
                    .css('opacity', 0)
                    .insertBefore(next)
                    .velocity('fadeIn');
            }
        },

        moveElement: function(node, next) {
            this.removeElement(node);
            this.insertElement(node, next);
        },
        
        removeElement: function(node) {
            const $node = $(node);
            var dimentum = $node.data('dimentum');
            if (dimentum) {
                $node.velocity({
                    ['scale'+vars[dimentum]]: [0,1],
                    opacity: 0
                }, {
                    queue: false,
                    complete: function() {
                        return $node.remove();
                    },
                    duration: 150
                });
            } else {
                $node.velocity('fadeOut', {
                    complete: function() {
                        return $node.remove();
                    },
                    duration: 100
                });
            }
        }
    };
});