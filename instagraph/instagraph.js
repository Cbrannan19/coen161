/**
 * NAME: Cece Brannan
 * STUDENT ID: 1428302
 * THINGS I'M NOT SURE ABOUT: my dot operator won't fuckin work
 */

const chalk = require("chalk");
const IDCounter = function () {
  let idCounter = 0;
  return function () {
    idCounter++;
    return idCounter;
  };
};
//const postA = InstagramPost();
//const postB = InstagramPost();

//console.log(postA == postB);//false
//console.log(postA === postB);//false
const getNextPostID = IDCounter();

const InstagramPost = function (author, caption, url) {
  const post = {
    id: getNextPostID(),
    author : author,
    caption,
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
      // We'll do this in class
      let posts_Copy = {...posts};
      return posts_Copy;
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
      let p = post.id;
      if(p === null){
        return null;
      }
      posts[p] = post;
      for(let i = 0; i < post.hashtags.length; i++){
        let hashtag = post.hashtags[i];
        if(hashtags[hashtag] != null){
          hashtags[hashtag].push(p);
        }else{
          hashtags[hashtag] = [p];
        }
      }
      return post;
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
     *
     */
    getRelatedPosts: function (id) {
      const realtedPosts = [];
      let p = posts[id];
      if(p == null){
        return null;
      }
      for(let i = 0; i < p.hashtags.length; i++){
        let hashtag = p.hashtags[i];
        let hashIds = hashtags[hashtag];

        if(hashIds && hashIds.length > 1){
          let randIndex = Math.floor(Math.random() * hashIds.length);
          let randId = hashIds[randIndex];

          if(randId === id){
            if(randIndex === hashIds.length-1){
              randIndex--;
              randId = hashIds[randIndex];
            }else{
              randIndex++;
              randId = hashIds[randIndex];
            }
          }
          realtedPosts.push(posts[randId]);
        }
      }
      return realtedPosts;
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
      let p = posts[id];
      if(p == null){
        return null;
      }
      delete posts.id;
      return p;
    },
  };
};

module.exports = {
  Graph: InstaGraph,
  Post: InstagramPost,
};
