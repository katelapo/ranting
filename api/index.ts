interface Env {
  ASSETS: Fetcher;
}

export default {
  fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/rantings")) {
      return Response.json([
        {
          id: '1',
          nama: "ranting 1",
        },
        {
          id: '2',
          nama: "ranting 2",
        },
        {
          id: '3',
          nama: "ranting 3",
        },
      ]);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;