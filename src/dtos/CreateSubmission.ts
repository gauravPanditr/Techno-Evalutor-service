import {z} from "zod";
export type CreateSubmissionDto=z.infer<typeof CreateSubmissionZodSchema>

export const CreateSubmissionZodSchema=z.object({
    userId:z.string(),
    problemId:z.string(),
    code:z.string(),
    language:z.string()
});
