<script>
export let selectCareer;
</script>

<div class="sidebar">

<h2>Careers</h2>

<button on:click={() => selectCareer("ai")}>AI</button>
<button on:click={() => selectCareer("web")}>Web</button>
<button on:click={() => selectCareer("datascience")}>Data Science</button>
<button on:click={() => selectCareer("cybersecurity")}>Cyber Security</button>
<button on:click={() => selectCareer("android")}>Android</button>

</div>

<style>

.sidebar{
width:220px;
background:#f3f4f6;
padding:20px;
height:100vh;
}

button{
display:block;
width:100%;
margin:10px 0;
padding:10px;
border:none;
background:#2563EB;
color:white;
border-radius:6px;
cursor:pointer;
}

button:hover{
background:#1E40AF;
}

</style>