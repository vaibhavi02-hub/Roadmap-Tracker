<script>
import Sidebar from "./components/Hidebar.svelte";
import Topbar from "./components/Topbar.svelte";
import { onMount } from "svelte";

let goal = "";
let roadmap = [];
let completed = [];

const roadmaps = {

  ai: [
    "Learn Python",
    "Learn Numpy & Pandas",
    "Learn Machine Learning Basics",
    "Learn Deep Learning",
    "Build AI Projects",
    "Learn Deployment"
  ],

  web: [
    "Learn HTML",
    "Learn CSS",
    "Learn JavaScript",
    "Learn Git & GitHub",
    "Learn React",
    "Build Projects"
  ],

  datascience: [
    "Learn Python",
    "Learn Statistics Basics",
    "Learn Pandas & Numpy",
    "Learn Data Visualization",
    "Learn Machine Learning",
    "Build Data Science Projects"
  ],

  cybersecurity: [
    "Learn Networking Basics",
    "Learn Linux",
    "Learn Ethical Hacking",
    "Learn Web Security",
    "Practice CTF Challenges",
    "Get Security Certifications"
  ],

  android: [
    "Learn Java or Kotlin",
    "Learn Android Studio",
    "Understand Android UI",
    "Learn API Integration",
    "Learn Firebase",
    "Build Android Apps"
  ]
};


function generateRoadmap() {

  const g = goal.toLowerCase();
  roadmap = roadmaps[g] || [];

  const key = "completed_" + g;
  const saved = localStorage.getItem(key);

  completed = saved ? JSON.parse(saved) : [];
}
function selectCareer(career){
  goal=career;
  generateRoadmap();
}

function toggleTask(step) {

  if (completed.includes(step)) {
    completed = completed.filter(t => t !== step);
  } else {
    completed = [...completed, step];
  }

  const key = "completed_" + goal.toLowerCase();
  localStorage.setItem(key, JSON.stringify(completed));
}

</script>
<div class="layout">
<Sidebar {selectCareer} />
<div class="main">
<Topbar />

<h1>Roadmap Tracker</h1>

<div class="input-section">

  <input
    type="text"
    placeholder="Enter AI, Web, DataScience, CyberSecurity, Android"
    bind:value={goal}
  />

  <button on:click={generateRoadmap}>
    Show Roadmap
  </button>

</div>

{#if roadmap.length > 0}

<p class="progress-text">
  Progress: {completed.length} / {roadmap.length}
</p>

<div class="progress-bar">
  <div
    class="progress"
    style="width:{(completed.length/roadmap.length)*100}%">
  </div>
</div>

{#if completed.length === roadmap.length && roadmap.length > 0}
<p class="complete-message">
🎉 Congratulations! You completed the roadmap!
</p>
{/if}

<div class="steps">

{#each roadmap as step}

<div class="step">

<input
type="checkbox"
checked={completed.includes(step)}
on:change={() => toggleTask(step)}
>

<label class:done={completed.includes(step)}>
{step}
</label>

</div>

{/each}

</div>

{/if}
</div>
</div>

<style>

h1{
text-align:center;
color:#2563EB;
margin-bottom:30px;
}

.input-section{
display:flex;
justify-content:center;
gap:10px;
margin-bottom:25px;
}

input{
width:320px;
padding:12px;
font-size:16px;
border-radius:8px;
border:1px solid #ccc;
}

button{
padding:12px 18px;
background:#2563EB;
color:white;
border:none;
border-radius:8px;
cursor:pointer;
}

button:hover{
background:#1E40AF;
}

.progress-text{
text-align:center;
font-weight:bold;
}

.progress-bar{
width:60%;
height:10px;
background:#e5e7eb;
border-radius:10px;
margin:10px auto 20px auto;
}

.progress{
height:10px;
background:#2563EB;
border-radius:10px;
transition:0.4s;
}

.steps{
width:60%;
margin:auto;
}

.step{
display:flex;
align-items:center;
gap:10px;
margin:10px 0;
}

label{
font-size:16px;
}

.done{
text-decoration:line-through;
color:gray;
}

.complete-message{
text-align:center;
font-size:20px;
color:#16a34a;
font-weight:bold;
margin-top:20px;
}
.layout{
  display:flex;
}
.main{
  flex:1;
  padding:20px;
}
</style>