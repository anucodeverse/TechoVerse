import { useState, useEffect } from "react";

import toast from "react-hot-toast";

import {
  createProject,
  updateProject,
} from "../services/projectService";

import styles from "./ProjectForm.module.css";

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
     Load Edit Data
  ========================== */

  useEffect(() => {

    if (editingProject) {

      setFormData({

        title: editingProject.title || "",

        description:
          editingProject.description || "",

        status:
          editingProject.status || "In Progress",

      });

    }

    else {

      setFormData(initialForm);

    }

  }, [editingProject]);



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

        data.message

      );



      setFormData(initialForm);



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