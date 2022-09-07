const rpcMap = {
  kujira: "https://rpc-harpoon.kujira.app",
  axelar: "https://axelar-testnet-rpc.qubelabs.io",
  cosmoshub: "https://vega-rpc.interchain.io",
  crescent: "https://testnet-endpoint.crescent.network/rpc/crescent",
  fetch: "https://rpc-dorado.fetch.ai",
  osmosis: "https://testnet-rpc.osmosis.zone",
  sei: "https://rpc-sei-ia.notional.ventures",
  terra: "https://terra-bombay-rpc.axelar-dev.workers.dev",
};
async function handleRequestOld(event) {
  const request = event.request;
  const { headers } = request;
  const params = {};
  const url = new URL(request.url);
  const queryString = url.search.slice(1).split("&");

  queryString.forEach((item) => {
    const kv = item.split("=");
    if (kv[0]) params[kv[0]] = kv[1] || true;
  });

  const { host, pathname } = new URL(url);
  const dhURL = rpcMap[params.chain];
  const request_origin = headers.get("Origin");

  const origin = request_origin
    ? new URL(request_origin)
    : { host: headers.get("Host") };

  let response;
  dataHubRequest = new Request(dhURL, request);

  response = await fetch(dataHubRequest);
  response = new Response(response.body, response);
  console.log("response status", response.status);
  response.headers.set("Access-Control-Allow-Origin", "*"); // Set CORS headers
  response.headers.append("Vary", "Origin"); // Append to/Add Vary header so browser will cache response correctly

  return response;
}

/**Newer code */

const kujira = ["https://rpc-harpoon.kujira.app"];
const axelar = [
  "https://www.google.comm",
  "https://axelar-testnet-rpc.qubelabs.io",
];
const cosmoshub = ["https://vega-rpc.interchain.io"];
const crescent = ["https://testnet-endpoint.crescent.network/rpc/crescent"];
const fetchHub = ["https://rpc-dorado.fetch.ai"];
const osmosis = ["https://testnet-rpc.osmosis.zone"];
const sei = ["https://rpc-sei-ia.notional.ventures"];
const terra = ["https://terra-bombay-rpc.axelar-dev.workers.dev"];

const rpcMapList = {
  kujira,
  axelar,
  cosmoshub,
  crescent,
  fetch: fetchHub,
  osmosis,
  sei,
  terra,
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

async function handleRequest(event) {
  const request = event.request;
  const { headers, body } = request;
  const params = {};
  const url = new URL(request.url);

  const queryString = url.search.slice(1).split("&");
  queryString.forEach((item) => {
    const kv = item.split("=");
    if (kv[0]) params[kv[0]] = kv[1] || true;
  });

  const { host, pathname } = new URL(url);
  const request_origin = headers.get("Origin");
  const origin = request_origin
    ? new URL(request_origin)
    : { host: headers.get("Host") };

  let response;

  const dhURLOptions = rpcMapList[params.chain];
  const newBody = await event.request.json();
  const init = {
    method: "POST",
    body: JSON.stringify(newBody),
  };

  let lastResponse;

  for (let i = 0; i < dhURLOptions.length; i++) {
    const dhURL = dhURLOptions[i];
    const dataHubRequest = new Request(dhURL, init);
    let response = await fetch(dataHubRequest);
    response = new Response(response.body, response);
    if (response.status !== 200) {
      if (i === dhURLOptions.length - 1) {
        response.headers.set("Access-Control-Allow-Origin", "*"); // Set CORS headers
        response.headers.append("Vary", "Origin"); // Append to/Add Vary header so browser will cache response correctly
        return response;
      }
      continue;
    } else {
      response.headers.set("Access-Control-Allow-Origin", "*"); // Set CORS headers
      response.headers.append("Vary", "Origin"); // Append to/Add Vary header so browser will cache response correctly
      return response;
    }
  }
}

/**
 * Responds with an uncaught error.
 * @param {Error} error
 * @returns {Response}
 */
function handleError(error) {
  console.error("Uncaught error:", error);

  const { stack } = error;
  return new Response(stack || error, {
    status: 500,
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
  });
}

function handleOptions(event) {
  const request = event.request;
  let headers = request.headers;
  if (
    headers.get("Origin") !== null &&
    headers.get("Access-Control-Request-Method") !== null &&
    headers.get("Access-Control-Request-Headers") !== null
  ) {
    let respHeaders = {
      ...corsHeaders,
      "Access-Control-Allow-Headers": request.headers.get(
        "Access-Control-Request-Headers"
      ),
    };

    return new Response(null, {
      headers: respHeaders,
    });
  } else {
    return new Response(null, {
      headers: {
        Allow: "GET, HEAD, POST, OPTIONS",
      },
    });
  }
}

addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method === "OPTIONS") {
    // Handle CORS preflight requests
    event.respondWith(handleOptions(event));
  } else if (
    request.method === "GET" ||
    request.method === "HEAD" ||
    request.method === "POST"
  ) {
    // Handle requests to the API server
    event.respondWith(handleRequest(event));
  } else {
    event.respondWith(
      new Response(null, {
        status: 405,
        statusText: "Method Not Allowed",
      })
    );
  }
});

export default {};
