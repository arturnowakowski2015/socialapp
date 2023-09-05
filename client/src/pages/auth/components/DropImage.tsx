import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  handleFileInput: (name: string) => void;
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size < 333333333, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
type FormSchemaType = z.infer<typeof formSchema>;

export function DropImage({ handleFileInput }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  return (
    <div>
      <form>
        aaaaa
        <input
          className="file-input"
          type="file"
          {...register("image")}
          onChange={(e) => handleFileInput(e.currentTarget.value)}
          name="file"
        />{" "}
        <div className="err">
          {errors.image && (
            <span className="errmess">{errors.image?.message?.toString()}</span>
          )}
        </div>
      </form>
    </div>
  );
}
