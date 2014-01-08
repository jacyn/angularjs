'use strict';

$(document).ready(function() {
    var socket = io.connect('http://ame32.wyrls.net:8114');
    var container = $('#status-container');
    socket.emit('openfile','mervin');
    socket.on('new-data', function(data) {
      var newItem = $('<div><span class=\"label label-danger\" style=\"width: 100%\">' + data.value + '</span></div>');
			container.append(newItem);
			container.animate({'scrollTop': container[0].scrollHeight}, 'fast');
		});
	});
