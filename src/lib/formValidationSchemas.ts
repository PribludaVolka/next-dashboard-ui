import { z } from "zod";

export const subjectSchema = z.object({
    id: z.coerce.number().optional(),
    name: z.string().min(1, { message: "Subject name is required!" })
  });

  export type SubjectSchema = z.infer<typeof subjectSchema>; 

  export const classSchema = z.object({
    name: z.string().min(1, { message: "Class name is required!" }),
    capacity: z.coerce.number().min(1, { message: "Class capacity is required!" }),
    gradeId: z.coerce.number().min(1, {message: "GradeId is required!"}),
    supervisorId: z.string().optional()
  });

  export type ClassSchema = z.infer<typeof classSchema>; 