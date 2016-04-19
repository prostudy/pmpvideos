app.controller("PMPVideosCtrl", function($scope,$sce, $http, $log, VideosService) {
	
	$scope.init = function(){
		 $scope.youtube = VideosService.getYoutube();
	      $scope.results = VideosService.getResults();
	      $scope.upcoming = VideosService.getUpcoming();
	      $scope.history = VideosService.getHistory();
	      $scope.playlist = true;
	    }

	    $scope.launch = function (id, title) {
	      VideosService.launchPlayer(id, title);
	      VideosService.archiveVideo(id, title);
	      VideosService.deleteVideo($scope.upcoming, id);
	      $log.info('Launched id:' + id + ' and title:' + title);
	    };

	    $scope.queue = function (id, title) {
	      VideosService.queueVideo(id, title);
	      VideosService.deleteVideo($scope.history, id);
	      $log.info('Queued id:' + id + ' and title:' + title);
	    };

	    $scope.delete = function (list, id) {
	      VideosService.deleteVideo(list, id);
	    };

	    $scope.search = function () {
	      $http.get('https://www.googleapis.com/youtube/v3/search', {
	        params: {
	          key: 'AIzaSyDeaiGgGsNjr9YG-qRKVHOkqYwQqOPFShM',
	          type: 'video',
	          maxResults: '8',
	          part: 'id,snippet',
	          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
	          q: this.query
	        }
	      })
	      .success( function (data) {
	        VideosService.listResults(data);
	        $log.info(data);
	      })
	      .error( function (e) {
	        $log.info('Search error');
	      });
	    }

	    $scope.tabulate = function (state) {
	      $scope.playlist = state;
	    }
	
	
    $scope.init();
});