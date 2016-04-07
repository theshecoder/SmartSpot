(function(exports) 
{
	function setStatus(text) {
		if (text != '') {
			$('#status').html(
				'<div class="progress progress-striped active">' +
				'<div class="progress-bar" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">' +
			    text +
			 	'</div>' +
				'</div>'
			);
		} else {
			$('#status').html('');
		}
	}
	
	var getArtistID = function(artist, callback) {
		//Getting Artist ID
		console.log('search for ' + artist);
		var url = 'https://api.spotify.com/v1/search?type=artist&limit=1&q=' + encodeURIComponent('artist:"'+artist+'"');
		$.ajax(url, {
			dataType: 'json',
			success: function(r) {
				console.log("got artist", r);
				callback({
					artist: r.artists.items.map(function(item) {
						console.log("Artists id: " + item.id); 
						var artistID = item.id;
						
						
						
						//Getting Related Artists
						var relatedArtistsURL = "https://api.spotify.com/v1/artists/" + artistID + "/related-artists";
						$.ajax(url, {
							dataType: 'json',
							success: function(relatedArtists) {
								console.log("Related artists: " + relatedArtists);
								callback({
										relatedArtistsArray: relatedArtists.items.map(function(relArtItem)
										 {
											console.log(item.artists);
										}
								});
									
							}
						}
						
							
						})
				});
			},
			error: function(r) {
				callback({
					artist: artist,
					tracks: []
				});
			}
		});
	}
	
	var doLogin = function(callback) {
		var url = 'https://accounts.spotify.com/authorize?client_id=' + client_id +
			'&response_type=token' +
			'&scope=playlist-read-private%20playlist-modify%20playlist-modify-private' +
			'&redirect_uri=' + encodeURIComponent(redirect_uri);
		localStorage.setItem('createplaylist-tracks', JSON.stringify(g_tracks));
		localStorage.setItem('createplaylist-name', g_name);
		var w = window.open(url, 'asdf', 'WIDTH=400,HEIGHT=500');
	}
	
	exports.startApp = function() {
		setStatus('');
		console.log('start app.');
		$('#start').click(function() {
			//doLogin(function() {});
			getArtistID($('#alltext').val(), function(result){
				console.log("result is: " + result);
				}); 
		})
	}
	
	})(window);
	