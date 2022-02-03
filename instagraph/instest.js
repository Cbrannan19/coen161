const chalk = require("chalk");

const IDCounter = function () {
  let idCounter = 0;
  return function () {
    idCounter++;
    return idCounter;
  };
};

const getNextPostID = IDCounter();

const InstagramPost = function (author, caption, url) {
  const post = {
    id: getNextPostID(),
    author,
    caption,
    // key === property === field
    // the field should be named photoURL
    photoURL: url,
    likes: 0,
    comments: [],
    hashtags: [],
  }
  return post;
};

const InstaGraph = function () {
  const posts = {};
  const hashtags = {};

  const getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  return {
    hashtags,
    posts,
    getAllPosts: function () {
      let posts_copy = {...posts};
      return posts_copy;
    },

    /**
     * @worth 6 POINTS
     * @function addPost
     * @description adds a post into the InstaGraph
     * @param {InstagramPost} post -a post with an ID
     * @returns {InstagramPost | null}
     *      return null if the post doesn't have an ID
     *      returns the same post passed in if the add was successful
     */

    addPost: function (post) {
      let post_id = post.id;

      if (post_id != null) {

        posts[post_id] = post;
        // Add hashtag to hashtag object
        for (let i = 0; i < post.hashtags.length; i++) {

          let hashtag = post.hashtags[i];

          if(hashtags[hashtag] != null) {
             // If hashtag exists add the ID
            hashtags[hashtag].push(post_id);
          }
          else {
            // Otherwise, initialize new array
            hashtags[hashtag] = [post_id];
          }
        }
        return post;
      }
      return null;
    },
    
    /**
     * @worth 8 POINTS
     * @function getRelatedPosts
     * @description For each hashtag in the given post id,
     *  get a random post with that same hashtag. The post
     *  passed in should never be included in the array of matches.
     *
     * @param {number} id - id of a post
     * @returns {Array<InstagramPost> | null}
     *      return null if the post was not found
     *      returns Array<InstagramPost> filled in according to the description
     */
     
    getRelatedPosts: function (id) {
      const related_posts = [];
      let post = posts[id];

      if (post == null) return null;

      // Iterate hashtags
      for (let i = 0; i < post.hashtags.length; i++) {
        
        // Find the IDs of posts with the hashtag.
        let hashtag = post.hashtags[i];
        let hashtag_ids = hashtags[hashtag];

        if (hashtag_ids && hashtag_ids.length > 1) {

          // Get a random post from the IDs
          let random_id_index = Math.floor(Math.random() * hashtag_ids.length);
          let random_id = hashtag_ids[random_id_index];

          // Check to see if it is the same post
          // Iterate to prev post if we are at end of hashtag array
          // Otherwise, iterate up to next post
          if (random_id === id) {
            if (random_id_index === hashtag_ids.length-1) {
              random_id_index--;
              random_id = hashtag_ids[random_id_index];
            } else {
              random_id_index++;
              random_id = hashtag_ids[random_id_index];
            }
          }
          related_posts.push(posts[random_id]);
        }
      }
      return related_posts;
    },

    /**
     * @worth 3 POINTS
     * @function removePost
     * @description removes a post from the graph
     * @param {number} id - id of the post to remove
     * @returns {InstagramPost | null}
     *      return null if the post with that ID doesn't exist
     *      returns the removed InstagramPost
     */
    removePost: function (id) {
      let post = posts[id];
      if (post == null) return null;
      delete posts.id;
      return post;
    },
  };
};

module.exports = {
  Graph: InstaGraph,
  Post: InstagramPost,
};

