import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// Get(read)
export const GET = async (request: Request,{ params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if(!prompt) return new Response("Prompt Not Found", {status:404});

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
// PATCH(update)
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { prompt, tag } = await request.json();
  
    try {
      await connectToDB();
      
      // Use the Prompt model to find the existing document by ID
      const existingPrompt = await Prompt.findById(params.id);
  
      if (!existingPrompt) return new Response("Prompt Not Found", { status: 404 });
  
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
  
      await existingPrompt.save();
  
      return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
      return new Response("Failed to update prompt", { status: 500 });
    }
  };

// DELETE(delete)

export const DELETE = async(request: Request,{ params }: { params: { id: string } })=>{
    try {
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", {status:200})
    } catch (error) {
        return new Response("Failed to delete prompt",{status:500});
    }
}
