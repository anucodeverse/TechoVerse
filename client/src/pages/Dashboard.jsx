import {
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";

import { Link } from "react-router-dom";

import styles from "./Dashboard.module.css";

import { useAuth } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import UpgradeButton from "../components/UpgradeButton";

import { getProjects } from "../services/projectService";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  FaUserCircle,
  FaChartBar,
  FaBolt,
  FaFolderOpen,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaChartLine,
  FaRocket,
  FaCrown,
} from "react-icons/fa";

import { MdPendingActions } from "react-icons/md";


function Dashboard(){


const {
 user,
 loading:userLoading
}=useAuth();




const isPremium=user?.isPremium;




const [projects,setProjects]=useState([]);

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");





const loginTime =
localStorage.getItem("loginTime")
||
"Not Available";






/*
 Fetch Projects
*/


const fetchProjects = useCallback(async()=>{


try{


setLoading(true);

setError("");



const data =
await getProjects();



setProjects(
data.projects || []
);



}

catch(error){


console.error(
"Project loading error:",
error
);



setError(
"Unable to load projects"
);


}


finally{


setLoading(false);


}



},[]);






useEffect(()=>{


if(user){

fetchProjects();

}


},[
user,
fetchProjects
]);








/*
 Project Statistics
*/


const projectStats = useMemo(()=>{


return projects.reduce(
(acc,project)=>{


if(project.status==="Completed"){

acc.completed++;

}


else if(
project.status==="In Progress"
){

acc.progress++;

}


else if(
project.status==="Pending"
){

acc.pending++;

}



return acc;


},
{
completed:0,
progress:0,
pending:0
}

);


},[projects]);






const totalProjects =
projects.length;



const completedProjects =
projectStats.completed;



const inProgressProjects =
projectStats.progress;



const pendingProjects =
projectStats.pending;




const completionRate =

totalProjects===0

?

0

:

Math.round(
(completedProjects /
totalProjects)
*
100
);





const chartData = useMemo(()=>[


{
name:"Completed",
projects:completedProjects,
color:"#16a34a"
},


{
name:"In Progress",
projects:inProgressProjects,
color:"#f59e0b"
},


{
name:"Pending",
projects:pendingProjects,
color:"#64748b"
}


],[
completedProjects,
inProgressProjects,
pendingProjects
]);


/*
 Greeting
*/


const hour =
new Date().getHours();



let greeting =
"Good Evening";



if(hour < 12){

greeting =
"Good Morning";

}

else if(hour < 18){

greeting =
"Good Afternoon";

}





const currentDate =
new Date().toLocaleDateString(
"en-US",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric"
}
);






/*
 Loading Screen
*/


if(userLoading){


return (

<Loading
text="Loading Dashboard..."
/>

);


}





return (

<>


<Navbar />



<div className={styles.container}>



{/* Error Message */}


{

error && (

<div
className={styles.errorCard}
>


<p>

⚠️ {error}

</p>



<button

onClick={fetchProjects}

className={styles.retryBtn}

>

Retry

</button>



</div>

)

}









{/* Hero Section */}


<div
className={styles.hero}
>




<div>




<p
className={styles.greeting}
>

{greeting},

</p>





<h1
className={styles.heading}
>




<div

className={styles.avatar}

aria-label="User avatar"

>


{

user?.name
?.charAt(0)
?.toUpperCase()

}



</div>





Welcome{" "}

{

user?.name
?.split(" ")[0]

}





{

isPremium && (


<span
className={styles.crown}
>

<FaCrown className={styles.heroIcon} />

</span>


)

}




</h1>






<p
className={styles.subHeading}
>

{currentDate}

</p>






<p
className={styles.heroText}
>

Manage your projects efficiently with
TechoVerse.

</p>




</div>








<div
className={styles.heroButtons}
>




<Link

to="/projects"

className={styles.primaryBtn}

>

+ New Project

</Link>






<Link

to="/projects"

className={styles.secondaryBtn}

>

View Projects

</Link>





</div>





</div>





{/* Statistics Cards */}


<div
className={styles.statsRow}
>




<div
className={`${styles.statCard} ${styles.total}`}
>


<h2>
{totalProjects}
</h2>


<p>
<>
  <FaFolderOpen className={styles.statIcon}/>
  Total Projects
</>
</p>


</div>






<div
className={`${styles.statCard} ${styles.completed}`}
>


<h2>
{completedProjects}
</h2>


<p>
<>
  <FaCheckCircle className={styles.statIcon}/>
  Completed
</>
</p>


</div>






<div
className={`${styles.statCard} ${styles.progress}`}
>


<h2>
{inProgressProjects}
</h2>


<p>
<>
  <FaClock className={styles.statIcon}/>
  In Progress
</>
</p>


</div>






<div
className={`${styles.statCard} ${styles.pending}`}
>


<h2>
{pendingProjects}
</h2>


<p>
<>
  <MdPendingActions className={styles.statIcon}/>
  Pending
</>
</p>


</div>






<div
className={`${styles.statCard} ${styles.completed}`}
>


<h2>
{completionRate}%
</h2>


<p>
<>
  <FaChartLine className={styles.statIcon}/>
  Completion Rate
</>
</p>


</div>





</div>









{/* Completion Progress */}



<div
className={styles.progressCard}
>



<h3>

Project Completion Progress

</h3>






<div
className={styles.progressBar}
>




<div

className={styles.progressFill}

style={{
width:`${completionRate}%`
}}

>

</div>




</div>






<p>

{completedProjects} of {totalProjects}

projects completed

</p>





</div>









{/* Premium Section */}



{

isPremium ? (





<div
className={styles.premiumActiveCard}
>




<div>


<h2>

<>
  <FaCrown className={styles.sectionIcon}/>
  Premium Member
</>

</h2>





<p>

Your TechoVerse Premium plan is active.

</p>



</div>







<div
className={styles.premiumDetails}
>




<p>


<strong>

Plan:

</strong>


{" "}


{

user?.plan || "Premium"

}


</p>








<p>


<strong>

Status:

</strong>



<span
className={styles.activeStatus}
>

Active

</span>



</p>








<p>


<strong>

Activated:

</strong>





{

user?.paymentDate


?


new Date(
user.paymentDate
)
.toLocaleDateString()


:


"Not Available"

}



</p>






</div>







</div>





)

:

(







<div
className={styles.premiumCard}
>






<div>


<h2>

<>
  <FaRocket className={styles.sectionIcon}/>
  Upgrade to TechoVerse Premium
</>

</h2>





<p>

Unlock unlimited projects,

advanced analytics and team

collaboration features.

</p>




</div>






<UpgradeButton />






</div>





)

}





{/* Main Dashboard Grid */}



<div
className={styles.dashboardGrid}
>






{/* Profile Card */}



<div

className={`${styles.card} ${styles.profileCard}`}

>






<h2 className={styles.cardTitle}>
    <FaUserCircle className={styles.sectionIcon}/>
    Account Information
</h2>










<div
className={styles.row}
>


<span>

Name

</span>


<strong>

{user?.name || "Not Available"}

</strong>


</div>







<div
className={styles.row}
>


<span>

Email

</span>


<strong>

{user?.email || "Not Available"}

</strong>


</div>








<div
className={styles.row}
>


<span>

Account Status

</span>



<strong
className={styles.status}
>

<>
  <FaCheckCircle className={styles.statIcon}/>
  Authenticated
</>

</strong>


</div>








<div
className={styles.row}
>


<span>

Login Time

</span>



<strong>

{loginTime}

</strong>



</div>








{

isPremium && (

<>


<div
className={styles.row}
>


<span>

Subscription

</span>




<strong
className={styles.premiumText}
>

<FaCrown className={styles.heroIcon} /> Premium

</strong>



</div>







<div
className={styles.row}
>


<span>

Plan

</span>




<strong>

{user?.plan || "Premium"}

</strong>



</div>



</>

)

}




</div>














{/* Analytics Card */}





<div

className={`${styles.card} ${styles.analyticsCard}`}

>




<h2 className={styles.cardTitle}>
    <FaChartBar className={styles.sectionIcon}/>
    Project Analytics
</h2>









{

loading ?


(

<Loading
text="Loading Analytics..."
/>

)



:



(



<div
className={styles.chartWrapper}
>



<ResponsiveContainer

width="100%"

height="100%"

>




<BarChart

data={chartData}

>




<CartesianGrid />





<XAxis

dataKey="name"

/>





<YAxis />






<Tooltip />







<Bar

dataKey="projects"

radius={[8,8,0,0]}

>






{

chartData.map(

(item,index)=>(



<Cell

key={index}

fill={item.color}

/>



)

)



}




</Bar>






</BarChart>







</ResponsiveContainer>






</div>





)



}







<p
className={styles.note}
>

Workspace data synced from MongoDB.

</p>





</div>







</div>









{/* Quick Actions */}




<div
className={styles.quickActions}
>





<h2 className={styles.actionTitle}>
    <FaBolt className={styles.sectionIcon}/>
    Quick Actions
</h2>







<div
className={styles.actionButtons}
>







<Link
  to="/projects"
  className={styles.actionBtn}
>
  <FaPlus className={styles.actionIcon} />
  <span>Create Project</span>
</Link>


<Link
  to="/projects"
  className={styles.actionBtn}
>
  <FaFolderOpen className={styles.actionIcon} />
  <span>View Projects</span>
</Link>


<Link
  to="/profile"
  className={styles.actionBtn}
>
  <FaUserCircle className={styles.actionIcon} />
  <span>Profile</span>
</Link>






</div>





{/* Recent Projects */}



<div
className={styles.recentProjects}
>




<h2 className={styles.sectionTitle}>
  <FaFolderOpen className={styles.sectionIcon} />
  Recent Projects
</h2>








{

projects.length === 0 ?





(



<div
className={styles.emptyState}
>





<h3 className={styles.emptyTitle}>
  <FaRocket className={styles.emptyIcon} />
  Start Your First Project
</h3>







<p>

You haven't created any projects yet.

</p>







<Link

to="/projects"

className={styles.primaryBtn}

>

Create Project

</Link>






</div>





)

:

(





<div
className={styles.recentGrid}
>





{

projects
.slice(0,3)
.map(project => (





<Link



key={project._id}



to={`/projects/${project._id}`}



className={styles.recentCard}



>








<h3>

{project.title}

</h3>








<p>

{

project.description

?

project.description.slice(0,80)

:

"No description"

}



</p>









<span
className={styles.recentStatus}
>

{project.status}

</span>







</Link>






))





}







</div>





)



}







</div>






</div>













<footer
className={styles.footer}
>






<p>

© {new Date().getFullYear()} TechoVerse

</p>







<p>

Built with React • Node.js • Express • MongoDB • Stripe

</p>






</footer>









</div>






</>

);



}



export default Dashboard;