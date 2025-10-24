import recombee from "recombee-js-api-client";

const client = new recombee.ApiClient(
    "datakyu-dev",
    "fsjnVzhb6Hw4lWXRydDSz5K1nBk8T3SEPkjr71lcfPf8qgsrvfcKmNWewQX2KUsd",
    {
        region: "ca-east",
    },
);

export default function sendRecommendationClickEvent(userId, itemId, recId) {
    if (!client) {
        console.error("Recombee client is not initialized.");
        return Promise.reject(new Error("Recombee client is not initialized"));
    }
    return client.send(new recombee.AddDetailView(userId, itemId, {
        recommId: recId,
    }));
}