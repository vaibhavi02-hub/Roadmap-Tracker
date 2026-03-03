<script>
  const goals = ["AI Engineer", "Web Developer", "Government Jobs", "Data Analyst"];
</script>

<div class="sidebar">
  <h2>Roadmap</h2>
  <ul>
    {#each goals as goal}
      <li>{goal}</li>
    {/each}
  </ul>
</div>

<style>
  .sidebar {
    width: 240px;
    background: #0f172a;
    color: white;
    padding: 20px;
  }

  h2 {
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
}

  li {
    padding: 10px;
    margin-bottom: 10px;
    background: #1e293b;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }
   li:hover {
    background: #334155;
  }
</style>