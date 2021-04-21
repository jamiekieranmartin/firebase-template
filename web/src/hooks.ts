// import * as cookie from "cookies";
import type { Incoming, Request, Response } from "@sveltejs/kit";

export async function getContext({}: Incoming) {
  return {
    //   user: cookies.session_id || { guest: true },
  };
}

export function getSession({ context }) {
  return {
    user: {
      // only include properties needed client-side —
      // exclude anything else attached to the user
      // like access tokens etc
      name: context.user?.name,
      email: context.user?.email,
      avatar: context.user?.avatar,
    },
  };
}

export async function handle(request: Request, render): Promise<Response> {
  const response = await render(request);

  if (response) {
    return {
      ...response,
      headers: {
        ...response.headers,
        "x-custom-header": "potato",
      },
    };
  }
}
