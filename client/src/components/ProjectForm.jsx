import { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  Plus,
  ClipboardList,
   Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import { generateTasks } from "../services/aiService";

import {
  createProject,
  updateProject,
} from "../services/projectService";

import styles from "./ProjectForm.module.css";
import { useRef } from "react";



function ProjectForm({

  onProjectCreated,

  editingProject,

  onCancelEdit,

  isPremium,

  projectCount,

}) {

  /* ==========================
     Initial Form
  ========================== */

  const initialForm = {

    title: "",

    description: "",

    status: "In Progress",

  };



  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  /* ==========================
     AI States
  ========================== */

  const [aiLoading, setAiLoading] =
    useState(false);

  const [aiTasks, setAiTasks] =
    useState([]);

  const aiSuggestionsRef = useRef(null);


  /* ==========================
     Load Edit Data
  ========================== */

 useEffect(() => {

const timer = setTimeout(()=>{


if(editingProject){

setFormData({
title: editingProject.title || "",
description: editingProject.description || "",
status: editingProject.status || "In Progress",
});

}
else{

setFormData({
title:"",
description:"",
status:"In Progress",
});

}


setAiTasks([]);


},0);


return ()=>clearTimeout(timer);


},[editingProject]);




  /* ==========================
     Handle Input Change
  ========================== */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({

      ...prev,

      [name]: value,

    }));

  };




  /* ==========================
     Generate AI Tasks
  ========================== */

  const handleGenerateTasks = async () => {

    if (
      !formData.title.trim() ||
      !formData.description.trim()
    ) {

      toast.error(
        "Please enter project title and description first."
      );

      return;

    }

    try {
  setAiLoading(true);

  

  const data = await generateTasks(
    formData.title,
    formData.description
  );

  
  

  setAiTasks(data.tasks || []);

  toast.success("AI tasks generated successfully!");
}
catch (error) {
  

  toast.error(
    error.response?.data?.message ||
    "Failed to generate AI tasks."
  );
}
finally {
  setAiLoading(false);
}

  };

useEffect(() => {
  if (aiTasks.length > 0) {
    aiSuggestionsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [aiTasks]);


  /* ==========================
     Add AI Task to Description
  ========================== */

  const handleAddTask = (task) => {

  if (formData.description.includes(task)) {
    toast.error("Task already added.");
    return;
  }

  setFormData((prev) => ({

    ...prev,

    description:
      prev.description +
      `\n• ${task}`,

  }));

 toast.success("Task added to project description.");

const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({
  message: `Task added to "${formData.title}"`,
  time: new Date().toLocaleString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications.slice(0, 5))
);

};




  /* ==========================
     Handle Submit
  ========================== */
  const handleSubmit = async (e) => {

  e.preventDefault();

  if (loading) return;

  const payload = {

    title: formData.title.trim(),

    description: formData.description.trim(),

    status: formData.status,

  };

  try {

    /* =============================
       Free Plan Restriction
    ============================= */

    if (

      !editingProject &&

      !isPremium &&

      projectCount >= 3

    ) {

      toast.error(

        "🚀 Free plan allows only 3 projects. Upgrade to Premium."

      );

      return;

    }

    setLoading(true);

    let data;

    if (editingProject) {

      data = await updateProject(

        editingProject._id,

        payload

      );

    }

    else {

      data = await createProject(

        payload

      );

    }

    toast.success(

      data.message ||

      (editingProject

        ? "Project updated successfully!"

        : "Project created successfully!")

    );

    const notifications =
  JSON.parse(localStorage.getItem("notifications")) || [];

notifications.unshift({
  message: editingProject
    ? `Project "${payload.title}" updated`
    : `Project "${payload.title}" created`,
  time: new Date().toLocaleString(),
});

localStorage.setItem(
  "notifications",
  JSON.stringify(notifications.slice(0, 5))
);

    setFormData(initialForm);

    setAiTasks([]);

    onProjectCreated();

  }

  catch (error) {

    console.error(

      "Project operation failed:",

      error

    );

    if (

      error.response?.data?.premiumRequired

    ) {

      toast.error(

        "🚀 Upgrade to Premium for unlimited projects."

      );

    }

    else {

      toast.error(

        error.response?.data?.message ||

        "Operation failed."

      );

    }

  }

  finally {

    setLoading(false);

  }

};




/* ==========================
   Cancel Edit
========================== */

const handleCancel = () => {

  setFormData(initialForm);

  setAiTasks([]);

  onCancelEdit();

};
return (

  <div className={styles.card}>

    <h2 id="project-form-title">

      {

        editingProject

          ? "Update Project"

          : "Create New Project"

      }

    </h2>





    {/* ==========================
        Free Plan Warning
    ========================== */}

    {

      !editingProject &&

      !isPremium &&

      projectCount >= 3 &&

      (

        <div className={styles.warning}>

          🚀 You reached the free plan limit.

          <br />

          Upgrade to Premium to create
          unlimited projects.

        </div>

      )

    }






    <form

      onSubmit={handleSubmit}

      aria-labelledby="project-form-title"

    >

      <input

        type="text"

        name="title"

        placeholder="Project Title"

        value={formData.title}

        onChange={handleChange}

        maxLength={100}

        disabled={loading}

        required

      />





      <textarea

        name="description"

        placeholder="Project Description"

        value={formData.description}

        onChange={handleChange}

        maxLength={1000}

        disabled={loading}

        required

      />






      {/* ==========================
          AI Button
      ========================== */}

      <button

        type="button"

        className={styles.aiButton}

        onClick={handleGenerateTasks}

        disabled={

          aiLoading ||

          loading

        }

      >

        {
  aiLoading ? (
    <Loader2
      size={18}
      className={styles.spin}
    />
  ) : (
    <Sparkles size={18} />
  )
}

{
  aiLoading
    ? "Generating AI Tasks..."
    : "Generate AI Tasks"
}

      </button>






      {/* ==========================
          AI Suggestions
      ========================== */}

      {

        aiTasks.length > 0 &&

        (

          <div
  ref={aiSuggestionsRef}
  className={styles.aiSuggestions}
>

    <div className={styles.aiHeader}>

        <div className={styles.aiTitle}>

            <ClipboardList size={22} />

            <div>

                <h3>AI Suggested Tasks</h3>

                <p>
Generated {aiTasks.length} smart tasks
</p>

            </div>

        </div>

    </div>

    <div className={styles.taskGrid}>

        {aiTasks.map((task,index)=>(

            <div
                key={index}
                className={styles.taskCard}
            >

                <div className={styles.taskInfo}>

                    <CheckCircle2
                        size={20}
                    />

                    <span>{task}</span>

                </div>

                <button
  type="button"
  className={styles.addTaskBtn}
 disabled={formData.description.includes(task)}
  onClick={() => handleAddTask(task)}
>

                    {
  formData.description.includes(task)
  ? <>
      <CheckCircle2 size={16}/>
      Added
    </>
  : <>
      <Plus size={16}/>
      Add
    </>
}

                  

                </button>

            </div>

        ))}

    </div>

</div>

        )

      }







      <select

        name="status"

        value={formData.status}

        onChange={handleChange}

        disabled={loading}

      >

        <option>

          In Progress

        </option>

        <option>

          Pending

        </option>

        <option>

          Completed

        </option>

      </select>







      <button

        type="submit"

        disabled={loading}

      >

        {

          loading

            ?

            editingProject

              ? "Updating..."

              : "Creating..."

            :

            editingProject

              ? "Update Project"

              : "Create Project"

        }

      </button>







      {

        editingProject &&

        (

          <button

            type="button"

            onClick={handleCancel}

            disabled={loading}

          >

            Cancel

          </button>

        )

      }

    </form>

  </div>

);


}

export default ProjectForm;