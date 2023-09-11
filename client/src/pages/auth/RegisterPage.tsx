import { User } from "../../model/Interface";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./registerpage.css";

interface IProps {
  user: User;
  setUserData: (el: string, value: string) => void;
  register: (data: User) => void;
}
/*
const MAX_FILE_SIZE = 50000000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z
  .object({
    file: z
      .any()
      .refine(
        (file) => file?.[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
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
*/
export const RegisterPage = ({ setUserData, register, user }: IProps) => {
  const navigate = useNavigate();
  /*  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(data);
  };
  */
  return (
    <>
      {" "}
      <div className="registerContainer">
        <form>
          {" "}
          <h1>register Your Data </h1>
          <br></br>
          <br></br>
          <input
            type="email"
            placeholder="email"
            value={user.email}
            onChange={(e) => setUserData("email", e.target.value)}
          />
          <br></br>
          <input
            type="text"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUserData("password", e.target.value)}
          />
          <br></br>.{JSON.stringify(user)}.
          <button
            type="submit"
            onClick={() => {
              register(user);
              navigate("/login");
            }}
          >
            register
          </button>
        </form>{" "}
        <br></br>
        <br></br>
      </div>
    </>
  );
};

/*


    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">first name</label>
          <br />
          <input
            type="text"
            placeholder="Your firstname"
            {...register("firstname")}
            onChange={(e) => setUserData("firstName", e.target.value)}
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
          <label htmlFor="email">second name</label> <br />
          <input
            type="text"
            placeholder="Your secondname"
            {...register("secondname")}
            onChange={(e) => setUserData("email", e.target.value)}
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
            onChange={(e) =>
              setUserData("picturePath", e.currentTarget.value.split("\\")[2])
            }
          />{" "}
          <br />{" "}
          <div className="err">
            {errors.occupation && (
              <span className="errmess">{errors.occupation?.message}</span>
            )}
          </div>
        </div>
        <input
          className="file-input"
          type="file"
          {...register("file")}
          name="file"
        />
        <div className="err">
          {errors.file && (
            <span className="errmess">{errors.file?.message?.toString()}</span>
          )}
        </div>
        <br></br>
        <button type="submit" disabled={isSubmitting}>
          Create an account
        </button>
      </form>
    </div>
  );


*/
