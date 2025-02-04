async function GET({ url }) {
  const imageUrl = url.searchParams.get("url");
  if (!imageUrl) {
    return new Response("No URL provided", { status: 400 });
  }
  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");
    const arrayBuffer = await response.arrayBuffer();
    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return new Response("Error fetching image", { status: 500 });
  }
}

export { GET };
//# sourceMappingURL=_server-BtXL4YiP.js.map
