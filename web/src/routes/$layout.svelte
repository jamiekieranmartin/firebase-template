<script>
  import "../global.css";
  import { FirebaseApp, User, Doc, Collection } from "$lib/firebase";
  import firebase from "firebase/app";
  import "firebase/firestore";
  import "firebase/auth";
  import "firebase/performance";
  import "firebase/analytics";
  let firebaseConfig = {
    apiKey: "AIzaSyDl0j3GihYQa8bSzqq0nmdDqWjmezMQwbc",
    authDomain: "template-e0c89.firebaseapp.com",
    projectId: "template-e0c89",
    storageBucket: "template-e0c89.appspot.com",
    messagingSenderId: "997135755411",
    appId: "1:997135755411:web:c33efd45427cac7e578566",
    measurementId: "G-WZC59LYZ46",
  };

  import { browser } from "$app/env";

  if (browser) {
    firebase.initializeApp(firebaseConfig);
  }
</script>

<main>
  <FirebaseApp {firebase}>
    <User let:user let:auth>
      Howdy 😀! User
      <em>{user.uid}</em>

      <button on:click={() => auth.signOut()}>Sign Out</button>

      <div slot="signed-out">
        <button on:click={() => auth.signInAnonymously()}>
          Sign In Anonymously
        </button>
      </div>

      <Doc path={`posts/first-post`} let:data={post} let:ref={postRef} log>
        <div slot="loading">Loading...</div>
        <div slot="fallback">
          <button
            on:click={() => postRef.set({ uid: user.uid, title: "My Post" })}
          >
            Create Post
          </button>
        </div>

        <!-- Start Post Default -->

        <h2>{post.title}</h2>
        <p>By {post.uid}</p>

        <Collection
          path={postRef.collection("comments")}
          query={(ref) => ref.where("uid", "==", post.uid)}
          let:data={comments}
          let:ref={commentsRef}
          traceId={"readComments"}
          log
        >
          <div slot="loading">Loading...</div>

          <div slot="fallback">Unable to display comments...</div>

          <!-- Start Comments Default -->

          <button
            on:click={() =>
              commentsRef.add({
                uid: user.uid,
                text: "My Awesome Comment",
              })}
          >
            Add Comment
          </button>
          <div id="posts">
            {#each comments as comment}
              <span>
                <h5>{comment.text} {comment.id}</h5>
                <button on:click={() => comment.ref.delete()}>Delete</button>
              </span>
            {/each}
          </div>
        </Collection>
      </Doc>
    </User>
  </FirebaseApp>
</main>
