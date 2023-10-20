import Quote from "@models/quote";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const quote = await Quote.find({}).populate('creator')

        return new Response(JSON.stringify(quote), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all quote", { status: 500 })
    }
} 