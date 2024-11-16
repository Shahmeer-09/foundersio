"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { pitcForm } from "@/app/zod";
import { ZodError } from "zod";
import { useToast } from "@/hooks/use-toast";
import Form from "next/form";
import { createPitch } from "@/app/services/pitchFormaction";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});
const StartuppitchForm = () => {
  const router = useRouter();
  const [Pitch, setPitch] = useState("");
  const [fields, setFiel] = useState<Record<string, string>>({});
  const hadleSubmit = async (prevstate: any, formdata: FormData) => {
    try {
      setFiel({});
      const pitchformobj = {
        title: formdata.get("title"),
        description: formdata.get("description"),
        link: formdata.get("link"),
        category: formdata.get("category"),
        pitch: Pitch,
      };
      await pitcForm.parseAsync(pitchformobj);
      const result = await createPitch(prevstate, formdata, Pitch);
      console.log(result);
      // const data = await result?.json();
      if (result?.msg == "success") {
        toast.success("Pitch created successfully");
      }
      router.push(`/startup/${result?.data}`);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const errors = error.flatten().fieldErrors;
        setFiel(errors as unknown as Record<string, string>);
        return { ...prevstate, errors: "validationfaild", status: "Error" };
      }
      toast.error("something went wrong");
      return { ...prevstate, errors: "something went wrong", status: "Error" };
    }
  };
  const [currentState, action, isPending] = useActionState(
    hadleSubmit,
    undefined
  );
  return (
    <Form action={action} className="startup-form">
      <div>
        <Label htmlFor="title" className="startup-form_label">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter your title"
          className="startup-form_input"
        />
        {fields.title && <p className="startup-form_error">{fields.title}</p>}
      </div>
      <div>
        <Label htmlFor="desc" className="startup-form_label">
          Description
        </Label>
        <Textarea
          id="desc"
          name="description"
          required
          placeholder="Breif description about ur idea"
          className="startup-form_textarea"
        />
        {fields.description && (
          <p className="startup-form_error">{fields.description}</p>
        )}
      </div>
      <div>
        <Label htmlFor="link" className="startup-form_label">
          Image Url
        </Label>
        <Input
          type="text"
          id="link"
          name="link"
          required
          placeholder="Upload an image"
          className="startup-form_input"
        />
        {fields.link && <p className="startup-form_error">{fields.link}</p>}
      </div>
      <div>
        <Select required name="category">
          <SelectTrigger id="category" className=" startup-form_input ">
            <SelectValue placeholder="Select your category" />
          </SelectTrigger>
          <SelectContent className="bg-white font-semibold ">
            <SelectItem value="robotics">Robotics</SelectItem>
            <SelectItem value="ai/ml">AI/ML</SelectItem>
            <SelectItem value="dev">Development</SelectItem>
            <SelectItem value="appdev">App Development</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {fields.category && (
          <p className="startup-form_error">{fields.category}</p>
        )}
      </div>
      <div data-color-mode="light">
        <Label htmlFor="pitch" className="startup-form_label">
          Pitch
        </Label>
        <MDEditor
          value={Pitch}
          onChange={(value) => setPitch(value as string)}
          textareaProps={{
            placeholder: "Please enter your Pitch here",
          }}
          preview="edit"
          id="pitch"
          style={{
            borderRadius: 20,
            overflow: "hidden",
            borderColor: "black",
          }}
          height={300}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {fields.pitch && <p className="startup-form_error">{fields.pitch}</p>}
      </div>
      <Button
        disabled={isPending}
        type="submit"
        className="startup-form_btn text-white-100 "
      >
        Submit
        <Send />
      </Button>
    </Form>
  );
};

export default StartuppitchForm;
