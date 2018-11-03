<template>
    <div>
        <b-row>
            <b-col cols="2"></b-col>   
            <b-col cols="8">
                <b-card header="Add New Feed">
                    <b-form>
                        <b-form-group id="title" label-for="title">
                            <b-form-input id="title" type="text" v-model="feed.title" required placeholder="Feed Title"></b-form-input>
                        </b-form-group>
                        
                        <b-form-group id="body" label-for="body">
                            <b-form-textarea id="body" v-model="feed.body" placeholder="Write The Feed" :rows="8"></b-form-textarea>
                        </b-form-group>
                        
                        
                        <b-button type="button" @click="createNewFeed" variant="primary">Feed It</b-button>
                    </b-form>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    name: 'CreateFeed',
    data() {
        return {
            feed: {
                title: '',
                body: ''
            }
        };
    },
    methods: {
        createNewFeed() {
            const NewsFeed = Parse.Object.extend('NewsFeed');

            const newsFeed = new NewsFeed();

            newsFeed.set('title', this.feed.title);
            newsFeed.set('body', this.feed.body);

            newsFeed.save()
            .then(data => {
                console.log(data);
                this.feed = {
                    title: '',
                    body: ''
                };
            })
            .catch(error => {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and message.
                alert('Failed to create new object, with error code: ' + error.message);
            });
                
                
            
        }
    }
}
</script>
