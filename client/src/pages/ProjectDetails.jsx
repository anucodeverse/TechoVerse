import {
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { FaEdit } from "react-icons/fa";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

import {
  getProjectById,
} from "../services/projectService";

import styles from "./ProjectDetails.module.css";

function ProjectDetails() {

  const { id } = useParams();

  const navigate = useNavigate();



  /* ==========================
     State
  ========================== */

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");



  /* ==========================
     Status Badge Classes
  ========================== */

  const statusClasses = {

    Completed: styles.completed,

    "In Progress": styles.progress,

    Pending: styles.pending,

  };



  /* ==========================
     Fetch Project
  ========================== */

  const fetchProject = useCallback(async () => {

    try {

      setLoading(true);

      setError("");

      const data =
        await getProjectById(id);

      setProject(
        data.project || null
      );

    }

    catch (error) {

      console.error(
        "Failed to fetch project:",
        error
      );

      setError(
        "Unable to load project details."
      );

    }

    finally {

      setLoading(false);

    }

  }, [id]);



  /* ==========================
     Effects
  ========================== */

  useEffect(() => {

    fetchProject();

  }, [fetchProject]);



  useEffect(() => {

    document.title =
      "Project Details | TechoVerse";

    return () => {

      document.title =
        "TechoVerse";

    };

  }, []);
  
  /* ==========================
     Loading State
  ========================== */

  if (loading) {

    return (

      <>

        <Navbar />

        <Loading
          text="Loading Project Details..."
        />

      </>

    );

  }



  /* ==========================
     Error State
  ========================== */

  if (error) {

    return (

      <>

        <Navbar />

        <div className={styles.container}>

          <div className={styles.errorCard}>

            <h2>

              ⚠ Unable to Load Project

            </h2>

            <p>

              {error}

            </p>

            <button

              className={styles.retryBtn}

              onClick={fetchProject}

            >

              Retry

            </button>

          </div>

        </div>

      </>

    );

  }



  /* ==========================
     Project Not Found
  ========================== */

  if (!project) {

    return (

      <>

        <Navbar />

        <div className={styles.container}>

          <div className={styles.emptyState}>

            <h2>

              📂 Project Not Found

            </h2>

            <p>

              The requested project could not be found.

            </p>

            <button

              className={styles.backBtn}

              onClick={() => navigate(-1)}

            >

              ← Go Back

            </button>

          </div>

        </div>

      </>

    );

  }



  /* ==========================
     Helper Values
  ========================== */

  const createdDate =

    project.createdAt

      ?

      new Date(

        project.createdAt

      ).toLocaleDateString(

        "en-US",

        {

          day: "numeric",

          month: "short",

          year: "numeric",

        }

      )

      :

      "Not Available";



  const updatedDate =

    project.updatedAt

      ?

      new Date(

        project.updatedAt

      ).toLocaleDateString(

        "en-US",

        {

          day: "numeric",

          month: "short",

          year: "numeric",

        }

      )

      :

      "Not Available";



  const owner =

    project.owner

      ?

      `${project.owner.slice(0, 8)}...`

      :

      "Not Available";
      
  return (

    <>

      <Navbar />



      <div className={styles.container}>

        <div className={styles.card}>



          {/* ==========================
              Project Title
          ========================== */}

          <h1 className={styles.title}>

            {project.title}

          </h1>





          {/* ==========================
              Status Badge
          ========================== */}

          <span

            className={`${

              styles.status

            } ${

              statusClasses[project.status]

            }`}

          >

            {project.status}

          </span>







          {/* ==========================
              Description
          ========================== */}

          <p className={styles.description}>

            {

              project.description ||

              "No description available."

            }

          </p>







          {/* ==========================
              Project Information
          ========================== */}

          <div className={styles.info}>

            <p>

              <strong>

                👤 Created By:

              </strong>

              {" "}

              {owner}

            </p>





            <p>

              <strong>

                📅 Created Date:

              </strong>

              {" "}

              {createdDate}

            </p>





            <p>

              <strong>

                🔄 Last Updated:

              </strong>

              {" "}

              {updatedDate}

            </p>





            <p>

              <strong>

                📌 Status:

              </strong>

              {" "}

              {project.status}

            </p>

          </div>
          
          {/* ==========================
              Action Buttons
          ========================== */}

          <div className={styles.buttons}>

            <button

              className={styles.backBtn}

              onClick={() => navigate(-1)}

            >

              ← Back

            </button>





            <button
  className={styles.editBtn}
  onClick={() => navigate("/projects")}
>
  <FaEdit className={styles.editIcon} />
  <span>Edit Project</span>
</button>

          </div>

        </div>

      </div>

    </>

  );

}

export default ProjectDetails;