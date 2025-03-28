// components/ProjectForm.tsx
interface ProjectFormProps {
    mode: 'create' | 'edit';
    project?: object
  }
  
  const ProjectForm: React.FC<ProjectFormProps> = ({ mode, project }) => {
    return (
      <div>
        <h1>{mode === 'create' ? 'Create Project' : `Edit Project #${project.id}`}</h1>
        <form>
          <input
            type="text"
            placeholder={mode === 'create' ? 'Enter new project name' : 'Update project name'}
            defaultValue={project?.title || ''}
          />
          <button type="submit">
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
          </button>
        </form>
      </div>
    );
  };
  
  export default ProjectForm;
  