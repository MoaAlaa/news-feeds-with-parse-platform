<template>
  <div class="home">
	   <b-row class="mb-3" v-for="feed in feeds" :key="feed.id">
            <b-col cols="2"></b-col>   
            <b-col cols="8" >
                <b-card :header="feed.attributes.title" >
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
      feeds: []
    };
  },
  mounted() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
        const NewsFeed = Parse.Object.extend('NewsFeed');

		const query = new Parse.Query(NewsFeed);

		query.descending('timestamp').find()
			.then(data => {
				this.feeds = data.map(d => {
					return {
						id: d.id,
						attributes: d.attributes,
					};
				});	
				console.log(data);
							
			});
    }
  }
}
</script>
