$(document).ready(function(){

	$('#search').on('click', results);
	$('#result').hide();

	function results(event) {
		profile();
		repos(); 
	}

	function profile (event) {
		var name = $('#githubName').val();
		$('#result').show();
		$.getJSON('https:/api.github.com/users/' + name, function(data){
			console.log(data);
			$('#location').text(data.location);
			$('#name').text(data.name);
			$('#username').text(data.login);
			$('#followers').text(data.followers);
			$('#followers').attr('href', 'https://github.com/' + name + '/followers');
			$('#following').text(data.following);
			$('#following').attr('href', 'https://github.com/' + name + '/following');
			$('#starred').attr('href', 'https://github.com/stars/' + name);
			$('#avatar').attr('src', data.avatar_url);
			$('#blog_url').attr('href', data.blog);
			$('#github_url').attr('href', data.html_url);
		})
	}

	$('#githubName').on("keypress", function (e) {
		if (e.which === 13) {
			results();
			e.preventDefault();
			$('#githubName').attr('value', '');
		}s
	});

	function repos(argument){
		var name = $('#githubName').val();
		$.getJSON('https:/api.github.com/users/' + name + '/repos', function(repos){
			$('#repos').empty();
			console.log(repos);
			repos.forEach(function(repo) {
				$('#repos').append('<li><a href="' + repo.html_url + '">' + repo.name + '</a></li>');
			})
		})
	}


});
