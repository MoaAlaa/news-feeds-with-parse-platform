<template>
  <div class="home">
	   <b-row class="mb-3" v-for="feed in feeds" :key="feed.id">
            <b-col cols="2"></b-col>   
            <b-col cols="8" >
                <b-card :header="feed.attributes.title" :footer="getPropperDate(feed.attributes.createdAt)">
                    {{ feed.attributes.body }}
                </b-card>
            </b-col>
        </b-row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
	  feeds: [],
	  query: {},
	  subscription: {},
    };
  },
  mounted() {
    this.query = new Parse.Query('NewsFeed');
    this.subscription = this.query.subscribe();
    this.fetchFeeds();
    this.loadNewFeeds();
  },
  methods: {
    fetchFeeds() {
      this.query.descending('timestamp').find()
        .then(data => {
          this.feeds = data.map(d => {
            return {
              id: d.id,
              attributes: d.attributes,
            };
          });                
      });
	},
	loadNewFeeds() {

		this.subscription.on('create', feed => {
			this.feeds.unshift({
				id: feed.id,
				attributes: feed.attributes,
			})
			
		});
		
	},
	getPropperDate(date) {
		return this.$moment(date).fromNow();
	}
  }
}
</script>
