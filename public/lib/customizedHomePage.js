import recombee from "recombee-js-api-client";

const client = new recombee.ApiClient(
    "datakyu-dev",
    "fsjnVzhb6Hw4lWXRydDSz5K1nBk8T3SEPkjr71lcfPf8qgsrvfcKmNWewQX2KUsd",
    {
        region: "ca-east",
    },
);

export default function customizedHomePage(userId, count = 12) {
    if (!client) {
        console.error("Recombee client is not initialized.");
        return Promise.reject(new Error("Recombee client is not initialized"));
    }

    return client
        .send(new recombee.RecommendItemsToUser(userId, count, {
            returnProperties: true,
            scenario: 'personalized-feed',
            cascadeCreate: true,
        }))
        .then((res) => {
            console.log(res);
            return res; // This return passes the data through the promise chain
        })
        .catch((error) => {
            console.error("Recombee error:", error);
            throw error;  // Re-throw so the caller can catch it
        });
}