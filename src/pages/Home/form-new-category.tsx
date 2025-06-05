import { redirect } from "react-router";
import { handleNewCategory } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FormNewCategory() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    handleNewCategory,
    () => {
      redirect("/");
    }
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>SIgn in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="name" id="name" />
        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full pointer-events-auto cursor-pointer"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="size- animate-spin" /> : "Salvar"}
      </Button>
    </form>
  );
}
