import recombee from "recombee-js-api-client";

const databaseId =
    window.location.hostname == "localhost" ? "datakyu-dev" : "datakyu-prod";
const databasePublicKey =
    window.location.hostname == "localhost"
        ? "fsjnVzhb6Hw4lWXRydDSz5K1nBk8T3SEPkjr71lcfPf8qgsrvfcKmNWewQX2KUsd"
        : "tHLISFq9HptPmoliJ4sGXB6MLkln1gYIAbnEBL5Sjt4dF6FeHEmHNoU7FWgcCUgF";

const client = new recombee.ApiClient(
    databaseId,
    databasePublicKey,
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