if (Meteor.isClient) {

	Router.configure({
		layoutTemplate: 'content',
		//loadingTemplate: 'loading',
		before: function(){
			//NProgress.start()
		},
		after: function(){
			//NProgress.done()
			//GAnalytics.pageview()
		}
	});

	Router.map(function() {
	  	this.route('home', {path: '/'});
		this.route('map', { 
		  path: '/map/:name',
		  waitOn: function() { return [ Meteor.subscribe("maps"), Meteor.subscribe("figures", this.params.name) ] },
		  data: function() { return this.params.name }
		});
	})
	
}