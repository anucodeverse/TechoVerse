import {useEffect,useState,useCallback,useMemo,} from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProjectForm from "../components/ProjectForm";
import ConfirmModal from "../components/ConfirmModal";
import Loading from "../components/Loading";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import {
  getProjects,
  deleteProject,
} from "../services/projectService";

import styles from "./Projects.module.css";

function Projects() {

  const { user } = useAuth();

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] =
    useState(null);

  const [deleteId, setDeleteId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  // Premium Status

  const isPremium =
    user?.isPremium || false;

  /* ==========================
     Fetch Projects
  ========================== */

  const fetchProjects = useCallback(async () => {

    try {

      setLoading(true);

      const data =
        await getProjects();

      setProjects(
        data.projects || []
      );

    }

    catch (error) {

      console.error(
        "Failed to fetch projects:",
        error
      );

      toast.error(
        "Failed to load projects."
      );

    }

    finally {

      setLoading(false);

    }

  }, []);

  useEffect(() => {

    fetchProjects();

  }, [fetchProjects]);
  
  /* ==========================
     Delete Project
  ========================== */

  const handleDelete = async (id) => {

    try {

      const data =
        await deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );

      toast.success(
        data.message
      );

      if (editingProject?._id === id) {

        setEditingProject(null);

      }

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Failed to delete project."

      );

    }

  };



  /* ==========================
     Edit Project
  ========================== */

  const handleEdit = (project) => {

    setEditingProject(project);

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };



  const handleCancelEdit = () => {

    setEditingProject(null);

  };



  /* ==========================
     Project Saved
  ========================== */

  const handleProjectSaved = () => {

    fetchProjects();

    setEditingProject(null);

  };



  /* ==========================
     Search • Filter • Sort
  ========================== */

  const filteredProjects = useMemo(() => {

    return [...projects]

      .filter((project) => {

        const text =
          search.toLowerCase();

        const title =
          (project.title || "")
            .toLowerCase();

        const description =
          (project.description || "")
            .toLowerCase();

        const matchesSearch =

          title.includes(text) ||

          description.includes(text);

        const matchesStatus =

          filterStatus === "All" ||

          project.status === filterStatus;

        return (

          matchesSearch &&

          matchesStatus

        );

      })

      .sort((a, b) => {

        if (sortBy === "newest") {

          return (

            new Date(b.createdAt) -

            new Date(a.createdAt)

          );

        }

        if (sortBy === "oldest") {

          return (

            new Date(a.createdAt) -

            new Date(b.createdAt)

          );

        }

        if (sortBy === "az") {

          return a.title.localeCompare(
            b.title
          );

        }

        return 0;

      });

  }, [

    projects,

    search,

    filterStatus,

    sortBy,

  ]);
  
  /* ==========================
     Project Statistics
  ========================== */

  const projectStats = useMemo(() => {

    return projects.reduce(

      (acc, project) => {

        if (project.status === "Completed") {

          acc.completed++;

        }

        else if (project.status === "In Progress") {

          acc.progress++;

        }

        else if (project.status === "Pending") {

          acc.pending++;

        }

        return acc;

      },

      {

        completed: 0,

        progress: 0,

        pending: 0,

      }

    );

  }, [projects]);



  const completed =
    projectStats.completed;

  const progress =
    projectStats.progress;

  const pending =
    projectStats.pending;



  return (

    <>

      <Navbar />



      <div className={styles.container}>





        {/* ==========================
            Project Form
        ========================== */}

        <ProjectForm

          editingProject={editingProject}

          onCancelEdit={handleCancelEdit}

          onProjectCreated={handleProjectSaved}

        />







        {/* ==========================
            Header
        ========================== */}

        <div className={styles.header}>

          <div>

            <h1 className={styles.heading}>

              Projects

            </h1>



            <p className={styles.subHeading}>

              {filteredProjects.length}

              {" "}of{" "}

              {projects.length}

              {" "}Projects

            </p>

          </div>

        </div>







        {/* ==========================
            Premium Banner
        ========================== */}

        {

          !isPremium &&

          projects.length >= 3 &&

          (

            <div
              className={styles.limitBanner}
            >

              <h2>

                🚀 Free Plan Limit Reached

              </h2>



              <p>

                Free plan allows only 3 projects.

                Upgrade to Premium for unlimited
                projects.

              </p>



              <Link

                to="/dashboard"

                className={styles.upgradeLink}

              >

                Upgrade Premium

              </Link>

            </div>

          )

        }
        
        {/* ==========================
            Controls
        ========================== */}

        <div className={styles.controls}>

          <input
            type="text"
            placeholder="🔍 Search projects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />



          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Completed">
              Completed
            </option>

            <option value="In Progress">
              In Progress
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>



          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >

            <option value="newest">
              Newest
            </option>

            <option value="oldest">
              Oldest
            </option>

            <option value="az">
              A-Z
            </option>

          </select>

        </div>







        {/* ==========================
            Summary Cards
        ========================== */}

        <div className={styles.summary}>

          <div className={styles.summaryCard}>
            <h3>{projects.length}</h3>
            <p>Total</p>
          </div>



          <div className={styles.summaryCard}>
            <h3>{completed}</h3>
            <p>Completed</p>
          </div>



          <div className={styles.summaryCard}>
            <h3>{progress}</h3>
            <p>In Progress</p>
          </div>



          <div className={styles.summaryCard}>
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>



          <div className={styles.summaryCard}>

            <h3>

              {

                isPremium

                  ? "Premium"

                  : "Free"

              }

            </h3>

            <p>

              Current Plan

            </p>

          </div>

        </div>







        {/* ==========================
            Loading / Empty / Grid
        ========================== */}

        {

          loading

            ?

            (

              <Loading
                text="Loading Projects..."
              />

            )

            :

            filteredProjects.length === 0

              ?

              (

                <div
                  className={styles.emptyState}
                >

                  <h2>

                    🔍 No projects found

                  </h2>



                  <p>

                    You don't have any projects yet.

                    Create your first project to get
                    started.

                  </p>

                </div>

              )

              :

              (

                <div
                  className={styles.grid}
                >

                  {

                    filteredProjects.map((project) => (

                      <div

                        key={project._id}

                        className={styles.card}

                      >

                        <h2>

                          {project.title}

                        </h2>



                        <p>

                          {

                            project.description?.length > 120

                              ?

                              `${project.description.slice(0,120)}...`

                              :

                              project.description || "No description"

                          }

                        </p>



                        <p
                          className={styles.date}
                        >

                          Created:{" "}

                          {

                            new Date(
                              project.createdAt
                            ).toLocaleDateString()

                          }

                        </p>



                        <span

                          className={

                            `${styles.status}

                            ${

                              project.status === "Completed"

                                ?

                                styles.completed

                                :

                                project.status === "In Progress"

                                  ?

                                  styles.progress

                                  :

                                  styles.pending

                            }`

                          }

                        >

                          {project.status}

                        </span>



                        <div
                          className={styles.buttons}
                        >

                         <Link
  to={`/projects/${project._id}`}
  className={styles.viewBtn}
>
  <FaEye className={styles.actionIcon} />
  <span>View</span>
</Link>



                         <button
  className={styles.editBtn}
  aria-label={`Edit ${project.title}`}
  onClick={() => handleEdit(project)}
>
  <FaEdit className={styles.actionIcon} />
  <span>Edit</span>
</button>



                          <button
  className={styles.deleteBtn}
  aria-label={`Delete ${project.title}`}
  onClick={() => setDeleteId(project._id)}
>
  <FaTrashAlt className={styles.actionIcon} />
  <span>Delete</span>
</button>

                        </div>

                      </div>

                    ))

                  }

                </div>

              )

        }
        
        {/* ==========================
            Delete Confirmation
        ========================== */}

        <ConfirmModal

          show={deleteId !== null}

          title="Delete Project?"

          message="Are you sure you want to delete this project?"

          onCancel={() => {

            setDeleteId(null);

          }}

          onConfirm={async () => {

            await handleDelete(deleteId);

            setDeleteId(null);

          }}

        />

      </div>

    </>

  );

}

export default Projects;