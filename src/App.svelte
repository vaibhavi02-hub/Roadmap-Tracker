<script>  
import Sidebar from "./components/Hidebar.svelte";  
import Topbar from "./components/Topbar.svelte";  
import confetti from "canvas-confetti";  
import { onMount } from "svelte";  
  
let goal = "";  
let roadmap = [];  
let completed = [];  
let darkMode = false;  
let customSteps = "";  
let xp = 0;  
let streak = 0;  
let lastCompletedDate = null;  
  
$: localStorage.setItem("goal",goal);  
$: localStorage.setItem("darkmode",JSON.stringify(darkMode));  
  
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
  
$: percentage = roadmap.length  
  ? Math.round((completed.length / roadmap.length) * 100)  
  : 0;  
  
$: level = "";  
  
$: if (xp >= 60) {  
  level = "🏆 Champion";  
} else if (xp >= 40) {  
  level = "🛠 Builder";  
} else if (xp >= 20) {  
  level = "⚡ Explorer";  
} else {  
  level = "🧭 Beginner";  
}  
  
$: badge = "";  
  
$: if (percentage >= 100) {  
  badge = "🏆 Roadmap Champion";  
} else if (percentage >= 50) {  
  badge = "⚡ Halfway Hero";  
} else if (percentage >= 25) {  
  badge = "🧭 Beginner Explorer";  
} else {  
  badge = "";  
}  
  
$: if (roadmap.length > 0 && completed.length === roadmap.length) {  
  confetti({  
    particleCount: 120,  
    spread: 70,  
    origin: { y: 0.6 }  
  });  
}  
  
function generateRoadmap() {  
  
  const g = goal.toLowerCase();  
  
  roadmap = roadmaps[g] || [];  
  
  const key = "completed_" + g;  
  const saved = localStorage.getItem(key);  
  
  completed = saved ? JSON.parse(saved) : [];  
  
  localStorage.setItem("selected_goal", g);  
}  
  
function generateCustomRoadmap(){  
  roadmap = customSteps  
  .split("\n")  
  .map(step => step.trim())  
  .filter(step => step !== "");  
  
  completed = [];  
  goal = "custom";  
  
customSteps = "";  
}  
  
function selectCareer(career) {  
  goal = career;  
  generateRoadmap();  
}  
  
function toggleTask(step) {  
  
  if (completed.includes(step)) {  
  
    completed = completed.filter(t => t !== step);  
    xp = xp - 10;  
  
  } else {  
  
    completed = [...completed, step];  
    xp = xp + 10;  
    const today = new Date().toDateString();  
  
if(lastCompletedDate !== today){  
  streak = streak + 1;  
  lastCompletedDate = today;  
  
  localStorage.setItem("streak", streak);  
  localStorage.setItem("lastDate", today);  
}  
  
  }  
  
  const key = "completed_" + goal.toLowerCase();  
  localStorage.setItem(key, JSON.stringify(completed));  
  
}  
  
function resetProgress() {  
  
  completed = [];  
  
  const key = "completed_" + goal.toLowerCase();  
  localStorage.removeItem(key);  
}  
  
function toggleDarkMode() {  
  darkMode = !darkMode;  
}  
  
function editTask(i) {  
const newTask = prompt("Edit task:", roadmap[i]);  
  
if(newTask){  
roadmap[i] = newTask;  
roadmap = [...roadmap];  
}  
}  
function deleteTask(i) {  
  
roadmap.splice(i,1);  
  
completed = completed.filter(c => c !== i);  
  
roadmap = [...roadmap];  
}  
onMount(() => {  
  const savedStreak = localStorage.getItem("streak");  
const savedDate = localStorage.getItem("lastDate");  
  
if(savedStreak){  
  streak = parseInt(savedStreak);  
}  
  
if(savedDate){  
  lastCompletedDate = savedDate;  
}  
  
  const savedGoal = localStorage.getItem("selected_goal");  
  const savedDarkMode = localStorage.getItem("darkMode");  
  
  if (savedGoal) {  
    goal = savedGoal;  
    generateRoadmap();  
  }  
  
  if(savedDarkMode){  
    darkMode = JSON.parse(savedDarkMode);  
  }  
  
});  
</script> 
 <div class="layout" class:dark={darkMode}> 
 <Sidebar {selectCareer} />

<div class="main"> 
 <Topbar />  
 <button class="dark-toggle" on:click={toggleDarkMode}>  
{darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}  
</button> 
 <h1>Roadmap Tracker</h1> 
  <div class="input-section"> 
   <textarea  
placeholder="Write your own roadmap steps (one per line)"  
bind:value={customSteps}  
class="custom-input"> </textarea>
</div>
</div>
</div>
 <div class="button-row">  
<button on:click={generateCustomRoadmap}>Create Custom Roadmap</button>  
<button on:click={generateRoadmap}>Show Roadmap</button>  <input  
type="text"  
placeholder="Enter AI, Web, DataScience, CyberSecurity, Android"  
bind:value={goal}  
/>

<button on:click={generateRoadmap}>  
Show Roadmap  
</button>  </div>  {#if roadmap.length > 0}

{#if goal === "custom"}

<h3 style="text-align:center">Custom Roadmap</h3>  
{/if}  <p class="progress-text">  
Progress: {completed.length} / {roadmap.length} ({percentage}%)  
</p>  <div class="stats">  <div class="card xp-card">  
<h3>⭐ XP</h3>  
<p>{xp}</p>  
</div>  <div class="card level-card">  
<h3>🏆 Level</h3>  
<p>{level}</p>  
</div>  <div class="card streak-card">  
<h3>🔥 Streak</h3>  
<p>{streak} days</p>  
</div>  </div>  {#if badge}

<p class="badge">{badge}</p>  
{/if}  <button class="reset-btn" on:click={resetProgress}>  
Reset Progress  
</button>  <div class="progress-bar">  <div  
class="progress"  
style="width: {percentage}%">  <span class="percent">{percentage}%</span>

</div>  </div>  {#if completed.length === roadmap.length && roadmap.length > 0}

<p class="complete-message">  
🎉 Congratulations! You completed the roadmap!  
</p>  {/if}

<div class="steps">  {#each roadmap as step, i}

<div class="step">  <input
type="checkbox"
checked={completed.includes(step)}
on:change={() => toggleTask(step)}> 

<span class:done={completed.includes(step)}>  
{step}  
</span> 
 <button class="edit" on:click={() => editTask(i)}>✏</button>

<button class="delete" on:click={() => deleteTask(i)}>❌</button>

</div> 
 {/each}
</div>
{/if}

<style> 

 h1{
text-align:center;
color:#2563EB;
margin-bottom:30px;
}

.input-section{
display:flex;
flex-direction:column;
align-items:center;
gap:12px;
margin-bottom:25px;
}

input{
width:100%;
max-width:400px;
}

.custom-input{
  width:100%;
  max-width:600px;
}

button{
padding:8px 14px;
font-size:14px;
background:#2563EB;
color:white;
border:none;
border-radius:6px;
cursor:pointer;
}

button:hover{
background:#1E40AF;
}

.button-row{
display:flex;
justify-content:clearInterval;
align-items:clearInterval;
gap:15px;
margin-top:15px;
flex-wrap:WebTransport;
}

.button-row button{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:12px;
  margin-top:15px;
  flex-wrap:wrap;
}

.reset-btn{
display:block;
margin:10px auto 20px auto;
padding:8px 14px;
border:none;
background:#ef4444;
color:white;
border-radius:6px;
cursor:pointer;
}

.reset-btn:hover{
background:#dc2626;
}

.progress-text{
text-align:center;
font-weight:bold;
}

.progress-bar{
width:100%;
max-width:600px;

}

.percent{
color:white;
font-size:10px;
display:flex;
justify-content:center;
align-items:center;
height:100%;
}

.progress{
height:100%;
background:linear-gradient(90deg,#2563EB,#60A5FA);
border-radius:20px;
transition:width 0.6s ease;
}

.steps{
width:100%;
max-width:600px;
}

.step{
display:flex;
justify-content:space-between;
align-items:center;
gap:10px;
margin:10px 0;
padding:10px;
border-radius:8px;
background:#f9fafb;
}

.step span{
flex:1;
text-align:left;
}

.step:hover{
background:#eef2ff;
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
  flex:1;
  display:flex;
min-height:100vh;
background:#f3f4f6;
}

.layout :global(.sidebar){
  width:220px;
}

.main{
flex:1;
padding:30px;
display:flex;
flex-direction:column;
align-items:center;
}

.main > *{
  max-width:800px;
  width:100%;
}

.dark{
background:#111827;
color:white;
}

.dark .card{
background:#1f2937;
color:white;
box-shadow:0 6px 18px rgba(0,0,0,0.4);
}

.dark input{
background:#1f2937;
color:white;
border:1px solid #374151;
}

.dark .step{
background:#1f2937;
}

.dark .step:hover{
background:#1f2937;
}

.dark .progress-bar{
background:#374151;
}

.dark button{
background:#2563eb;
}

.dark-toggle{
  display:block;
  margin:10px auto 20px auto;
padding:8px 14px;
background:#111827;
color:white;
border-radius:6px;
cursor:pointer;
}

.dark-toggle:hover{
background:#1f2937;
}

.badge{
text-align:center;
font-weight:bold;
margin-top:10px;
font-size:18px;
color:#f59e0b;
}
.custom-input{
width:60%;
display:block;
margin:15px auto;
padding:12px;
border-radius:8px;
border:1px solid #ccc;
min-height:120px;
font-size:15px;
}
.dark .custom-input{
background:#1f2937;
color:white;
border:1px solid #374151;
}

.xp{
text-align:center;
font-weight:bold;
color:#16a34a;
}

.level{
text-align:center;
font-size:18px;
font-weight:bold;
color:#f59e0b;
}

.streak{
text-align:center;
font-size:18px;
font-weight:bold;
color:#ef4444;
margin-bottom:10px;

}

.stats{
display:flex;
justify-content:center;
gap:20px;
margin:20px 0;
flex-wrap:wrap;
}

.card{
flex:1;
background:white;
padding:20px;
border-radius:12px;
max-width:200px;
text-align:center;
box-shadow:0 6px 15px rgba(0,0,0,0,1);
transition:0.3s;
}

.card:hover{
transform:translateY(-5px);
box-shadow:0 10px 25px rgba(0,0,0,0,15);
}

.card h3{
margin-bottom:8px;
font-size:18px;
}

.card p{
font-size:20px;
font-weight:bold;
}

.xp-card{
color:#16a34a;
}

.level-card{color:#f59e0b;
}

.streak-card{
color:#ef4444;
}

.dark .card{
background:#1f2937;
color:white;
}

.edit, .delete{
background:none;
border:none;
cursor:pointer;
font-size:18px;
padding:5px;
display:inline-flex;
align-items:center;
justify-content:center;
}

.edit{
color:#2563EB;
}

.delete{
color:#ef4444;
}

.container{
  max-width:700px;
  width:100%;
  margin:auto;
}

</style> 