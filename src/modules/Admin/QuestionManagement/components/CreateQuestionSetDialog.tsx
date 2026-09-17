
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogCloseButton,
} from "@/common/components/ui/Dialog";
import { Button } from "@/common/components/ui/Button";
import { Input } from "@/common/components/ui/input";
import { Label } from "@/common/components/ui/label";
import { Dropdown } from "@/common/components/ui/Dropdown";
import { useEffect } from "react";
import { createQuestionSetSchema } from "../Schema";
import type { CreateQuestionSetFormData } from "../Schema";


interface CreateQuestionSetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateQuestionSetFormData) => Promise<unknown> | unknown;
  categories?: { id: string; name: string }[];
  isLoading?: boolean;
  mode?: "create" | "edit";
  initialValues?: Partial<CreateQuestionSetFormData>;
}

const currencyOptions = [
  { value: "NPR", label: "NPR" },
  { value: "USD", label: "USD" },
  { value: "INR", label: "INR" },
];

export function CreateQuestionSetDialog({
  isOpen,
  onClose,
  onSubmit,
  categories = [],
  isLoading = false,
  mode = "create",
  initialValues,
}: CreateQuestionSetDialogProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateQuestionSetFormData>({
    resolver: zodResolver(createQuestionSetSchema),
    defaultValues: {
      categoryId: "",
      title: "",
      description: "",
      price: "0",
      currency: "NPR",
      accessDurationDays: 30,
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    reset({
      categoryId: initialValues?.categoryId ?? "",
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      price: initialValues?.price ?? "0",
      currency: initialValues?.currency ?? "NPR",
      accessDurationDays: initialValues?.accessDurationDays ?? 30,
    });
  }, [isOpen, initialValues, reset]);

  const handleFormSubmit = async (data: CreateQuestionSetFormData) => {
    await onSubmit({
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      price: data.price,
      currency: data.currency,
      accessDurationDays: Number(data.accessDurationDays),
    });
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose}>
      <DialogCloseButton onClick={handleClose} />

      <DialogHeader>
        <DialogTitle>{mode === "edit" ? "Edit Question Set" : "Create Question Set"}</DialogTitle>
        <DialogDescription>
          {mode === "edit"
            ? "Update the selected question set details."
            : "Add a new question set to the system with pricing and access details."}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogBody>
          <div className="space-y-4">
            <div className="w-full">
              <Label className="mb-1">Category</Label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    options={categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select a category"
                    error={errors.categoryId?.message}
                    className="w-full max-w-none"
                  />
                )}
              />
            </div>

            <div>
              <Label htmlFor="title" className="mb-1">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g. MCQS for General Knowledge"
                {...register("title")}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description" className="mb-1">
                Description
              </Label>
              <textarea
                id="description"
                rows={3}
                placeholder="Brief details about this set..."
                {...register("description")}
                className="w-full rounded-lg border border-slate-300 p-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="price" className="mb-1">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="250.00"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="mt-1 text-xs text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <Label className="mb-1">Currency</Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      options={currencyOptions}
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.currency?.message}
                      className="w-full max-w-none"
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="accessDurationDays" className="mb-1">
                Access Duration (Days)
              </Label>
              <Input
                id="accessDurationDays"
                type="number"
                placeholder="30"
                {...register("accessDurationDays", { valueAsNumber: true })}
              />
              {errors.accessDurationDays && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.accessDurationDays.message}
                </p>
              )}
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {isLoading ? (mode === "edit" ? "Updating..." : "Creating...") : mode === "edit" ? "Save Changes" : "Create Set"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}