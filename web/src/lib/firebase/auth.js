import { writable } from "svelte/store";
import { assertApp } from "./helpers";

export function userStore(opts = { persist: null }) {
  const auth = assertApp("auth");

  if (location.hostname === "localhost") {
    auth.useEmulator("http://localhost:9099");
  }

  const storageKey = "sveltefire_user";
  let cached = null;

  const { persist } = opts;

  if (persist) {
    cached = JSON.parse(opts.persist.getItem(storageKey));
  }

  const store = writable(cached, () => {
    const teardown = auth.onAuthStateChanged((u) => {
      set(u);
      persist && opts.persist.setItem(storageKey, JSON.stringify(u));
    });
    return () => teardown;
  });

  const { subscribe, set } = store;

  return {
    subscribe,
    auth,
  };
}
