//call create-edit page component in create mode
import ProjectForm from "~/components/ui/project-form";
import { toast } from "react-toastify";

export default async function CreateProjectPage() {
  return (
    <div>
      <ProjectForm 
        mode="create" />
    </div>
  );
}
