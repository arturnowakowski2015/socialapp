import { User } from "../../model/Interface";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DropImage } from "./components/DropImage";
import "./registerpage.css";

interface IProps {
  user: User;
  setUserData: (el: string, value: string) => void;
  register: (data: User) => void;
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const someSchema = z.object({
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const formSchema = z
  .object({
    firstname: z.string().min(1, "Password is required").max(100),
    secondname: z.string().min(1, "Password is required"),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have /nmore than 8 characters"),
    confirmPassword: z.string().min(1, "Confirm password"),
    location: z.string().min(1, "Location is required").max(100),
    occupation: z.string().min(1, "Location is required").max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormSchemaType = z.infer<typeof formSchema>;

export const RegisterPage = ({
  setUserData,
  register: register1,
  user,
}: IProps) => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">first name</label>
          <br />
          <input
            type="text"
            placeholder="Your firstname"
            {...register("firstname")}
          />{" "}
          <br />
          <div className="err">
            {errors.firstname && (
              <span className="errmess">{errors.firstname?.message}</span>
            )}{" "}
          </div>
        </div>{" "}
        <br></br>
        <div>
          <label htmlFor="email">second email</label> <br />
          <input
            type="text"
            placeholder="Your secondname"
            {...register("secondname")}
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.secondname && (
              <span className="errmess">{errors.secondname?.message}</span>
            )}{" "}
          </div>
        </div>{" "}
        <br></br>
        <div>
          <label htmlFor="email">Your email</label> <br />
          <input
            type="email"
            id="email"
            placeholder="name@company.com"
            {...register("email")}
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.email && (
              <span className="errmess">{errors.email?.message}</span>
            )}{" "}
          </div>
        </div>{" "}
        <br></br>
        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            {...register("password")}
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.password && (
              <span className="errmess">{errors.password?.message}</span>
            )}{" "}
          </div>
        </div>{" "}
        <br></br>
        <div className="confirmpassword">
          <label htmlFor="confirmPassword">Confirm password</label> <br />
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            {...register("confirmPassword")}
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.confirmPassword && (
              <span className="errmess">{errors.confirmPassword?.message}</span>
            )}{" "}
          </div>
        </div>
        <br></br>
        <div>
          <label htmlFor="confirmPassword">Location </label> <br />
          <input
            type="text"
            placeholder="location"
            {...register("location")}
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.location && (
              <span className="errmess">{errors.location?.message}</span>
            )}{" "}
          </div>
        </div>
        <br></br>
        <div>
          {" "}
          <label htmlFor="confirmPassword">occupation </label> <br />
          <input
            type="text"
            placeholder="occupation"
            {...register("occupation")}
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.occupation && (
              <span className="errmess">{errors.occupation?.message}</span>
            )}
          </div>
        </div>
        <br></br>
        <button type="submit" disabled={isSubmitting}>
          Create an account
        </button>
      </form>
    </div>
  );
};

/*
    <>
      {" "}
      <div className="registerContainer">
            <form 
  onSubmit={handleSubmit(onSubmit)}            >
          {" "}
          <h1>register Your Data </h1>
          <br></br>
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={user.email} {...register("email")}
            onChange={(e) => setUserData("email", e.target.value)}
          /> 
                {errors.email && (
                  <span className="text-red-800 block mt-2">
                    {errors.email?.message}
                  </span>
                )}
          <br></br>
          <div>
                <label 
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                   {...register("password")}
                />
                {errors.password && (
                  <span >
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div>
                <label 
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                   {...register("confirmPassword")}
                />
    {errors.confirmPassword && (
      <span >
        {errors.confirmPassword?.message}
      </span>
    )}
              </div>
          <input
            type="text"
            placeholder="firstName"
            value={user.firstName}
            onChange={(e) => setUserData("firstName", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="lastName"
            value={user.lastName}
            onChange={(e) => setUserData("lastName", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="location"
            value={user.location as string}
            onChange={(e) => setUserData("location", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="occupation"
            value={user.occupation}
            onChange={(e) => setUserData("occupation", e.target.value)}
          />
          <br></br>
          <DropImage
            handleFileInput={(e) => {
              setUserData("picturePath", e.split("\\")[2]);
            }}
          />
          .{JSON.stringify(user)}.
          <button
    type="submit"
     disabled={isSubmitting}
  >
    register
  </button>
        </form>{" "}
        <br></br>
        <br></br>
       </div>
    </>
*/
