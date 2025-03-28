import { Project } from "~/schema/project";
import React from 'react';

interface ProjectFormProps {
    mode: 'create' | 'edit';
    project?: Project
  }
  
  const ProjectForm: React.FC<ProjectFormProps> = React.memo(({ mode, project }) => {
    return (
      <div>
        <h1>{mode === 'create' ? 'Create Project' : `Edit Project #${project!.id}`}</h1>
        <form className={'flex flex-col gap-2 items-start'}>
          {/* name */}
          <input
            type="text"
            placeholder='Title'
            defaultValue={project?.title || ''}
          />
          {/* description */}
          <input
            type="text"
            placeholder='Description'
            defaultValue={project?.description || ''}
          />
          {/* longDescription */}
          <input
            type="text"
            placeholder='Long Description'
            defaultValue={project?.longDescription || ''}
          />
          {/* tags */}
            {/* aggregating list, preferably like blocks */}
          {/* roadmap: aggregating list, visualization also better */}
            {/*  */}
          {/* goals: usually multiline list */}
            {/*  */}
          {/* license: usually files */}
            {/*  */}
          <button type="submit">
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
            {/* Create: write to db, get project obj response, nav to new project detail page */}
              {/* redirecting to root page as place holder */}

            {/* Edit: use given project.id */}

          </button>
        </form>
      </div>
    );
  });
  
  export default ProjectForm;
  